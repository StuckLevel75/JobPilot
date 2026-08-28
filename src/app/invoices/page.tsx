import { CreditCard, FilePlus2 } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { StatCard, StatusBadge } from "../components/ui";
import { invoices } from "../data";

export default function InvoicesPage() {
  return (
    <AppShell actionLabel="New invoice" eyebrow="Quotes, billing, and payments" title="Invoices">
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Collected" note="August paid" value="$14,920" />
          <StatCard label="Outstanding" note="6 invoices" value="$2,840" />
          <StatCard label="Overdue" note="Needs reminder" value="$180" />
          <StatCard label="Deposits" note="This week" value="$1,320" />
        </section>

        <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17202e]">Invoice List</h2>
              <p className="text-sm text-[#6b7686]">
                Send bills, collect payments, and trigger reminders.
              </p>
            </div>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-3 text-sm font-bold text-white"
              type="button"
            >
              <FilePlus2 size={16} />
              Create invoice
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5eaf1] text-sm text-[#6b7686]">
                  <th className="px-4 py-3 font-bold">Invoice</th>
                  <th className="px-4 py-3 font-bold">Client</th>
                  <th className="px-4 py-3 font-bold">Issued</th>
                  <th className="px-4 py-3 font-bold">Due</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 text-right font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr className="border-b border-[#eef2f6] last:border-0" key={invoice.number}>
                    <td className="px-4 py-4 font-bold text-[#17202e]">{invoice.number}</td>
                    <td className="px-4 py-4 text-[#253348]">{invoice.client}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{invoice.issued}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{invoice.due}</td>
                    <td className="px-4 py-4">
                      <StatusBadge>{invoice.status}</StatusBadge>
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-[#17202e]">
                      {invoice.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CreditCard className="text-[#1f6f5f]" size={22} />
            <div>
              <h2 className="text-lg font-bold">Stripe Ready</h2>
              <p className="text-sm text-[#6b7686]">
                The billing surface is shaped for Stripe links, deposits, and subscriptions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
