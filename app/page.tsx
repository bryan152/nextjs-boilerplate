"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const atAGlance = [
  {
    title: "Current Focus",
    value: "Applied Computing + Cybersecurity",
  },
  {
    title: "Main Strengths",
    value: "Software, cloud tools, systems, and troubleshooting",
  },
  {
    title: "Hands-On Work",
    value: "Home lab, self-hosting, web projects, automation, and dashboards",
  },
  {
    title: "Career Interests",
    value: "Software, IT, cybersecurity, cloud, and infrastructure roles",
  },
];

const resumeHighlights = [
  {
    title: "Software Engineering Intern",
    subtitle: "Microsoft",
    description:
      "Worked on engineering tools, technical specs, data gathering, and visualization projects in sprint-oriented environments.",
    tags: ["PowerShell", "Azure", "Cosmos DB", "Power BI", "Grafana"],
  },
  {
    title: "Self-Hosted Portfolio",
    subtitle: "Personal Project",
    description:
      "Started with a simple portfolio hosted on Vercel, then expanded the project into a self-hosted learning experience involving servers, deployment, DNS, monitoring, and mobile testing.",
    tags: ["Next.js", "Tailwind CSS", "Linux", "Self-hosting", "DNS"],
  },
  {
    title: "Viverlab Home Server",
    subtitle: "Home Lab",
    description:
      "Built a personal home lab environment for learning server administration, remote access, monitoring, backups, smart home tools, and self-hosted services.",
    tags: ["Proxmox", "Docker", "Tailscale", "Vaultwarden", "Uptime Kuma"],
  },
];

const skillGroups = [
  {
    title: "Build",
    description: "Frontend, web apps, scripts, and practical software projects.",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "HTML",
      "CSS",
      "C#",
      "C++",
      "PowerShell",
    ],
  },
  {
    title: "Automate",
    description: "Data gathering, reporting, Microsoft 365 tooling, and workflows.",
    skills: [
      "PowerShell",
      "Microsoft Graph",
      "Cosmos DB",
      "Power BI",
      "Grafana",
      "Azure Functions",
      "Azure Service Bus",
    ],
  },
  {
    title: "Deploy / Host",
    description: "Hands-on infrastructure, self-hosting, and server environments.",
    skills: [
      "Linux",
      "Docker",
      "Proxmox",
      "TrueNAS",
      "Vercel",
      "DNS",
      "Tailscale",
      "Remote SSH",
    ],
  },
  {
    title: "Monitor / Secure",
    description: "Security fundamentals, monitoring, access control, and hardening.",
    skills: [
      "Uptime Kuma",
      "Vaultwarden",
      "Home Assistant",
      "Access control",
      "Linux hardening",
      "OWASP concepts",
      "Network security basics",
    ],
  },
];

