const sections = [
  {
    title: "Building Practical Software",
    description:
      "I am interested in software that solves real problems and is understandable for the people using it. I like projects that connect planning, design, and implementation instead of only focusing on code.",
    links: [
      {
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
      },
      {
        title: "React Documentation",
        url: "https://react.dev/",
      },
      {
        title: "GitHub Docs",
        url: "https://docs.github.com/",
      },
    ],
  },
  {
    title: "Cybersecurity and Safer Systems",
    description:
      "Cybersecurity is one of the areas I want to keep growing in. I am interested in web security, access control, Linux, network security, and learning how to build systems that are safer from the start.",
    links: [
      {
        title: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
      },
      {
        title: "Mozilla Web Security Guidelines",
        url: "https://infosec.mozilla.org/guidelines/web_security",
      },
      {
        title: "CISA Cybersecurity Resources",
        url: "https://www.cisa.gov/resources-tools",
      },
    ],
  },
  {
    title: "Self-Hosting and Home Lab Learning",
    description:
      "My home lab is one of the main ways I learn. I use it to experiment with servers, dashboards, networking, monitoring, remote access, backups, and smart home tools.",
    links: [
      {
        title: "Proxmox Documentation",
        url: "https://pve.proxmox.com/wiki/Main_Page",
      },
      {
        title: "Docker Documentation",
        url: "https://docs.docker.com/",
      },
      {
        title: "Tailscale Knowledge Base",
        url: "https://tailscale.com/kb/",
      },
      {
        title: "Home Assistant Documentation",
        url: "https://www.home-assistant.io/docs/",
      },
    ],
  },
  {
    title: "Accessibility and Better Web Experiences",
    description:
      "I want my websites to be usable by more people. For this site, I focused on keyboard access so users can move through the site without needing a mouse.",
    links: [
      {
        title: "WebAIM: Keyboard Accessibility",
        url: "https://webaim.org/techniques/keyboard/",
      },
      {
        title: "W3C Introduction to Web Accessibility",
        url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
      },
      {
        title: "W3Schools Keyboard Shortcuts Reference",
        url: "https://www.w3schools.com/tags/ref_keyboardshortcuts.asp",
      },
    ],
  },
];

export default function ThingsToReadPage() {
  return (
    <main className="min-h-screen bg-[#f0f4fa] text-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Intro */}
        <section className="text-center">
          <p className="text-sm font-semibold text-[#1d5fa8] uppercase tracking-wide mb-2">
            From me to the world
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#1e3a5f] mb-3">
            Things I&apos;m Learning and Building Toward
          </h1>

          <p className="text-[#444444] leading-relaxed max-w-3xl mx-auto">
            This page shares the topics that connect to my projects, education,
            and career goals. I am interested in practical software,
            cybersecurity, self-hosted systems, accessibility, and technology
            that helps people solve real problems.
          </p>
        </section>

        {/* Search */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-3">
            Search More
          </h2>

          <p className="text-sm text-[#444444] mb-3">
            Use this search box to look up more information about the topics on
            this page.
          </p>

          <form
            action="https://www.google.com/search"
            method="GET"
            target="_blank"
            className="card px-5 py-4 flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="google-search" className="sr-only">
              Search Google
            </label>

            <input
              id="google-search"
              name="q"
              type="search"
              placeholder="Search Google for a topic..."
              className="flex-1 border border-[#1d5fa8] rounded-lg px-4 py-2"
            />

            <button
              type="submit"
              className="bg-[#1d5fa8] text-white px-5 py-2 rounded-lg hover:bg-[#1e3a5f] transition"
            >
              Search
            </button>
          </form>
        </section>

        {/* Reading Sections */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-4">
            Topics That Matter to Me
          </h2>

          <div className="space-y-5">
            {sections.map((section) => (
              <article key={section.title} className="card px-5 py-5">
                <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">
                  {section.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4">
                  {section.description}
                </p>

                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1d5fa8] underline hover:text-[#c85200]"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-bold text-lg">Bryan Viveros</p>
              <p className="text-sm text-blue-100">
                Learning in public through software, cybersecurity, and systems
                projects.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <a href="mailto:contact@bryanviveros.com">
                contact@bryanviveros.com
              </a>
              <a
                href="https://github.com/bryan152"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/bryan-viveros-02832216a"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <p className="footer-note">
            Keyboard access: Press Tab to move forward through the navigation,
            search box, buttons, and reading links. Press Shift + Tab to move
            backward. Press Enter to open a selected link or submit the search
            form. I focused on making navigation predictable and visible without
            requiring a mouse.
          </p>
        </div>
      </footer>
    </main>
  );
}