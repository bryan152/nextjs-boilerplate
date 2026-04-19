"use client";

import { useState } from "react";
import Image from "next/image";

const interests = [
  "🖥️ Homelabbing & self-hosted infrastructure",
  "📡 Networking and smart home automation",
  "🎯 Outdoor target shooting",
  "🔧 Building and tinkering with servers",
  "📷 Security cameras & NVR systems",
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

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-800 px-6 py-12 max-w-2xl mx-auto">
      {/* 1. Welcome message */}
      <h1 className="text-4xl font-bold mb-2">Welcome! 👋</h1>
      <p className="text-zinc-500 mb-10 text-lg">
        Glad you stopped by — take a look around!
      </p>

      {/* 2. Who you are */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">About Me</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Image
            src="/profile.jpg"   {/* drop a photo named profile.jpg into /public */}
            alt="Bryan Viveros"
            width={160}
            height={160}
            className="rounded-xl object-cover"
          />
          <p className="text-zinc-600 leading-relaxed">
            Hi, I&apos;m Bryan Viveros — a tech enthusiast and student based near
            Monroe, WA. When I&apos;m not studying, you can find me deep in my
            homelab, setting up self-hosted services, tinkering with network
            infrastructure, or heading out for some outdoor target shooting. I
            love understanding how things work under the hood and building
            systems that just <em>work</em>.
          </p>
        </div>
      </section>

      {/* 3 & 4. List of interests + sort button */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold">Things I&apos;m Into</h2>
          <button
            onClick={handleSort}
            className="text-sm bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition"
          >
            Sort {ascending ? "Z → A" : "A → Z"}
          </button>
        </div>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-zinc-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}