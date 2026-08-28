"use client";

import type { FormEvent } from "react";
import { CalendarPlus, MapPin } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { Field, FormPanel, SelectField, StatCard, StatusBadge } from "../components/ui";
import { useWorkspace } from "../components/workspace-provider";

export default function JobsPage() {
  const { activePlanDetails, addJob, clients, jobs } = useWorkspace();
  const jobLimit = activePlanDetails.jobLimit;
  const atLimit = jobLimit !== "Unlimited" && jobs.length >= jobLimit;

  function handleAddJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const ok = addJob({
      client: String(form.get("client")),
      crew: String(form.get("crew")),
      service: String(form.get("service")),
      status: String(form.get("status")),
      time: String(form.get("time")),
      value: String(form.get("value"))
    });

    if (ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <AppShell actionLabel="New job" eyebrow="Schedule and dispatch" title="Jobs">
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Tracked jobs" note={`${activePlanDetails.name} package`} value={String(jobs.length)} />
          <StatCard label="Job limit" note="Upgrade raises this" value={String(jobLimit)} />
          <StatCard label="Scheduled" note="Ready to dispatch" value={String(jobs.filter((job) => job.status === "Scheduled").length)} />
          <StatCard label="Quote sent" note="Needs follow-up" value={String(jobs.filter((job) => job.status === "Quote Sent").length)} />
        </section>

        <FormPanel title="Schedule Job">
          {atLimit ? (
            <p className="rounded-lg bg-[#fff6e8] p-3 text-sm font-bold text-[#9a552b]">
              This package has reached its job limit. Upgrade on Packages to unlock more.
            </p>
          ) : (
            <form className="grid gap-4 lg:grid-cols-3" onSubmit={handleAddJob}>
              <SelectField label="Client" name="client" options={clients.map((client) => client.name)} />
              <Field label="Service" name="service" placeholder="Move-out clean" />
              <Field label="Time" name="time" placeholder="Monday, 10:00 AM" />
              <Field label="Crew" name="crew" placeholder="Avery + Kim" />
              <Field label="Value" name="value" placeholder="$350" />
              <SelectField label="Status" name="status" options={["Scheduled", "Quote Sent", "Deposit Paid", "Recurring"]} />
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white lg:col-span-3 lg:w-fit"
                type="submit"
              >
                <CalendarPlus size={16} />
                Save job
              </button>
            </form>
          )}
        </FormPanel>

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
