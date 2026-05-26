import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

function Chapter({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20">
      <div className="flex items-start gap-5 mb-6">
        <span
          className="text-5xl font-black leading-none select-none shrink-0"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {num}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white pt-2 leading-tight">
          {title}
        </h2>
      </div>
      <div className="pl-0 sm:pl-[72px]">{children}</div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-white/60 text-[17px] leading-[1.8] font-light">
      {children}
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 pl-5 border-l-2 border-violet-500/60 text-white/80 text-xl italic leading-relaxed font-light">
      {children}
    </blockquote>
  );
}

function Photo({
  src,
  caption,
  wide = false,
}: {
  src: string;
  caption: string;
  wide?: boolean;
}) {
  return (
    <figure className={`my-8 ${wide ? "w-full" : "w-full sm:max-w-lg"}`}>
      <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
        <img
          src={src}
          alt={caption}
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs text-white/25 italic">
        {caption}
      </figcaption>
    </figure>
  );
}

function PhotoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">{children}</div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded text-sm bg-white/[0.06] text-amber-300/80 font-mono">
      {children}
    </code>
  );
}

function RefLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-violet-400/80 hover:text-violet-300 underline underline-offset-2 transition-colors text-sm"
    >
      {children}
      <ExternalLink size={11} />
    </a>
  );
}

