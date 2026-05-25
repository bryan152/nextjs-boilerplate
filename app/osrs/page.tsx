import Link from "next/link";

const menuGroups = [
  {
    title: "Game",
    links: [
      "Why OSRS still works",
      "Progress that feels earned",
      "Simple graphics, deep systems",
      "Music and nostalgia",
    ],
  },
  {
    title: "Community",
    links: [
      "Videos I recommend",
      "Wikis, guides, and memes",
      "Random players in chat",
      "The Grand Exchange economy",
    ],
  },
  {
    title: "Account",
    links: [
      "Nostalgia",
      "Internet safety lessons",
      "Stronghold of Security",
      "Software curiosity",
    ],
  },
];

const reasons = [
  {
    title: "Nostalgia That Still Works",
    text:
      "The music, login screen, map, and old-school graphics remind me of being younger and entering an online world that felt way bigger than it looked. It feels familiar without needing to be flashy.",
  },
  {
    title: "Progress Feels Earned",
    text:
      "OSRS is slow in a way that modern games usually are not. Leveling, questing, and making money take time, but that is why the progress feels satisfying instead of disposable.",
  },
  {
    title: "The Community Builds the Game",
    text:
      "RuneScape is more than the game client. The wikis, guides, videos, memes, calculators, forums, and random players in chat are part of what makes the world feel alive.",
  },
];

const personalStats = [
  {
    label: "Nostalgia level",
    value: "99",
    text:
      "OSRS brings back the feeling of logging in when I was younger and getting pulled into a world that felt huge, mysterious, and somehow peaceful.",
  },
  {
    label: "Cybersecurity lesson",
    value: "Stronghold",
    text:
      "RuneScape taught me early internet lessons through scams, trades, passwords, account safety, and the Stronghold of Security. Looking back, it honestly connects to why I care about cybersecurity now.",
  },
  {
    label: "Software curiosity",
    value: "Scripts",
    text:
      "The game also made me curious about how online systems worked. Bots, scripts, account security, item prices, and game tools all made the internet feel like something I wanted to understand.",
  },
];

const screenshots = [
  {
    title: "Hello CSS480 at the Grand Exchange",
    image: "/osrs/hello-css480.png",
    alt: "My Old School RuneScape character standing at the Grand Exchange saying hello CSS480",
    text:
      "Here I am standing at the Grand Exchange, one of the most recognizable social and economic places in OSRS, and saying hello to CSS480.",
  },
  {
    title: "Gem crab chaos",
    image: "/osrs/gem-crab.png",
    alt: "My Old School RuneScape character standing near a crowded gem crab event",
    text:
      "This shows the weird and funny side of OSRS. A crowded event, random chat, and a giant gem crab captures how the game can still feel alive and unpredictable.",
  },
  {
    title: "Adventure awaits",
    image: "/osrs/adventure-awaits.png",
    alt: "My Old School RuneScape character standing near ships with the message the world is yours to explore",
    text:
      "This screenshot shows why OSRS still feels like a big world to me. Even with simple graphics, the game makes exploration feel open, nostalgic, and personal.",
  },
];

const playStyles = [
  {
    title: "Questing",
    text:
      "The quests are memorable because they can be serious, funny, confusing, and ridiculous all at once. It feels like old internet humor mixed into a fantasy adventure.",
  },
  {
    title: "Grand Exchange",
    text:
      "The Grand Exchange turns the game into a tiny medieval economy. Sometimes the adventure is fighting monsters, and sometimes it is trying to make a little profit from item prices.",
  },
  {
    title: "Skilling",
    text:
      "Fishing, woodcutting, mining, and other skills are simple, but that is part of the comfort. They give the game a calm rhythm when I do not want something intense.",
  },
];

