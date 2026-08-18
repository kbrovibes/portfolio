# UBR Thursday @ NWBC watcher

Polls the [UBR events portal](https://my.universalbadmintonrating.com/badminton_events) for the
weekly **Thursday event at NWBC**. When registration opens it posts a notice to the **JSB**
WhatsApp group with the signup count and whether **Kiran Iyer** and **Vasu Chimmad** are in.
Once both are registered it pauses itself until Saturday, then resumes for the next week.

## This has to run on your own machine

It cannot run from a Claude Code cloud session, for two independent reasons:

- `my.universalbadmintonrating.com` is blocked by the cloud environment's network egress policy
  (the proxy answers `403` to the CONNECT). The portal is simply unreachable from there.
- WhatsApp Web needs a browser profile that is phone-linked to your account. Cloud session
  containers have no Chrome profile, no display, and are reclaimed after inactivity, so a
  linked session could not persist even if one were established.

So this is built to attach to **your** Chrome, which is already signed in to both the portal
and WhatsApp Web — the same approach the tiffin-bill-tracker skill uses.

## Setup

**1. Run Chrome with the debugging port open.** The watcher attaches to your normal browser
rather than launching its own, so both logins come for free.

```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Linux
google-chrome --remote-debugging-port=9222
```

Leave a tab signed in to the UBR portal and one on `web.whatsapp.com`. To make this permanent,
add the flag to how Chrome normally starts.

**2. Install and calibrate.**

```bash
cd automation/ubr-thursday-watcher
npm install
node watch.mjs --calibrate
```

Calibration writes `calibration/events.html`, `events.txt` and `venue-hits.json`. **Do this
before enabling the schedule.** The portal's markup was never reachable from the machine this
was written on, so the scrapers work off layered fallbacks (explicit selector → text pattern →
structural heuristic) rather than known selectors. They are exercised against a synthetic
portal in `fixture-test.mjs` and handle the shapes you would expect, but the real page may
still need selectors pinned in `config.json` under `selectors`:

| Key | What to point it at |
|---|---|
| `eventCard` | the repeating element for one event in the list |
| `signupCount` | the element showing the number of signups |
| `rosterRow` | one row of the registered-players list |
| `registerButton` | the register/sign-up control, if presence means "open" |

**3. Dry run.** Scrapes for real, prints the message, sends nothing:

```bash
node watch.mjs --dry-run
```

Check the count and both names against the portal by eye. If the count prints as `unknown`, or
as `~12` (meaning it came from the roster-row heuristic rather than an explicit count on the
page), pin `signupCount` and re-run. The script never invents a number — an unknown count is
reported as unknown.

**4. Schedule it.** macOS: edit the two absolute paths in
`com.kbro.ubr-thursday-watcher.plist`, then

```bash
cp com.kbro.ubr-thursday-watcher.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.kbro.ubr-thursday-watcher.plist
```

Linux (`crontab -e`), every 5 minutes:

```
*/5 * * * * cd /path/to/portfolio/automation/ubr-thursday-watcher && /usr/bin/node watch.mjs >> /tmp/ubr-watcher.log 2>&1
```

## How the pause works

The scheduler keeps firing on its fixed interval; **the script returns early while paused**.
Nothing has to re-arm a timer, so a missed wake-up or a reboot cannot strand the watcher.

```
WATCHING ──event registration opens──► post to JSB ──► TRACKING
TRACKING ──Kiran + Vasu both registered──► post confirmation ──► PAUSED (until Saturday 00:00)
TRACKING ──Thursday passes with one still missing──► PAUSED (until Saturday 00:00)
PAUSED   ──Saturday arrives──► WATCHING (next week's event)
```

State lives in `state.json` (gitignored). Inspect it with `node watch.mjs --status`; delete it
to reset. Notifications are keyed by event date, so a restart or a duplicate run cannot post
the same notice twice.

## Commands

| Command | Effect |
|---|---|
| `node watch.mjs` | one poll cycle, obeying the state machine — what cron runs |
| `node watch.mjs --dry-run` | scrape and print the message, send nothing |
| `node watch.mjs --force` | notify now, ignoring pause and already-sent bookkeeping |
| `node watch.mjs --calibrate` | dump portal markup for pinning selectors |
| `node watch.mjs --status` | print saved state |

`--force` is the one-off run: it posts the current Thursday notice immediately regardless of
what has already been sent.

## Safety

Posting to a group chat is not undoable, so before typing anything the script requires the open
chat's header title to be an **exact** match for `whatsappGroup`. A near miss (`JSB Badminton
Seniors` when `JSB` was configured) aborts without sending. It also refuses to run against a
WhatsApp profile that is not linked, and against a portal showing a login page, rather than
scraping an error page and reporting nonsense.

## Tests

```bash
node selftest.mjs      # date parsing, name matching, pause scheduling, message rendering
node fixture-test.mjs  # full scrape against a synthetic portal (uses bundled Chromium)
node wa-guard-test.mjs # wrong-chat and not-linked safeguards
```

These cover everything that does not require the live portal or a linked WhatsApp account.
The real portal's markup and an actual WhatsApp send are the two things still unverified.

## Config

Everything tunable lives in `config.json` — venue string, weekday, the two watched names, group
name, resume weekday, CDP URL, and the open/closed keyword lists. `notifyOnBothSigned` controls
the second (confirmation) message; set it to `false` for open-notices only.
