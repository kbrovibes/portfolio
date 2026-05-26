"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, X, ZoomIn } from "lucide-react";

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.94)" }}
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
        >
          <X size={14} /> Close
        </button>
        <img src={src} alt={caption} className="w-full rounded-xl object-contain max-h-[80vh]" />
        <p className="mt-3 text-center text-sm text-white/35 italic">{caption}</p>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Chapter({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <div className="mb-8">
        <span className="text-[11px] font-bold tracking-[0.3em] text-amber-400/50 uppercase block mb-2">{num}</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{title}</h2>
        <div className="mt-3 h-px bg-gradient-to-r from-amber-500/25 to-transparent" />
      </div>
      <div>{children}</div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-white/60 text-[17px] leading-[1.85] font-light">{children}</div>
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
  onExpand,
}: {
  src: string;
  caption: string;
  wide?: boolean;
  onExpand: (src: string, caption: string) => void;
}) {
  return (
    <figure className={`my-8 ${wide ? "w-full" : "w-full sm:max-w-lg"}`}>
      <div
        className="rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02] cursor-zoom-in group relative"
        onClick={() => onExpand(src, caption)}
      >
        <img src={src} alt={caption} className="w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-70 transition-opacity" />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-white/25 italic">{caption}</figcaption>
    </figure>
  );
}

function PhotoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">{children}</div>;
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

// ── Main post ─────────────────────────────────────────────────────────────────

