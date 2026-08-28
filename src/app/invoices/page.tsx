"use client";

import type { FormEvent } from "react";
import { CreditCard, FilePlus2 } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { Field, FormPanel, SelectField, StatCard, StatusBadge } from "../components/ui";
import { useWorkspace } from "../components/workspace-provider";

export default function InvoicesPage() {
  const { addInvoice, clients, invoices, markInvoicePaid } = useWorkspace();
  const collected = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((total, invoice) => total + Number(invoice.amount.replace(/[$,]/g, "")), 0);
  const outstanding = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((total, invoice) => total + Number(invoice.amount.replace(/[$,]/g, "")), 0);

  function handleAddInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addInvoice({
      amount: String(form.get("amount")),
      client: String(form.get("client")),
      due: String(form.get("due")),
      issued: String(form.get("issued")),
      status: String(form.get("status"))
    });
    event.currentTarget.reset();
  }

  return (
    <AppShell
      actionHref="/billing"
      actionLabel="Open billing"
      eyebrow="Quotes, billing, and payments"
      title="Invoices"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Collected" note="Paid invoices" value={`$${collected.toLocaleString()}`} />
          <StatCard label="Outstanding" note="Open invoices" value={`$${outstanding.toLocaleString()}`} />
          <StatCard label="Overdue" note="Needs reminder" value={String(invoices.filter((invoice) => invoice.status === "Overdue").length)} />
          <StatCard label="Invoices" note="Saved in browser" value={String(invoices.length)} />
        </section>

        <FormPanel title="Create Invoice">
          <form className="grid gap-4 lg:grid-cols-3" onSubmit={handleAddInvoice}>
            <SelectField label="Client" name="client" options={clients.map((client) => client.name)} />
            <Field label="Issued" name="issued" placeholder="Aug 28, 2026" />
            <Field label="Due" name="due" placeholder="Sep 4, 2026" />
            <Field label="Amount" name="amount" placeholder="$500" />
            <SelectField label="Status" name="status" options={["Unpaid", "Paid", "Scheduled", "Overdue"]} />
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white lg:col-span-3 lg:w-fit"
              type="submit"
            >
              <FilePlus2 size={16} />
              Save invoice
            </button>
          </form>
        </FormPanel>

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
                      <div className="flex items-center justify-end gap-3">
                        {invoice.amount}
                        {invoice.status !== "Paid" ? (
                          <button
                            className="rounded-md border border-[#d8e0ea] px-2 py-1 text-xs font-bold text-[#253348] hover:bg-[#f3f6fa]"
                            onClick={() => markInvoicePaid(invoice.number)}
                            type="button"
                          >
                            Mark paid
                          </button>
                        ) : null}
                      </div>
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
