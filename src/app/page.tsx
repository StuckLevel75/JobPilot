"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ClipboardList,
  CreditCard,
  Mail,
  MapPin,
  Sparkles,
  Users
} from "lucide-react";
import { AppShell } from "./components/app-shell";
import { PlanCard, StatCard, StatusBadge } from "./components/ui";
import { useWorkspace } from "./components/workspace-provider";
import { plans } from "./data";

const quickActions = [
  { label: "New job", icon: ClipboardList, href: "/jobs" },
  { label: "Add client", icon: Users, href: "/clients" },
  { label: "Send invoice", icon: CreditCard, href: "/invoices" },
  { label: "View packages", icon: Sparkles, href: "/packages" }
];

export default function Home() {
  const { activePlan, clients, invoices, jobs } = useWorkspace();
  const unpaidTotal = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((total, invoice) => total + Number(invoice.amount.replace(/[$,]/g, "")), 0);
  const bookedTotal = jobs.reduce(
    (total, job) => total + Number(job.value.replace(/[$,]/g, "")),
    0
  );
  const stats = [
    { label: "Active clients", value: String(clients.length), note: `${activePlan} plan` },
    { label: "Unpaid invoices", value: `$${unpaidTotal.toLocaleString()}`, note: "Needs follow-up" },
    { label: "Booked revenue", value: `$${bookedTotal.toLocaleString()}`, note: "Open job board" },
    { label: "Jobs tracked", value: String(jobs.length), note: "Saved in this browser" }
  ];

  return (
    <AppShell
      actionLabel="New job"
      eyebrow="Service business command center"
      title="Job Pilot"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </section>

          <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#17202e]">Upcoming Jobs</h2>
                <p className="text-sm text-[#6b7686]">
                  Keep scheduling, status, and money in one working view.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#d8e0ea] px-3 text-sm font-bold text-[#253348] transition hover:bg-[#f3f6fa]"
                href="/jobs"
              >
                View jobs
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#e5eaf1] text-sm text-[#6b7686]">
                    <th className="px-4 py-3 font-bold">Client</th>
                    <th className="px-4 py-3 font-bold">Service</th>
                    <th className="px-4 py-3 font-bold">Time</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 text-right font-bold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr className="border-b border-[#eef2f6] last:border-0" key={job.id}>
                      <td className="px-4 py-4 font-bold text-[#17202e]">{job.client}</td>
                      <td className="px-4 py-4 text-[#4a5667]">{job.service}</td>
                      <td className="px-4 py-4 text-[#4a5667]">{job.time}</td>
                      <td className="px-4 py-4">
                        <StatusBadge>{job.status}</StatusBadge>
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-[#17202e]">
                        {job.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Booking Page</h2>
                  <p className="text-sm text-[#6b7686]">Public intake for new jobs.</p>
                </div>
                <MapPin className="text-[#c36f3d]" size={22} />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Choose a service", "Pick a preferred time", "Pay a deposit"].map((item) => (
                  <div className="rounded-lg border border-[#edf1f6] p-3" key={item}>
                    <p className="text-sm font-bold text-[#253348]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Automation Queue</h2>
                  <p className="text-sm text-[#6b7686]">Reminders ready to send.</p>
                </div>
                <Mail className="text-[#1f6f5f]" size={22} />
              </div>
              <div className="space-y-3">
                {["3 appointment reminders", "2 unpaid invoice nudges", "1 quote follow-up"].map(
                  (item) => (
                    <div
                      className="flex items-center justify-between rounded-lg border border-[#edf1f6] px-3 py-3"
                      key={item}
                    >
                      <span className="text-sm font-semibold text-[#253348]">{item}</span>
                      <Bell size={16} className="text-[#6b7686]" />
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Quick Actions</h2>
              <Sparkles className="text-[#c36f3d]" size={20} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(({ href, icon: Icon, label }) => (
                <Link
                  className="flex h-24 flex-col items-start justify-between rounded-lg border border-[#dfe5ee] p-3 text-left text-sm font-bold text-[#253348] transition hover:border-[#1f6f5f] hover:bg-[#f4faf8]"
                  href={href}
                  key={label}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            {plans.slice(1, 3).map((plan) => (
              <PlanCard key={plan.name} selected={plan.name === activePlan} {...plan} />
            ))}
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
