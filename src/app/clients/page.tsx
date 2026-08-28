"use client";

import type { FormEvent } from "react";
import { Mail, Phone, UserPlus } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { Field, FormPanel, SelectField, StatCard, StatusBadge } from "../components/ui";
import { useWorkspace } from "../components/workspace-provider";

export default function ClientsPage() {
  const { activePlanDetails, addClient, clients } = useWorkspace();
  const clientLimit = activePlanDetails.clientLimit;
  const atLimit = clientLimit !== "Unlimited" && clients.length >= clientLimit;

  function handleAddClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const ok = addClient({
      email: String(form.get("email")),
      lastJob: String(form.get("lastJob")),
      name: String(form.get("name")),
      owner: String(form.get("owner")),
      phone: String(form.get("phone")),
      status: String(form.get("status"))
    });

    if (ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <AppShell actionLabel="Add client" eyebrow="Customer records" title="Clients">
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total clients" note={`${activePlanDetails.name} package`} value={String(clients.length)} />
          <StatCard label="Client limit" note="Upgrade raises this" value={String(clientLimit)} />
          <StatCard
            label="Open quotes"
            note="Needs follow-up"
            value={String(clients.filter((client) => client.status.includes("Quote")).length)}
          />
        </section>

        <FormPanel title="Add Client">
          {atLimit ? (
            <p className="rounded-lg bg-[#fff6e8] p-3 text-sm font-bold text-[#9a552b]">
              This package has reached its client limit. Upgrade on Packages to unlock more.
            </p>
          ) : (
            <form className="grid gap-4 lg:grid-cols-3" onSubmit={handleAddClient}>
              <Field label="Business name" name="name" placeholder="Oak Street Cleaning" />
              <Field label="Contact owner" name="owner" placeholder="Jordan Smith" />
              <Field label="Phone" name="phone" placeholder="(312) 555-0199" />
              <Field label="Email" name="email" placeholder="owner@example.com" type="email" />
              <Field label="Last job" name="lastJob" placeholder="Window cleaning estimate" />
              <SelectField label="Status" name="status" options={["Active", "Quote Open", "Recurring"]} />
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white lg:col-span-3 lg:w-fit"
                type="submit"
              >
                <UserPlus size={16} />
                Save client
              </button>
            </form>
          )}
        </FormPanel>

        <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17202e]">Client Directory</h2>
              <p className="text-sm text-[#6b7686]">
                Contact details, job history, and account value in one view.
              </p>
            </div>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-3 text-sm font-bold text-white"
              type="button"
            >
              <UserPlus size={16} />
              Add client
            </button>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-2">
            {clients.map((client) => (
              <article className="rounded-lg border border-[#e5eaf1] p-4" key={client.id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#17202e]">{client.name}</h3>
                    <p className="text-sm font-semibold text-[#6b7686]">{client.owner}</p>
                  </div>
                  <StatusBadge>{client.status}</StatusBadge>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-[#4a5667] sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <Phone size={15} />
                    {client.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={15} />
                    {client.email}
                  </p>
                </div>
                <div className="mt-4 border-t border-[#edf1f6] pt-4">
                  <p className="text-sm text-[#6b7686]">Last job</p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="font-bold text-[#253348]">{client.lastJob}</p>
                    <p className="font-bold text-[#17202e]">{client.value}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
