"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeDollarSign,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  PackageCheck,
  Plus,
  Search,
  Settings,
  Users
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Jobs", href: "/jobs", icon: CalendarDays },
  { label: "Invoices", href: "/invoices", icon: CreditCard },
  { label: "Packages", href: "/packages", icon: PackageCheck }
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function AppShell({
  children,
  eyebrow,
  title,
  actionLabel = "New job"
}: Readonly<{
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  actionLabel?: string;
}>) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#17202e]">
      <aside className="fixed left-0 top-0 hidden h-screen w-24 border-r border-[#dfe5ee] bg-white xl:block">
        <div className="flex h-full flex-col items-center gap-6 py-5">
          <Link
            aria-label="Job Pilot dashboard"
            className="grid h-11 w-11 place-items-center rounded-lg bg-[#163b5c] text-sm font-bold text-white"
            href="/"
          >
            JP
          </Link>
          <nav className="flex flex-1 flex-col gap-3" aria-label="Primary">
            {navigation.map(({ href, icon: Icon, label }) => {
              const active = isActive(pathname, href);

              return (
                <Link
                  aria-label={label}
                  className={`grid h-11 w-11 place-items-center rounded-lg transition ${
                    active
                      ? "bg-[#e8f4ef] text-[#1f6f5f]"
                      : "text-[#546274] hover:bg-[#eef3f8] hover:text-[#163b5c]"
                  }`}
                  href={href}
                  key={href}
                  title={label}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </nav>
          <button
            aria-label="Settings"
            className="grid h-11 w-11 place-items-center rounded-lg text-[#546274] transition hover:bg-[#eef3f8] hover:text-[#163b5c]"
            type="button"
          >
            <Settings size={20} />
          </button>
        </div>
      </aside>

      <section className="xl:pl-24">
        <header className="border-b border-[#dfe5ee] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link
                aria-label="Job Pilot dashboard"
                className="grid h-11 w-11 place-items-center rounded-lg bg-[#163b5c] text-sm font-bold text-white xl:hidden"
                href="/"
              >
                JP
              </Link>
              <div>
                <p className="text-sm font-semibold text-[#6b7686]">{eyebrow}</p>
                <h1 className="text-2xl font-bold tracking-normal text-[#17202e]">{title}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#d8e0ea] bg-[#f8fafc] px-3 text-[#6b7686] sm:w-72">
                <Search size={18} />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#17202e] outline-none"
                  placeholder="Search clients or jobs"
                  type="search"
                />
              </label>
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white transition hover:bg-[#19594d]"
                type="button"
              >
                <Plus size={18} />
                {actionLabel}
              </button>
            </div>
          </div>
          <nav
            aria-label="Sections"
            className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-4 xl:hidden"
          >
            {navigation.map(({ href, label }) => (
              <Link
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold ${
                  isActive(pathname, href)
                    ? "bg-[#163b5c] text-white"
                    : "bg-[#eef3f8] text-[#546274]"
                }`}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>

        {children}
      </section>
    </main>
  );
}
