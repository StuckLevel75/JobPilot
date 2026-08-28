import { Mail, Phone, UserPlus } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { StatCard, StatusBadge } from "../components/ui";
import { clients } from "../data";

export default function ClientsPage() {
  return (
    <AppShell actionLabel="Add client" eyebrow="Customer records" title="Clients">
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total clients" note="+8 this month" value="124" />
          <StatCard label="Recurring clients" note="42% of revenue" value="38" />
          <StatCard label="Open quotes" note="$4,120 pending" value="11" />
        </section>

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
              <article className="rounded-lg border border-[#e5eaf1] p-4" key={client.email}>
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