export default function LoggingOut() {
  return (
    <main className="min-h-screen" style={{ background: "#0a0a12" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md border-b border-white/[0.04]"
        style={{ background: "rgba(10,10,18,0.85)" }}
      >
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>All posts</span>
          </Link>
          <span className="text-sm font-semibold text-white/40">
            K1<span className="text-amber-400">.</span>
          </span>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden pt-20 pb-16 px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(251,146,60,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {["Amazon", "Neptune", "Farewell", "Nostalgia"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-400/80 border border-amber-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-[0.95]">
            K1:{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Logging Out
            </span>
          </h1>
          <p className="text-xl text-white/45 font-light leading-relaxed max-w-2xl mt-5 mb-8 italic">
            Random trivia from the early days of Neptune that no one asked for. But you&apos;re getting anyway.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/25">
            <span>June 1, 2025</span>
            <span>·</span>
            <span>8 min read</span>
            <span>·</span>
            <span>Written at Amazon, for the Neptune team</span>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 pb-24">
        {/* Intro */}
        <div className="mb-16">
          <Prose>
            <p>
              As I wrap up my time with Neptune, I thought I&apos;d leave you with something more
              entertaining than an out-of-office message.
            </p>
            <p>This isn&apos;t documentation. It&apos;s not a design review.</p>
            <p>
              It&apos;s pure, unfiltered trivia from the early (and chaotic) days of our beloved
              graph engine.
            </p>
          </Prose>
        </div>

        {/* Chapter 1 */}
        <Chapter num="01" title="Random Trivia Nobody Asked For (But You're Getting Anyway)">
          <Prose>
            <p>
              You&apos;d think my Amazon journey started with code. Technically, it started with
              scissors and tape.
            </p>
            <p>
              It was 2011. I had just joined Amazon, wide-eyed and under-caffeinated. A few weeks
              in, someone floated the idea of a &ldquo;Desk Decoration Contest.&rdquo; Naturally, I
              took it way too seriously.
            </p>
          </Prose>

          <PullQuote>
            My theme? &ldquo;The Facebook Wall&rdquo; - back when people still used Facebook walls.
          </PullQuote>

          <Prose>
            <p>
              My teammates were listed as &ldquo;Friends&rdquo; on profile sidebars. Team launches
              and updates became part of the &ldquo;News Feed.&rdquo; Even had random fun posts and
              &ldquo;likes&rdquo; from my imaginary social graph.
            </p>
            <p>
              Yes, it was lame. But I won. No prizes. No trophies. Just eternal bragging rights and
              a slightly confused director who walked by and asked if this was a new internal tool.
            </p>
            <p>
              Anyway - that was the beginning of my Amazon journey. Fast-forward a few years, and
              I&apos;d go from decorating desks to helping build a full-blown graph database. Funny
              how these things work out.
            </p>
          </Prose>

          <PhotoGrid>
            <Photo
              src="/blog/logging-out/desk-decoration-2011.png"
              caption="The one where I was Small-K, 2011."
            />
            <Photo
              src="/blog/logging-out/desk-decoration-winner.png"
              caption="The proof."
            />
          </PhotoGrid>
        </Chapter>

        {/* Chapter 2 */}
        <Chapter num="02" title="Episode I: The Phantom Gremlin">
          <Prose>
            <p>
              Once upon a December 2015, Divij - yes, our OG Gremlin Guy - told me about this
              mysterious, secret Amazon team building a graph database.
            </p>
          </Prose>

          <PullQuote>
            &ldquo;It&apos;s not listed anywhere in JobFinder,&rdquo; he said. &ldquo;But trust me
            - it&apos;s real.&rdquo;
          </PullQuote>

          <Prose>
            <p>
              Naturally, I was intrigued. He connected me to Omer Zaki, and a few emails later, I
              was in.
            </p>
            <p>
              Fun fact: I technically joined before Divij, so I get bragging rights as the guy who
              wrote the first line of code for Neptune. But let&apos;s be fair - Divij was the first
              official offer. So let&apos;s call it even.
            </p>
          </Prose>

          <PhotoGrid>
            <Photo
              src="/blog/logging-out/gremlin-2014.png"
              caption="The one with the Gremlin himself, 2014."
            />
            <Photo
              src="/blog/logging-out/first-neptune-commit.png"
              caption="The one before Air-routes took over. Yes, that&apos;s my first Neptune commit."
            />
          </PhotoGrid>
        </Chapter>

        {/* Chapter 3 */}
        <Chapter num="03" title='How We Got the Name "Neptune"'>
          <Prose>
            <p>
              Ah, the naming mythology. There are a few versions, but here&apos;s the correct one
              - aka the one I was there for.
            </p>
            <p>
              Back in the day, there was this open-source graph DB called{" "}
              <strong className="text-white/80">Titan</strong>. It supported multiple storage
              backends - Cassandra, local files, and yes, even a custom DynamoDB backend written by
              a DDB SDE in their spare time.
            </p>
            <p>
              In my early days, I was wrangling Titan artifacts, fixing bugs, and stitching it all
              together. Then someone went, &ldquo;Hey, let&apos;s pick a codename.&rdquo;
            </p>
          </Prose>

          <div className="my-8 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
            <p className="text-sm text-white/50 mb-3 uppercase tracking-wider font-semibold">Enter Roman mythology</p>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">·</span>
                <span>Titans ruled the old world.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">·</span>
                <span>The Olympians, including Neptune, overthrew them.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">·</span>
                <span>Neptune didn&apos;t fight in the war - but he inherited the world.</span>
              </li>
            </ul>
          </div>

          <Prose>
            <p>Sound familiar?</p>
            <p>
              That codename eventually made it to Andy&apos;s desk and became the final product
              name. (Though rumor has it Omer just liked military planes, and
              &ldquo;Neptune&rdquo; is one of them. You pick your favorite version.)
            </p>
          </Prose>

          <div className="mt-6 flex flex-col gap-2">
            <RefLink href="https://aws.amazon.com/blogs/big-data/building-a-graph-database-on-aws-using-amazon-dynamodb-and-titan/">
              Building a graph database on AWS using DynamoDB and Titan
            </RefLink>
            <RefLink href="https://www.allthingsdistributed.com/2015/08/titan-graphdb-integration-in-dynamodb.html">
              Titan GraphDB integration in DynamoDB (Werner Vogels)
            </RefLink>
          </div>
        </Chapter>

        {/* Chapter 4 */}
        <Chapter num="04" title="That One Time I Gave a Terrible Talk">
          <Prose>
            <p>
              Sainath and AK joined as #3 and #4. I first met them in March 2016, during what was
              meant to be a deep-dive tech talk on possible storage layouts for graph data.
            </p>
            <p>
              I had spent weeks researching storage models, indexing strategies, adjacency
              representations, and compression formats. I was ready to deliver a cutting-edge
              session on how our future graph engine might store its guts.
            </p>
          </Prose>

          <PullQuote>
            It was not great. Okay, it was awful. Easily the worst presentation of my Amazon career.
          </PullQuote>

          <Prose>
            <p>
              They hadn&apos;t officially joined yet - this was just a pre-onboarding &ldquo;get to
              know the mess you&apos;re joining&rdquo; kind of thing.
            </p>
            <p>
              A few days later, I went off on a month-long solo backpacking trip across Europe. In
              Brussels, I passed someone on the street and thought, &ldquo;Huh. That face looks
              familiar.&rdquo;
            </p>
            <p>
              Weeks later, it hit me: I had casually walked past AK. Small world.
            </p>
          </Prose>

          <Photo
            src="/blog/logging-out/brussels-2016.png"
            caption="The one where AK is reading up on Dictionary Encoding from a cafe in Belgium, 2016."
            wide
          />
        </Chapter>

        {/* Chapter 5 */}
        <Chapter num="05" title="The Blazegraph Merge: Legends Assembled (August 2016)">
          <Prose>
            <p>
              I wasn&apos;t in the loop on the Blazegraph acquisition. So imagine my surprise when
              Brad, Bryan, Alex, and the rest just showed up one day.
            </p>
          </Prose>

          <PullQuote>No warning. Just boom - new teammates.</PullQuote>

          <Prose>
            <p>
              Brad, by the way, was a magician. He took all those Blazegraph packages and made them
              work with Brazil. I still haven&apos;t met anyone who understands Amazon&apos;s build
              system better than him.
            </p>
          </Prose>

          <Photo
            src="/blog/logging-out/blazegraph-team.png"
            caption="The one that shows that Sainath does not age."
            wide
          />
        </Chapter>

        {/* Chapter 6 */}
        <Chapter num="06" title="When the Control Plane Lived on My Devbox">
          <Prose>
            <p>At one point, Neptune was running on a control plane forked from RDS.</p>
            <p>Hundreds of packages. Everything wired together like a mad science experiment.</p>
          </Prose>

          <PullQuote>
            All services running from my devbox. I wish I were exaggerating.
          </PullQuote>

          <Prose>
            <p>Here&apos;s a commit from that era for posterity:</p>
          </Prose>

          <Photo
            src="/blog/logging-out/first-neptune-commit.png"
            caption="NeptuneDatasetGenerator · First checkin. Moving files. — April 2016."
            wide
          />

          <Prose>
            <p className="text-xs text-white/30 font-mono">
              The commit message says &ldquo;First checkin. Moving files.&rdquo; Reader, it was not
              just moving files.
            </p>
          </Prose>
        </Chapter>

        {/* Chapter 7 */}
        <Chapter num="07" title="The re:Invent Moment">
          <Prose>
            <p>
              During Neptune&apos;s big launch at re:Invent 2017, there was a poll:{" "}
              <em>&ldquo;Which announcement are you most excited about?&rdquo;</em>
            </p>
            <p>And guess what?</p>
          </Prose>

          <PullQuote>
            Neptune was in the top 5. We were the hype drop of the year.
          </PullQuote>

          <Photo
            src="/blog/logging-out/reinvent-top5.png"
            caption="Amazon Neptune at #4 — the re:Invent 2017 tweet wall. It belongs in the Louvre."
            wide
          />

          <PhotoGrid>
            <Photo
              src="/blog/logging-out/brad-hebrew.png"
              caption="The one where Brad spoke in Hebrew."
            />
            <Photo
              src="/blog/logging-out/ga-deployment.png"
              caption="The one where we were staring at the GA deployment."
            />
          </PhotoGrid>
        </Chapter>

        {/* Chapter 8 */}
        <Chapter num="08" title="Graphing the Org: One Hop at a Time">
          <Prose>
            <p>
              At some point in the early Neptune days - before IAM auth was even a twinkle in our
              backlog - I built my very first app using our graph engine.
            </p>
            <p>
              I called it <strong className="text-white/80">Amazonians Website</strong> - a modest
              name for what was essentially &ldquo;Phonetool Done Right.&rdquo; (Which,
              let&apos;s be honest, would&apos;ve made a way flashier launch title.)
            </p>
            <p>
              The idea was simple: model Amazon&apos;s internal PhoneTool as a graph. Every person
              became a node. Org chains, dotted lines, bar-raisers, mentors - all modeled as edges,
              lovingly traversed via Gremlin queries.
            </p>
          </Prose>

          <PullQuote>
            The result? Gloriously overengineered. Secure-ish. And absolutely addictive.
          </PullQuote>

          <Photo
            src="/blog/logging-out/phonetool-graph.png"
            caption="The one where I was just 6 steps away from Jeff Bezos."
            wide
          />
        </Chapter>

        {/* Chapter 9 */}
        <Chapter num="09" title="Old-Fart Status: Unlocked">
          <Prose>
            <p>
              I spent a few years up in Vancouver, BC - home of scenic views, polite escalator
              etiquette, and surprisingly few Amazonians at the time.
            </p>
            <p>
              There was an internal dashboard that tracked how long you&apos;d been around relative
              to others in the region. Turns out, I had a rare badge of honor: an
              &ldquo;old-fart rank&rdquo; of under 100.
            </p>
            <p>
              That meant fewer than 100 people in all of Canada had joined Amazon before me and
              were still hanging around. Basically a living relic.
            </p>
          </Prose>

          <PullQuote>
            I checked it again recently - curiosity got the better of me - and let&apos;s just say:
            the rank is still proudly holding up.
          </PullQuote>

          <Photo
            src="/blog/logging-out/old-fart-rank.png"
            caption="The one that makes me feel OLD(er). Rank 11,778 out of 1.66M Amazonians. Top 0.7%."
            wide
          />
        </Chapter>

        {/* Chapter 10 */}
        <Chapter num="10" title="Photos, Or It Didn't Happen">
          <Prose>
            <p>
              Once upon a time, we used to upload team outing pics. Someone please resurrect this
              tradition. Upload your chili cook-off pics. Make future archaeologists proud.
            </p>
          </Prose>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <Photo
              src="/blog/logging-out/team-outing-l6.png"
              caption="The one with the first L6 promo in the team."
            />
            <Photo
              src="/blog/logging-out/go-karts-dan.png"
              caption="The one where Dan cheated at Go Karting."
            />
            <Photo
              src="/blog/logging-out/go-kart-podium.png"
              caption="The podium. The receipts."
            />
            <Photo
              src="/blog/logging-out/team-sailing.png"
              caption="The one at Geo&apos;s that I was not supposed to share."
            />
            <Photo
              src="/blog/logging-out/chili-cookoff.png"
              caption="The one where Rondelli met Kunal&apos;s expectation that he won&apos;t meet his expectations."
            />
            <Photo
              src="/blog/logging-out/gremlin-2014.png"
              caption="The one that started it all."
            />
          </div>
        </Chapter>

        {/* Closing */}
        <div className="relative mt-8 mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-8 sm:p-10">
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              And that&apos;s a wrap. It&apos;s been a wild, hilarious, occasionally confusing ride
              - and I wouldn&apos;t trade it for anything.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              What I&apos;ll miss most? The people. The inside jokes. The &ldquo;this-could&apos;ve-been-an-email&rdquo; meetings.
              The group chats that went from deep dives to lunch polls in under 3 messages.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Let&apos;s definitely find an excuse to work together again - whether it&apos;s
              building something new, reviving old ideas, or just pretending to be productive over
              coffee.
            </p>
            <p className="text-white/50 text-lg mb-1">Don&apos;t be a stranger. I&apos;ll see you out there.</p>
            <p
              className="text-2xl font-black mt-4"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              - Karthik
            </p>
            <p className="text-white/30 text-sm mt-1">(BigK, K1, KR)</p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={13} />
            All posts
          </Link>
          <Link
            href="/"
            className="text-sm text-white/35 hover:text-white/70 transition-colors"
          >
            Back to portfolio
          </Link>
        </div>
      </article>
    </main>
  );
}
