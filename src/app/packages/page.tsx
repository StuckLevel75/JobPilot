import { LockKeyhole, PackageCheck } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { PlanCard } from "../components/ui";
import { packageFeatures, plans } from "../data";

export default function PackagesPage() {
  return (
    <AppShell actionLabel="Upgrade plan" eyebrow="Plans and feature gates" title="Packages">
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
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
          <div className="flex items-center gap-3">
            <LockKeyhole className="text-[#c36f3d]" size={22} />
            <div>
              <h2 className="text-lg font-bold">Next Billing Step</h2>
              <p className="text-sm text-[#6b7686]">
                These plan limits can connect to Stripe subscriptions and permission checks next.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