const projects = [
  {
    name: "Personal Portfolio Website",
    type: "Web Development / Self-Hosting",
    status: "Live / In Progress",
    description:
      "Built a resume and portfolio website with Next.js and Tailwind CSS. The project began as a simple Vercel deployment, then became a way to learn more about servers, DNS, deployment workflows, mobile testing, and self-hosted infrastructure.",
    workedOn: [
      "Built the site using Next.js and Tailwind CSS.",
      "Tested changes in a remote development environment before deployment.",
      "Practiced keyboard accessibility with visible focus states and keyboard-friendly navigation.",
      "Used the project to learn the difference between local development, hosted deployments, and self-hosting.",
      "Set up a professional contact email using bryanviveros.com.",
    ],
    skillsShown: [
      "Frontend development",
      "Responsive design",
      "Deployment workflow",
      "DNS basics",
      "Accessibility",
      "Mobile testing",
    ],
    tech: ["Next.js", "Tailwind CSS", "Vercel", "Linux", "Git", "Self-hosting"],
    link: "https://nextjs-boilerplate-bice-omega-9aq2dfzhpq.vercel.app",
  },
  {
    name: "Viverlab Home Server",
    type: "Systems / Home Lab",
    status: "Active Home Lab",
    description:
      "Created a home server environment for learning self-hosting, service management, dashboards, remote access, monitoring, backups, and personal infrastructure.",
    workedOn: [
      "Set up services for monitoring, password management, smart home tools, and remote access.",
      "Organized services into a personal dashboard to make tools easier to access.",
      "Explored safer remote access using Tailscale and self-hosted services.",
      "Used the home lab as a hands-on environment for learning networking and server administration.",
    ],
    skillsShown: [
      "Linux administration",
      "Self-hosting",
      "Networking",
      "Monitoring",
      "Troubleshooting",
      "Service organization",
    ],
    tech: [
      "Proxmox",
      "Docker",
      "Linux",
      "Tailscale",
      "Vaultwarden",
      "Uptime Kuma",
    ],
    link: null,
  },
  {
    name: "Home Assistant Smart Home Setup",
    type: "Smart Home / Usability",
    status: "Personal Infrastructure",
    description:
      "Configured a smart home setup for lights, cameras, and household controls with a focus on making common actions easier to access for everyday use.",
    workedOn: [
      "Created dashboard views for home controls.",
      "Organized controls so household members can access important features without admin tools.",
      "Connected smart lights and camera views into one interface.",
      "Focused on making the dashboard simple enough for daily use.",
    ],
    skillsShown: [
      "Dashboard design",
      "Usability",
      "Device organization",
      "Home networking",
      "Access planning",
    ],
    tech: ["Home Assistant", "Smart Home", "Dashboards", "Networking"],
    link: null,
  },
  {
    name: "Microsoft Migration Discovery Tool",
    type: "Internship / Data Tools",
    status: "Internship Project",
    description:
      "Worked on a tool concept for gathering and visualizing Microsoft 365 tenant migration data so admins could better understand users, groups, licenses, and related resources.",
    workedOn: [
      "Developed PowerShell scripts for data gathering.",
      "Worked with Microsoft Graph and Microsoft 365 data sources.",
      "Stored structured user and resource data for reporting.",
      "Created visual reporting ideas for migration planning.",
      "Worked with engineering and technical specs in a sprint-oriented environment.",
    ],
    skillsShown: [
      "PowerShell scripting",
      "Cloud data gathering",
      "Technical documentation",
      "Data visualization",
      "Problem solving",
    ],
    tech: ["PowerShell", "Microsoft Graph", "Cosmos DB", "Power BI", "Grafana"],
    link: null,
  },
  {
    name: "Cyborg Mobile MVP",
    type: "Team Project / Microsoft New Technologist",
    status: "Team MVP",
    description:
      "Collaborated on a team project focused on connecting first-generation students with mentors and professionals.",
    workedOn: [
      "Worked with a team of 5 to build an MVP.",
      "Helped with user interviews, planning, and engineering specs.",
      "Contributed to frontend development and team standups.",
    ],
    skillsShown: [
      "Team collaboration",
      "Frontend development",
      "User interviews",
      "Planning",
      "Technical communication",
    ],
    tech: ["React", "JavaScript", "HTML", "CSS", "Git"],
    link: null,
  },
];

