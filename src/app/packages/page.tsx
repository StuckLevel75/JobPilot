"use client";

import Link from "next/link";
import { LockKeyhole, PackageCheck, WalletCards } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { PlanCard, StatCard } from "../components/ui";
import { packageFeatures, plans } from "../data";
import { useWorkspace } from "../components/workspace-provider";

export default function PackagesPage() {
  const { activePlan, activePlanDetails, clients, jobs, resetDemo, startCheckout } = useWorkspace();
  const clientLimit = activePlanDetails.clientLimit;
  const jobLimit = activePlanDetails.jobLimit;

  return (
    <AppShell
      actionHref="/billing"
      actionLabel="Open billing"
      eyebrow="Plans and feature gates"
      title="Packages"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard
              action={
                <button
                  className={`h-10 w-full rounded-lg text-sm font-bold ${
                    activePlan === plan.name
                      ? "bg-[#163b5c] text-white"
                      : "border border-[#d8e0ea] text-[#253348] hover:bg-[#f3f6fa]"
                  }`}
                  onClick={() => startCheckout(plan.name, "Monthly")}
                  type="button"
                >
                  {activePlan === plan.name ? "Log current plan" : "Start checkout"}
                </button>
              }
              key={plan.name}
              selected={activePlan === plan.name}
              {...plan}
            />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Current package" note="Demo selector" value={activePlan} />
          <StatCard label="Client usage" note={`Limit: ${clientLimit}`} value={`${clients.length}`} />
          <StatCard label="Job usage" note={`Limit: ${jobLimit}`} value={`${jobs.length}`} />
          <StatCard label="Users included" note="Team seats" value={String(activePlanDetails.users)} />
        </section>

        <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17202e]">Feature Gates</h2>
              <p className="text-sm text-[#6b7686]">
                Paid packages unlock higher limits and automation.
              </p>
            </div>
            <PackageCheck className="text-[#1f6f5f]" size={24} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5eaf1] text-sm text-[#6b7686]">
                  <th className="px-4 py-3 font-bold">Feature</th>
                  <th className="px-4 py-3 font-bold">Free</th>
                  <th className="px-4 py-3 font-bold">Starter</th>
                  <th className="px-4 py-3 font-bold">Pro</th>
                  <th className="px-4 py-3 font-bold">Business</th>
                </tr>
              </thead>
              <tbody>
                {packageFeatures.map((row) => (
                  <tr className="border-b border-[#eef2f6] last:border-0" key={row.feature}>
                    <td className="px-4 py-4 font-bold text-[#17202e]">{row.feature}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{row.free}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{row.starter}</td>
                    <td className="px-4 py-4 text-[#1f6f5f]">{row.pro}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <LockKeyhole className="text-[#c36f3d]" size={22} />
              <div>
                <h2 className="text-lg font-bold">Next Billing Step</h2>
                <p className="text-sm text-[#6b7686]">
                  These plan limits can connect to Stripe subscriptions and permission checks next.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-3 text-sm font-bold text-white hover:bg-[#19594d]"
                href="/billing"
              >
                <WalletCards size={16} />
                Open billing
              </Link>
              <button
                className="h-10 rounded-lg border border-[#d8e0ea] px-3 text-sm font-bold text-[#253348] hover:bg-[#f3f6fa]"
                onClick={resetDemo}
                type="button"
              >
                Reset demo data
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
