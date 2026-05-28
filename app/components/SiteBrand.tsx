"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteBrand() {
  const pathname = usePathname();
  const isDemoDayPage = pathname === "/demo-day";

  return (
    <Link
      href="/"
      className={isDemoDayPage ? "site-brand demo-team-brand" : "site-brand"}
    >
      {isDemoDayPage
        ? "Maya Shrufi · Zhixuan Hu · Shreyas Bhattarai · Bryan Viveros"
        : "Bryan Viveros"}
    </Link>
  );
}