export default function LoggingOut() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const expand = (src: string, caption: string) => setLightbox({ src, caption });

  return (
    <main className="min-h-screen" style={{ background: "#0a0a12" }}>
      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-white/[0.04]" style={{ background: "rgba(10,10,18,0.85)" }}>
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors">
            <ArrowLeft size={14} />
            <span>All posts</span>
          </Link>
          <span className="text-sm font-semibold text-white/40">K1<span className="text-amber-400">.</span></span>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden pt-20 pb-16 px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(251,146,60,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {["Amazon", "Neptune", "Farewell", "Nostalgia"].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-400/80 border border-amber-500/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-[0.95]">
            K1:{" "}
            <span style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
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

      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pb-24">
        {/* Intro */}
        <div className="mb-16">
          <Prose>
            <p>As I wrap up my time with Neptune, I thought I&apos;d leave you with something more entertaining than an out-of-office message.</p>
            <p>This isn&apos;t documentation. It&apos;s not a design review.</p>
            <p>It&apos;s pure, unfiltered trivia from the early (and chaotic) days of our beloved graph engine.</p>
          </Prose>
        </div>

        <Chapter num="01" title="Random Trivia Nobody Asked For (But You're Getting Anyway)">
          <Prose>
            <p>You&apos;d think my Amazon journey started with code. Technically, it started with scissors and tape.</p>
            <p>It was 2011. I had just joined Amazon, wide-eyed and under-caffeinated. A few weeks in, someone floated the idea of a &ldquo;Desk Decoration Contest.&rdquo; Naturally, I took it way too seriously.</p>
          </Prose>
          <PullQuote>My theme? &ldquo;The Facebook Wall&rdquo; - back when people still used Facebook walls.</PullQuote>
          <Prose>
            <p>My teammates were listed as &ldquo;Friends&rdquo; on profile sidebars. Team launches and updates became part of the &ldquo;News Feed.&rdquo; Even had random fun posts and &ldquo;likes&rdquo; from my imaginary social graph.</p>
            <p>Yes, it was lame. But I won. No prizes. No trophies. Just eternal bragging rights and a slightly confused director who walked by and asked if this was a new internal tool.</p>
            <p>Anyway - that was the beginning of my Amazon journey. Fast-forward a few years, and I&apos;d go from decorating desks to helping build a full-blown graph database. Funny how these things work out.</p>
          </Prose>
          <PhotoGrid>
            <Photo src="/blog/logging-out/desk-decoration-2011.png" caption="The one where I was Small-K, 2011." onExpand={expand} />
            <Photo src="/blog/logging-out/desk-decoration-winner.png" caption="The proof." onExpand={expand} />
          </PhotoGrid>
        </Chapter>

        <Chapter num="02" title="Episode I: The Phantom Gremlin">
          <Prose>
            <p>Once upon a December 2015, Divij - yes, our OG Gremlin Guy - told me about this mysterious, secret Amazon team building a graph database.</p>
          </Prose>
          <PullQuote>&ldquo;It&apos;s not listed anywhere in JobFinder,&rdquo; he said. &ldquo;But trust me - it&apos;s real.&rdquo;</PullQuote>
          <Prose>
            <p>Naturally, I was intrigued. He connected me to Omer Zaki, and a few emails later, I was in.</p>
            <p>Fun fact: I technically joined before Divij, so I get bragging rights as the guy who wrote the first line of code for Neptune. But let&apos;s be fair - Divij was the first official offer. So let&apos;s call it even.</p>
          </Prose>
          <PhotoGrid>
            <Photo src="/blog/logging-out/gremlin-2014.png" caption="The one with the Gremlin himself, 2014." onExpand={expand} />
            <Photo src="/blog/logging-out/first-neptune-commit.png" caption="The one before Air-routes took over." onExpand={expand} />
          </PhotoGrid>
        </Chapter>

        <Chapter num="03" title='How We Got the Name "Neptune"'>
          <Prose>
            <p>Ah, the naming mythology. There are a few versions, but here&apos;s the correct one - aka the one I was there for.</p>
            <p>Back in the day, there was this open-source graph DB called <strong className="text-white/80">Titan</strong>. It supported multiple storage backends - Cassandra, local files, and yes, even a custom DynamoDB backend written by a DDB SDE in their spare time.</p>
            <p>In my early days, I was wrangling Titan artifacts, fixing bugs, and stitching it all together. Then someone went, &ldquo;Hey, let&apos;s pick a codename.&rdquo;</p>
          </Prose>
          <div className="my-8 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
            <p className="text-sm text-white/50 mb-3 uppercase tracking-wider font-semibold">Enter Roman mythology</p>
            <ul className="space-y-2 text-white/70">
              {["Titans ruled the old world.", "The Olympians, including Neptune, overthrew them.", "Neptune didn't fight in the war - but he inherited the world."].map((s) => (
                <li key={s} className="flex items-start gap-3"><span className="text-amber-400 mt-0.5">·</span><span>{s}</span></li>
              ))}
            </ul>
          </div>
          <Prose>
            <p>That codename eventually made it to Andy&apos;s desk and became the final product name. (Though rumor has it Omer just liked military planes, and &ldquo;Neptune&rdquo; is one of them. You pick your favorite version.)</p>
          </Prose>
          <div className="mt-6 flex flex-col gap-2">
            <RefLink href="https://aws.amazon.com/blogs/big-data/building-a-graph-database-on-aws-using-amazon-dynamodb-and-titan/">Building a graph database on AWS using DynamoDB and Titan</RefLink>
            <RefLink href="https://www.allthingsdistributed.com/2015/08/titan-graphdb-integration-in-dynamodb.html">Titan GraphDB integration in DynamoDB (Werner Vogels)</RefLink>
          </div>
        </Chapter>

        <Chapter num="04" title="That One Time I Gave a Terrible Talk">
          <Prose>
            <p>Sainath and AK joined as #3 and #4. I first met them in March 2016, during what was meant to be a deep-dive tech talk on possible storage layouts for graph data.</p>
            <p>I had spent weeks researching storage models, indexing strategies, adjacency representations, and compression formats. I was ready to deliver a cutting-edge session.</p>
          </Prose>
          <PullQuote>It was not great. Okay, it was awful. Easily the worst presentation of my Amazon career.</PullQuote>
          <Prose>
            <p>They hadn&apos;t officially joined yet - this was just a pre-onboarding &ldquo;get to know the mess you&apos;re joining&rdquo; kind of thing.</p>
            <p>A few days later, I went off on a month-long solo backpacking trip across Europe. In Brussels, I passed someone on the street and thought, &ldquo;Huh. That face looks familiar.&rdquo;</p>
            <p>Weeks later, it hit me: I had casually walked past AK. Small world.</p>
          </Prose>
          <Photo src="/blog/logging-out/brussels-2016.png" caption="The one where AK is reading up on Dictionary Encoding from a cafe in Belgium, 2016." wide onExpand={expand} />
        </Chapter>

        <Chapter num="05" title="The Blazegraph Merge: Legends Assembled (August 2016)">
          <Prose>
            <p>I wasn&apos;t in the loop on the Blazegraph acquisition. So imagine my surprise when Brad, Bryan, Alex, and the rest just showed up one day.</p>
          </Prose>
          <PullQuote>No warning. Just boom - new teammates.</PullQuote>
          <Prose>
            <p>Brad, by the way, was a magician. He took all those Blazegraph packages and made them work with Brazil. I still haven&apos;t met anyone who understands Amazon&apos;s build system better than him.</p>
          </Prose>
          <Photo src="/blog/logging-out/blazegraph-team.png" caption="The one that shows that Sainath does not age." wide onExpand={expand} />
        </Chapter>

        <Chapter num="06" title="When the Control Plane Lived on My Devbox">
          <Prose>
            <p>At one point, Neptune was running on a control plane forked from RDS.</p>
            <p>Hundreds of packages. Everything wired together like a mad science experiment.</p>
          </Prose>
          <PullQuote>All services running from my devbox. I wish I were exaggerating.</PullQuote>
          <Photo src="/blog/logging-out/first-neptune-commit.png" caption="NeptuneDatasetGenerator · First checkin. Moving files. — April 2016." wide onExpand={expand} />
        </Chapter>

        <Chapter num="07" title="The re:Invent Moment">
          <Prose>
            <p>During Neptune&apos;s big launch at re:Invent 2017, there was a poll: <em>&ldquo;Which announcement are you most excited about?&rdquo;</em></p>
          </Prose>
          <PullQuote>Neptune was in the top 5. We were the hype drop of the year.</PullQuote>
          <Photo src="/blog/logging-out/reinvent-top5.png" caption="Amazon Neptune at #4 — re:Invent 2017. It belongs in the Louvre." wide onExpand={expand} />
          <PhotoGrid>
            <Photo src="/blog/logging-out/brad-hebrew.png" caption="The one where Brad spoke in Hebrew." onExpand={expand} />
            <Photo src="/blog/logging-out/ga-deployment.png" caption="The one where we were staring at the GA deployment." onExpand={expand} />
          </PhotoGrid>
        </Chapter>

        <Chapter num="08" title="Graphing the Org: One Hop at a Time">
          <Prose>
            <p>At some point in the early Neptune days - before IAM auth was even a twinkle in our backlog - I built my very first app using our graph engine.</p>
            <p>I called it <strong className="text-white/80">Amazonians Website</strong> - a modest name for what was essentially &ldquo;Phonetool Done Right.&rdquo;</p>
            <p>Every person became a node. Org chains, dotted lines, bar-raisers, mentors - all modeled as edges, traversed via Gremlin queries.</p>
          </Prose>
          <PullQuote>The result? Gloriously overengineered. Secure-ish. And absolutely addictive.</PullQuote>
          <Photo src="/blog/logging-out/phonetool-graph.png" caption="The one where I was just 6 steps away from Jeff Bezos." wide onExpand={expand} />
        </Chapter>

        <Chapter num="09" title="Old-Fart Status: Unlocked">
          <Prose>
            <p>I spent a few years up in Vancouver, BC - home of scenic views, polite escalator etiquette, and surprisingly few Amazonians at the time.</p>
            <p>There was an internal dashboard that tracked how long you&apos;d been around relative to others in the region. Turns out, I had a rare badge of honor: an &ldquo;old-fart rank&rdquo; of under 100. That meant fewer than 100 people in all of Canada had joined Amazon before me and were still hanging around.</p>
          </Prose>
          <PullQuote>I checked it again recently - and the rank is still proudly holding up.</PullQuote>
          <Photo src="/blog/logging-out/old-fart-rank.png" caption="The one that makes me feel OLD(er). Rank 11,778 out of 1.66M Amazonians." wide onExpand={expand} />
        </Chapter>

        <Chapter num="10" title="Photos, Or It Didn't Happen">
          <Prose><p>A few to trigger nostalgia, and possibly HR reviews.</p></Prose>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            {[
              { src: "/blog/logging-out/team-outing-l6.png", caption: "The one with the first L6 promo in the team." },
              { src: "/blog/logging-out/go-karts-dan.png", caption: "The one where Dan cheated at Go Karting." },
              { src: "/blog/logging-out/go-kart-podium.png", caption: "The podium. The receipts." },
              { src: "/blog/logging-out/team-sailing.png", caption: "The one at Geo's that I was not supposed to share." },
              { src: "/blog/logging-out/chili-cookoff.png", caption: "The one where Rondelli met Kunal's expectation that he won't meet his expectations." },
              { src: "/blog/logging-out/gremlin-2014.png", caption: "The one that started it all." },
            ].map((p) => (
              <Photo key={p.src} src={p.src} caption={p.caption} onExpand={expand} />
            ))}
          </div>
        </Chapter>

        {/* Closing */}
        <div className="mt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
          <Prose>
            <p>And that&apos;s a wrap. It&apos;s been a wild, hilarious, occasionally confusing ride - and I wouldn&apos;t trade it for anything.</p>
            <p>What I&apos;ll miss most? The people. The inside jokes. The &ldquo;this-could&apos;ve-been-an-email&rdquo; meetings. The group chats that went from deep dives to lunch polls in under 3 messages.</p>
            <p>Let&apos;s definitely find an excuse to work together again - whether it&apos;s building something new, reviving old ideas, or just pretending to be productive over coffee.</p>
            <p>Don&apos;t be a stranger. I&apos;ll see you out there.</p>
          </Prose>
          <div className="mt-10">
            <p
              className="text-3xl font-black"
              style={{ background: "linear-gradient(135deg, #f59e0b, #f97316, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              - Karthik
            </p>
            <p className="text-white/25 text-sm mt-1">(BigK, K1, KR)</p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors">
            <ArrowLeft size={13} /> All posts
          </Link>
          <Link href="/" className="text-sm text-white/35 hover:text-white/70 transition-colors">Back to portfolio</Link>
        </div>
      </article>
    </main>
  );
}