const experience = [
  {
    title: "Software Engineer Intern",
    org: "Microsoft",
    date: "June 2024 – September 2024",
    location: "Redmond, WA",
    bullets: [
      "Developed PowerShell scripts and tools to gather data.",
      "Created a tool to visualize user data in a shareable and interactive format.",
      "Worked alongside teams in creating engineering and technical specs in a sprint-oriented environment.",
      "Gained experience with PowerShell and Azure cloud tools including Cosmos DB, Power BI, and Grafana.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "Microsoft",
    date: "June 2023 – September 2023",
    location: "Redmond, WA",
    bullets: [
      "Developed a utility DLL to facilitate communication between partner teams.",
      "Created a generic handler as a proof of concept for DLL functionality.",
      "Collaborated on engineering and technical specs in a sprint-oriented environment.",
      "Gained hands-on experience with C#, Azure Functions, Service Bus, and online web apps.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "Microsoft – New Technologist",
    date: "June 2022 – August 2022",
    location: "Redmond, WA",
    bullets: [
      "Collaborated on a team of 5 to build an MVP connecting first-generation students with mentors.",
      "Utilized React, JavaScript, Git, HTML, and CSS throughout the project.",
      "Conducted user interviews, wrote engineering specs, and led team standups.",
    ],
  },
  {
    title: "Volunteer",
    org: "EvCC STEM 101",
    date: "November 2023 – Present",
    location: "Everett, WA",
    bullets: [
      "Volunteered with the EvCC STEM 101 class to support students exploring computer science.",
    ],
  },
];

const education = [
  {
    school: "University of Washington Bothell",
    degree: "B.S. Applied Computing, Minor in Cybersecurity",
    date: "Current",
    location: "Bothell, WA",
    bullets: [],
  },
  {
    school: "Everett Community College",
    degree: "Associate of Arts and Sciences",
    date: "January 2020 – June 2022",
    location: "Everett, WA",
    bullets: [
      "Maintained a 3.8 GPA throughout academic career.",
      "Member of MESA, Rocket Club, and High-Performance Computers.",
      "Tutor in Computer Science, English, Math, and Writing.",
    ],
  },
];

const interestItems = [
  "Homelabbing & self-hosted infrastructure",
  "Cybersecurity",
  "Web development",
  "Smart home systems",
  "Cloud tools",
  "PC building and gaming",
];

export default function Home() {
  const [items, setItems] = useState(interestItems);
  const [ascending, setAscending] = useState(true);

  const handleSort = () => {
    const sorted = [...items].sort((a, b) =>
      ascending ? b.localeCompare(a) : a.localeCompare(b)
    );

    setItems(sorted);
    setAscending(!ascending);
  };

  const buttonLinkClass =
    "bg-white text-[#1e3a5f] text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-100 transition";

  return (
    <main className="min-h-screen bg-[#f0f4fa] text-[#1a1a1a]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#12304f] text-white px-6 py-16 text-center">
        <Image
          src="/ProfilePic.jpeg"
          alt="Bryan Viveros"
          width={120}
          height={120}
          className="rounded-full object-cover mx-auto mb-5 border-4 border-white shadow-lg"
          priority
        />

        <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-2">
          Portfolio / Resume
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-white">
          Bryan Viveros
        </h1>

        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-6">
          Applied Computing Student · Cybersecurity Minor · Software, Cloud, and
          Self-Hosted Systems Projects
        </p>

        <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-7">
          I build practical technology projects across web development,
          cybersecurity, Microsoft cloud tools, and home lab infrastructure. I
          like learning by building things that are useful in real life.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { label: "Email", href: "mailto:contact@bryanviveros.com" },
            { label: "GitHub", href: "https://github.com/bryan152" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/bryan-viveros-02832216a",
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={buttonLinkClass}
            >
              {label}
            </a>
          ))}

          <Link href="/things-to-read" className={buttonLinkClass}>
            Things to Read
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-14">
        {/* About */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">
            About Me
          </h2>

          <div className="card px-6 py-5 leading-relaxed">
            <p>
              I am an Applied Computing student at UW Bothell with a minor in
              cybersecurity. My work focuses on practical software, cloud tools,
              web development, and hands-on systems learning. I enjoy projects
              that connect code with real infrastructure, such as portfolio
              websites, dashboards, automation tools, and self-hosted services.
            </p>
          </div>
        </section>

        {/* At a Glance */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            At a Glance
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {atAGlance.map((item) => (
              <article key={item.title} className="card px-5 py-5">
                <p className="text-sm font-semibold text-[#1d5fa8] mb-2">
                  {item.title}
                </p>
                <p className="font-bold text-[#1e3a5f]">{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Resume Highlights */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            Resume Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {resumeHighlights.map((item) => (
              <article key={item.title} className="card px-5 py-5">
                <p className="text-sm text-[#1d5fa8] font-semibold mb-1">
                  {item.subtitle}
                </p>

                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge bg-[#f0f4fa] border border-[#1d5fa8] text-[#1d5fa8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            Technical Toolbox
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {skillGroups.map((group) => (
              <article key={group.title} className="card px-5 py-5">
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">
                  {group.title}
                </h3>

                <p className="text-sm text-[#444444] leading-relaxed mb-4">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="badge bg-[#1d5fa8] text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">
                Featured Projects
              </h2>
              <p className="text-sm text-[#444444] mt-1">
                A mix of internship work, personal infrastructure, and hands-on
                learning projects.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {projects.map((project) => (
              <article key={project.name} className="card px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="badge bg-[#dbeafe] text-[#1e3a5f]">
                        {project.type}
                      </span>
                      <span className="badge bg-[#fff7ed] text-[#c85200]">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1e3a5f]">
                      {project.name}
                    </h3>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1d5fa8] underline hover:text-[#c85200] transition"
                    >
                      View Project ↗
                    </a>
                  )}
                </div>

                <p className="text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="grid lg:grid-cols-2 gap-5 mb-4">
                  <div>
                    <p className="font-semibold text-[#1e3a5f] mb-2">
                      What I worked on:
                    </p>

                    <ul className="space-y-1">
                      {project.workedOn.map((item) => (
                        <li
                          key={item}
                          className="text-sm before:content-['·'] before:mr-2 before:text-[#1d5fa8]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-[#1e3a5f] mb-2">
                      Skills demonstrated:
                    </p>

                    <ul className="space-y-1">
                      {project.skillsShown.map((item) => (
                        <li
                          key={item}
                          className="text-sm before:content-['·'] before:mr-2 before:text-[#1d5fa8]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="badge bg-[#f0f4fa] border border-[#1d5fa8] text-[#1d5fa8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            Experience
          </h2>

          <div className="space-y-5">
            {experience.map((job) => (
              <article key={job.org + job.date} className="card px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-[#1e3a5f]">{job.title}</h3>
                    <p className="text-[#1d5fa8] text-sm font-semibold">
                      {job.org}
                    </p>
                  </div>

                  <div className="text-sm text-[#444444] sm:text-right">
                    <p>{job.date}</p>
                    <p>{job.location}</p>
                  </div>
                </div>

                <ul className="space-y-1">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm before:content-['·'] before:mr-2 before:text-[#1d5fa8]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            Education
          </h2>

          <div className="space-y-5">
            {education.map((edu) => (
              <article key={edu.school} className="card px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="font-bold text-[#1e3a5f]">{edu.school}</h3>
                    <p className="text-[#1d5fa8] text-sm font-semibold">
                      {edu.degree}
                    </p>
                  </div>

                  <div className="text-sm text-[#444444] sm:text-right">
                    <p>{edu.date}</p>
                    <p>{edu.location}</p>
                  </div>
                </div>

                {edu.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {edu.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm before:content-['·'] before:mr-2 before:text-[#1d5fa8]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">
              Things I&apos;m Into
            </h2>

            <button
              onClick={handleSort}
              className="text-sm bg-[#1d5fa8] text-white px-4 py-2 rounded-full hover:bg-[#1e3a5f] transition"
            >
              Sort {ascending ? "Z → A" : "A → Z"}
            </button>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item) => (
              <li key={item} className="card px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="site-footer">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-bold text-lg">Bryan Viveros</p>
              <p className="text-sm text-blue-100">
                Software · Cybersecurity · Cloud · Self-hosted systems
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
              <Link href="/things-to-read">Things to Read</Link>
            </div>
          </div>

          <p className="footer-note">
            Keyboard access: Press Tab to move forward, Shift + Tab to move
            backward, and Enter to open a selected link or activate a button. I
            focused on making navigation predictable and visible without
            requiring a mouse.
          </p>
        </div>
      </footer>
    </main>
  );
}