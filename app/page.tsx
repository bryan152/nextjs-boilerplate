"use client";

import { useState } from "react";
import Image from "next/image";

const interests = [
  "Homelabbing & self-hosted infrastructure",
  "PC gaming",
  "Going down YouTube rabbit holes",
  "Building and tinkering with servers",
  "Driving",
  "Cybersecurity",
];

const skills = [
  "C#", ".NET", "Azure Functions", "Azure Service Bus",
  "PowerShell", "Cosmos DB", "PowerBI", "Grafana",
  "React", "JavaScript", "HTML & CSS", "C++",
  "Git", "Linux", "Docker", "Proxmox",
  "Network Security", "Tailscale", "Linux Hardening",
];

const projects = [
  {
    name: "Personal Portfolio",
    description: "This site — built with Next.js and Tailwind CSS, deployed on Vercel.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    link: "https://nextjs-boilerplate-bice-omega-9aq2dfzhpq.vercel.app",
  },
  {
    name: "Viverlab",
    description: "Self-hosted home server running Proxmox, TrueNAS, Home Assistant, Frigate NVR, Jellyfin, and more.",
    tech: ["Proxmox", "TrueNAS", "Docker", "Linux"],
    link: null,
  },
  {
    name: "Cyborg Mobile – MVP",
    description: "Team project at Microsoft connecting first-generation students with mentors and professionals.",
    tech: ["React", "JavaScript", "HTML & CSS"],
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
      "Gained experience with PowerShell and Azure cloud tools including Cosmos DB, PowerBI, and Grafana.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "Microsoft",
    date: "June 2023 – September 2023",
    location: "Redmond, WA",
    bullets: [
      "Developed a utility DLL to facilitate communication between partner teams.",
      "Created a generic handler as a POC for DLL functionality viability.",
      "Collaborated on engineering and technical specs in a sprint-oriented environment.",
      "Gained hands-on experience with C#, Azure Functions, Service Bus, and online web apps.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "Microsoft – New Technologist (Cyborg Mobile)",
    date: "June 2022 – August 2022",
    location: "Redmond, WA",
    bullets: [
      "Collaborated on a team of 5 to build an MVP connecting first-generation students with mentors.",
      "Utilized React, JavaScript, Git, HTML, and C++ throughout the project.",
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
    school: "University of Washington",
    degree: "B.S. Computer Science (In Progress)",
    date: "Current",
    location: "Seattle, WA",
    bullets: [],
  },
  {
    school: "Everett Community College",
    degree: "A.A. Computer Science",
    date: "January 2020 – June 2022",
    location: "Everett, WA",
    bullets: [
      "Maintained a 3.8 GPA throughout academic career.",
      "Member of MESA, Rocket Club, and High-Performance Computers (SIGHPC).",
      "Tutor in Computer Science, English, Math, and Writing.",
    ],
  },
];

export default function Home() {
  const [items, setItems] = useState(interests);
  const [ascending, setAscending] = useState(true);

  const handleSort = () => {
    const sorted = [...items].sort((a, b) =>
      ascending ? b.localeCompare(a) : a.localeCompare(b)
    );
    setItems(sorted);
    setAscending(!ascending);
  };

  const linkClass = "bg-white text-[#1e3a5f] text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-100 transition";

  return (
    <main className="min-h-screen bg-[#f0f4fa] text-[#1a1a1a]">

      {/* Hero */}
      <div className="bg-[#1e3a5f] text-white px-6 py-16 text-center">
        <Image
          src="/ProfilePic.jpeg"
          alt="Bryan Viveros"
          width={110}
          height={110}
          className="rounded-full object-cover mx-auto mb-4 border-4 border-white"
        />
        <h1 className="text-4xl font-bold mb-2">Bryan Viveros</h1>
        <p className="text-blue-200 text-lg mb-6">CS Student · Aspiring Cybersecurity Professional · UW</p>

        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { label: "Email", href: "mailto:bviveros@uw.edu" },
            { label: "GitHub", href: "https://github.com/bryan152" },
            { label: "LinkedIn", href: "https://linkedin.com/in/bryan-viveros-02832216a" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">

        {/* About */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-3">About Me</h2>
          <p className="bg-white border border-[#1d5fa8] rounded-xl px-5 py-4 leading-relaxed">
            Hi, I&apos;m Bryan. A first-gen CS student at UW working towards a career in cybersecurity.
          </p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-[#1d5fa8] text-white text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.name} className="bg-white border border-[#1d5fa8] rounded-xl px-5 py-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-[#1e3a5f]">{project.name}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-[#1d5fa8] underline hover:text-[#c85200] transition">
                      View ↗
                    </a>
                  )}
                </div>
                <p className="text-sm text-[#1a1a1a] mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="bg-[#f0f4fa] border border-[#1d5fa8] text-[#1d5fa8] text-xs px-2 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-4">Experience</h2>
          <div className="space-y-5">
            {experience.map((job) => (
              <div key={job.org + job.date} className="bg-white border border-[#1d5fa8] rounded-xl px-5 py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <div>
                    <p className="font-semibold text-[#1e3a5f]">{job.title}</p>
                    <p className="text-[#1d5fa8] text-sm">{job.org}</p>
                  </div>
                  <div className="text-sm text-[#444444] sm:text-right mt-1 sm:mt-0">
                    <p>{job.date}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                <ul className="mt-2 space-y-1">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-sm text-[#1a1a1a] before:content-['·'] before:mr-2 before:text-[#1d5fa8]">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-4">Education</h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.school} className="bg-white border border-[#1d5fa8] rounded-xl px-5 py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <div>
                    <p className="font-semibold text-[#1e3a5f]">{edu.school}</p>
                    <p className="text-[#1d5fa8] text-sm">{edu.degree}</p>
                  </div>
                  <div className="text-sm text-[#444444] sm:text-right mt-1 sm:mt-0">
                    <p>{edu.date}</p>
                    <p>{edu.location}</p>
                  </div>
                </div>
                {edu.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {edu.bullets.map((b) => (
                      <li key={b} className="text-sm text-[#1a1a1a] before:content-['·'] before:mr-2 before:text-[#1d5fa8]">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold text-[#1e3a5f]">Things I&apos;m Into</h2>
            <button
              onClick={handleSort}
              className="text-sm bg-[#1d5fa8] text-white px-4 py-2 rounded-lg hover:bg-[#1e3a5f] transition"
            >
              Sort {ascending ? "Z → A" : "A → Z"}
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="bg-white border border-[#1d5fa8] rounded-lg px-4 py-3 text-[#1a1a1a]">
                {item}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}