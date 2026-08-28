import { CalendarPlus, MapPin } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { StatCard, StatusBadge } from "../components/ui";
import { jobs } from "../data";

export default function JobsPage() {
  return (
    <AppShell actionLabel="New job" eyebrow="Schedule and dispatch" title="Jobs">
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Scheduled" note="Next 7 days" value="18" />
          <StatCard label="In progress" note="2 crews active" value="4" />
          <StatCard label="Quote sent" note="Needs follow-up" value="7" />
          <StatCard label="Completed" note="This month" value="61" />
        </section>

        <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17202e]">Job Board</h2>
              <p className="text-sm text-[#6b7686]">
                Every scheduled job with crew, status, and value.
              </p>
            </div>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-3 text-sm font-bold text-white"
              type="button"
            >
              <CalendarPlus size={16} />
              Schedule job
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5eaf1] text-sm text-[#6b7686]">
                  <th className="px-4 py-3 font-bold">Job</th>
                  <th className="px-4 py-3 font-bold">Client</th>
                  <th className="px-4 py-3 font-bold">Service</th>
                  <th className="px-4 py-3 font-bold">Time</th>
                  <th className="px-4 py-3 font-bold">Crew</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 text-right font-bold">Value</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr className="border-b border-[#eef2f6] last:border-0" key={job.id}>
                    <td className="px-4 py-4 font-bold text-[#17202e]">{job.id}</td>
                    <td className="px-4 py-4 text-[#253348]">{job.client}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{job.service}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{job.time}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{job.crew}</td>
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

        <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <MapPin className="text-[#c36f3d]" size={22} />
            <div>
              <h2 className="text-lg font-bold">Route Snapshot</h2>
              <p className="text-sm text-[#6b7686]">
                Map routing will connect here when real locations are added.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