export default function OsrsPage() {
  return (
    <main className="osrs-login-page">
      <div className="osrs-shell">
        <div className="osrs-top-bar">
          <Link href="/" className="osrs-small-link">
            ← Back to portfolio
          </Link>

          <a
            href="https://oldschool.runescape.com/"
            className="osrs-small-link"
            target="_blank"
            rel="noreferrer"
          >
            Official OSRS site
          </a>

          <span>Log in</span>
        </div>

        <section className="osrs-login-hero">
          <div className="osrs-character-row" aria-hidden="true">
            <span>♙</span>
            <span>⚔</span>
            <span>🧙</span>
            <span>🛡</span>
            <span>⛏</span>
            <span>🎣</span>
            <span>🏹</span>
          </div>

          <div className="osrs-logo-box">
            <p className="osrs-rune-row">R U N E</p>
            <h1>Old School RuneScape</h1>
            <p className="osrs-ribbon">nostalgia portal</p>
          </div>

          <p className="osrs-player-count">
            There are currently <strong>68,751</strong> people playing.
            Probably.
          </p>

          <div className="osrs-start-buttons">
            <a href="#main-content" className="osrs-big-button">
              New user?
              <span>Start quest here</span>
            </a>

            <a href="#try-osrs" className="osrs-big-button">
              Free player?
              <span>Try OSRS</span>
            </a>

            <a href="#music" className="osrs-big-button">
              Music?
              <span>Play nostalgia</span>
            </a>
          </div>
        </section>

        <div className="osrs-layout" id="main-content">
          <aside
            className="osrs-sidebar"
            aria-label="Old School RuneScape style navigation panels"
          >
            {menuGroups.map((group) => (
              <section className="osrs-menu-panel" key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link}>
                      <span className="osrs-green-dot">✦</span>
                      {link}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </aside>

          <section className="osrs-main-panel">
            <article className="osrs-news-box">
              <p className="osrs-panel-kicker"></p>
              <h2>Why I still log into Old School RuneScape</h2>

              <p>
                Old School RuneScape is not awesome because it looks modern. It
                is awesome because it feels familiar, gives players long-term
                goals, and has a community that turns a simple-looking game into
                a huge online world.
              </p>

              <p>
                I grew up playing RuneScape, so part of the appeal is
                nostalgia. But it is also the early internet feeling around it:
                learning from guides, watching videos, asking strangers
                questions in chat, getting scammed once and learning from it,
                and slowly figuring out how online worlds worked.
              </p>
            </article>

            <section className="osrs-inspiration-panel">
              <div>
                <p className="osrs-panel-kicker">Website inspiration</p>
                <h2>The login screen style</h2>
                <p>
                  I based this page on the old-school RuneScape login screen:
                  dark stone textures, small menu panels, bright green/yellow
                  text, and chunky buttons. I like how it instantly feels like
                  early internet gaming.
                </p>
              </div>

              <figure className="osrs-inspiration-image">
                <img
                  src="/osrs/login-inspiration.png"
                  alt="Old School RuneScape login screen inspiration"
                />
                <figcaption>
                  Inspiration image: the classic OSRS login screen layout.
                </figcaption>
              </figure>
            </section>

            <div className="osrs-reason-list">
              {reasons.map((reason) => (
                <article className="osrs-stone-card" key={reason.title}>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              ))}
            </div>

            <section className="osrs-gallery-section">
              <p className="osrs-panel-kicker">My screenshots</p>
              <h2>My small moments in Gielinor</h2>
              <p>
                I wanted this page to include screenshots I took myself so it
                feels more personal instead of only talking about the game in
                general.
              </p>

              <div className="osrs-screenshot-grid">
                {screenshots.map((screenshot) => (
                  <figure className="osrs-screenshot-card" key={screenshot.title}>
                    <img src={screenshot.image} alt={screenshot.alt} />
                    <figcaption>
                      <strong>{screenshot.title}</strong>
                      <span>{screenshot.text}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="osrs-stat-section">
              <h2>Personal stats</h2>

              <div className="osrs-stat-grid">
                {personalStats.map((stat) => (
                  <article className="osrs-stat-card" key={stat.label}>
                    <span>{stat.value}</span>
                    <h3>{stat.label}</h3>
                    <p>{stat.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="osrs-stat-section">
              <h2>My favorite ways to play</h2>

              <div className="osrs-stat-grid">
                {playStyles.map((style) => (
                  <article className="osrs-stat-card" key={style.title}>
                    <span>✦</span>
                    <h3>{style.title}</h3>
                    <p>{style.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="osrs-music-panel" id="music">
              <div>
                <p className="osrs-panel-kicker">Music</p>
                <h2>The soundtrack is part of the nostalgia</h2>

                <p>
                  The OSRS music is a big part of why the game feels familiar.
                  Sea Shanty 2 is one of my favorites because it instantly
                  sounds like old RuneScape to me.
                </p>

                <p className="osrs-credit-note">
                  Music credit: Sea Shanty 2 is from RuneScape/Old School
                  RuneScape and belongs to its original creators. I am embedding
                  it here as one of my favorite tracks from the game.
                </p>

                <div className="osrs-music-actions">
                  <a
                    href="https://www.youtube.com/results?search_query=old+school+runescape+music+playlist"
                    className="osrs-site-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open OSRS music playlist on YouTube
                  </a>

                  <a
                    href="https://www.youtube.com/watch?v=BcRWkoVFqXw"
                    className="osrs-site-button osrs-site-button-secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Sea Shanty 2 on YouTube
                  </a>
                </div>
              </div>

              <div className="osrs-sea-shanty-card">
                <div className="osrs-video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/BcRWkoVFqXw"
                    title="Sea Shanty 2 by Jagex Audio Team"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <p>
                  <strong>Sea Shanty 2 from OSRS</strong> — a classic you
                  cannot help but move your head to!
                </p>
              </div>
            </section>

            <section className="osrs-video-section" id="videos">
              <h2>Recommended videos</h2>

              <p>
                These videos help explain why RuneScape still has such a strong
                pull. It is not just old graphics. It is nostalgia, community,
                stories, goals, and a very specific kind of internet culture.
              </p>

              <div className="osrs-video-grid">
                <article className="osrs-video-card">
                  <div className="osrs-video-frame">
                    <iframe
                      src="https://www.youtube.com/embed/xnINMGL1TQ4?si=wqRFFMUOUzJHGssL"
                      title="YouTube video about why people still play RuneScape"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  <h3>Why people still play RuneScape</h3>
                </article>

                <article className="osrs-video-card">
                  <div className="osrs-video-frame">
                    <iframe
                      src="https://www.youtube.com/embed/7RNK0YBdwko?si=v4dxhd6vVfwnXqVU"
                      title="YouTube RuneScape documentary video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  <h3>RuneScape as an online world</h3>
                </article>
              </div>
            </section>

            <section className="osrs-try-panel" id="try-osrs">
              <p className="osrs-panel-kicker">Try it yourself</p>
              <h2>Should you try Old School RuneScape?</h2>

              <p>
                If you like games that let you make your own goals, learn from
                the community, and slowly build progress over time, OSRS is
                worth trying. It is old, weird, grindy, and somehow still one of
                the most interesting online games around.
              </p>

              <a
                href="https://oldschool.runescape.com/"
                className="osrs-site-button"
                target="_blank"
                rel="noreferrer"
              >
                Visit the official OSRS website
              </a>
            </section>

            <section className="osrs-design-panel" id="design">
              <p className="osrs-panel-kicker">Design explanation</p>
              <h2>How this page guides attention</h2>

              <p>
                I designed this page to guide attention like an old RuneScape
                login screen. The large center title and buttons catch
                attention first. The left menu panels guide the eye second
                because they are grouped and repeated. The main content panel
                comes third because it holds the deeper explanation.
              </p>

              <p>
                The page uses visual hierarchy, contrast, proximity, and
                similarity. The dark stone background and bright gold/green text
                create contrast. The menu panels use proximity to group related
                ideas. The repeated black boxes and buttons use similarity so
                the page feels organized.
              </p>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
