"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  CreditCard,
  PlugZap,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import { AppShell } from "../components/app-shell";
import { PlanCard, StatCard, StatusBadge } from "../components/ui";
import { type BillingCadence, plans, type PlanName } from "../data";
import { useWorkspace } from "../components/workspace-provider";

const billingStack = [
  {
    label: "Stripe Checkout",
    detail: "Takes card payments for monthly and yearly packages.",
    status: "Next connection"
  },
  {
    label: "Customer Portal",
    detail: "Lets customers update cards, cancel, or change plans.",
    status: "Next connection"
  },
  {
    label: "Billing Webhooks",
    detail: "Unlocks features after a successful payment.",
    status: "Next connection"
  },
  {
    label: "Usage Metering",
    detail: "Keeps Free and Starter limits profitable.",
    status: "Demo active"
  }
];

const revenueRules = [
  "Free plan stays limited",
  "Paid plans unlock usage",
  "SMS stays paid or capped",
  "Yearly plans collect cash sooner"
];

function dollars(value: string) {
  return Number(value.replace(/[$,]/g, ""));
}

function formatMoney(value: number) {
  return `$${value.toLocaleString()}`;
}

export default function BillingPage() {
  const {
    activePlan,
    activePlanDetails,
    checkoutIntents,
    clients,
    invoices,
    jobs,
    startCheckout
  } = useWorkspace();
  const [cadence, setCadence] = useState<BillingCadence>("Monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanName>(activePlan);

  const selectedPlanDetails =
    plans.find((plan) => plan.name === selectedPlan) ?? activePlanDetails;
  const currentMonthlyRevenue = dollars(activePlanDetails.price);
  const currentYearlyRevenue = dollars(activePlanDetails.yearlyPrice);
  const openInvoiceRevenue = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((total, invoice) => total + dollars(invoice.amount), 0);
  const selectedAmount =
    cadence === "Yearly" ? selectedPlanDetails.yearlyPrice : selectedPlanDetails.price;
  const selectedSavings =
    selectedPlanDetails.name === "Free"
      ? "$0"
      : formatMoney(dollars(selectedPlanDetails.price) * 12 - dollars(selectedPlanDetails.yearlyPrice));

  function handleCheckout(plan: PlanName) {
    setSelectedPlan(plan);
    startCheckout(plan, cadence);
  }

  return (
    <AppShell
      actionHref="/packages"
      actionLabel="Compare plans"
      eyebrow="Subscription engine"
      title="Billing"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Current plan" note={activePlanDetails.limits} value={activePlan} />
          <StatCard
            label="Monthly software revenue"
            note="One active demo account"
            value={formatMoney(currentMonthlyRevenue)}
          />
          <StatCard
            label="Yearly contract value"
            note="If paid annually"
            value={formatMoney(currentYearlyRevenue)}
          />
          <StatCard
            label="Client invoice pipeline"
            note="Customer payments tracked"
            value={formatMoney(openInvoiceRevenue)}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-[#e5eaf1] p-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#17202e]">Checkout Builder</h2>
                <p className="text-sm text-[#6b7686]">
                  Pick a package, choose a cadence, and create an upgrade event.
                </p>
              </div>
              <div className="grid grid-cols-2 rounded-lg border border-[#d8e0ea] bg-[#f8fafc] p-1">
                {(["Monthly", "Yearly"] as BillingCadence[]).map((option) => (
                  <button
                    className={`h-9 rounded-md px-3 text-sm font-bold transition ${
                      cadence === option
                        ? "bg-[#163b5c] text-white"
                        : "text-[#546274] hover:bg-white"
                    }`}
                    key={option}
                    onClick={() => setCadence(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 p-4 xl:grid-cols-2">
              {plans.map((plan) => {
                const amount = cadence === "Yearly" ? plan.yearlyPrice : plan.price;
                const selected = selectedPlan === plan.name;

                return (
                  <article
                    className={`rounded-lg border p-4 transition ${
                      selected
                        ? "border-[#1f6f5f] bg-[#f4faf8]"
                        : "border-[#dfe5ee] bg-white hover:border-[#aebdcb]"
                    }`}
                    key={plan.name}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-[#17202e]">{plan.name}</h3>
                        <p className="text-sm text-[#6b7686]">{plan.description}</p>
                      </div>
                      <p className="text-2xl font-bold text-[#17202e]">
                        {amount}
                        <span className="text-xs font-semibold text-[#6b7686]">
                          /{cadence === "Yearly" ? "yr" : "mo"}
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <StatusBadge>{plan.checkoutStatus}</StatusBadge>
                      <span className="rounded-md bg-[#eef3f8] px-2.5 py-1 text-xs font-bold text-[#546274]">
                        {plan.limits}
                      </span>
                    </div>
                    <button
                      className={`mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold transition ${
                        activePlan === plan.name
                          ? "bg-[#163b5c] text-white"
                          : "bg-[#1f6f5f] text-white hover:bg-[#19594d]"
                      }`}
                      onClick={() => handleCheckout(plan.name)}
                      type="button"
                    >
                      <WalletCards size={16} />
                      {activePlan === plan.name ? "Log current plan" : "Start checkout"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-5">
            <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#6b7686]">Selected checkout</p>
                  <h2 className="text-lg font-bold text-[#17202e]">
                    {selectedPlanDetails.name} {cadence}
                  </h2>
                </div>
                <BadgeDollarSign className="text-[#c36f3d]" size={24} />
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-[#edf1f6] pb-3">
                  <span className="font-semibold text-[#6b7686]">Charge</span>
                  <span className="text-right font-bold text-[#253348]">{selectedAmount}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-[#edf1f6] pb-3">
                  <span className="font-semibold text-[#6b7686]">Yearly savings</span>
                  <span className="text-right font-bold text-[#253348]">{selectedSavings}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-[#6b7686]">Unlocks</span>
                  <span className="text-right font-bold text-[#253348]">
                    {selectedPlanDetails.features[0]}
                  </span>
                </div>
              </div>
              <button
                className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-3 text-sm font-bold text-white transition hover:bg-[#19594d]"
                onClick={() => handleCheckout(selectedPlan)}
                type="button"
              >
                <ArrowRight size={16} />
                Save checkout event
              </button>
            </section>

            <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#17202e]">Self-Sustainability Rules</h2>
                  <p className="text-sm text-[#6b7686]">Keeps the app from giving too much away.</p>
                </div>
                <ShieldCheck className="text-[#1f6f5f]" size={23} />
              </div>
              <div className="divide-y divide-[#edf1f6]">
                {revenueRules.map((rule) => (
                  <div className="flex items-center gap-3 py-3" key={rule}>
                    <CheckCircle2 className="text-[#1f6f5f]" size={17} />
                    <span className="text-sm font-bold text-[#253348]">{rule}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#17202e]">Usage Gate</h2>
              <RefreshCw className="text-[#1f6f5f]" size={22} />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#6b7686]">Clients</span>
                <span className="font-bold text-[#253348]">
                  {clients.length} / {activePlanDetails.clientLimit}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#edf1f6]">
                <div
                  className="h-2 rounded-full bg-[#1f6f5f]"
                  style={{
                    width:
                      activePlanDetails.clientLimit === "Unlimited"
                        ? "100%"
                        : `${Math.min((clients.length / activePlanDetails.clientLimit) * 100, 100)}%`
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#6b7686]">Jobs</span>
                <span className="font-bold text-[#253348]">
                  {jobs.length} / {activePlanDetails.jobLimit}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#edf1f6]">
                <div
                  className="h-2 rounded-full bg-[#c36f3d]"
                  style={{
                    width:
                      activePlanDetails.jobLimit === "Unlimited"
                        ? "100%"
                        : `${Math.min((jobs.length / activePlanDetails.jobLimit) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#17202e]">Payment Flow</h2>
              <CreditCard className="text-[#c36f3d]" size={22} />
            </div>
            <div className="space-y-3">
              {["Choose plan", "Open Stripe Checkout", "Webhook confirms payment", "Unlock features"].map(
                (step, index) => (
                  <div className="flex items-center gap-3" key={step}>
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-[#eef3f8] text-xs font-bold text-[#163b5c]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-[#253348]">{step}</span>
                  </div>
                )
              )}
            </div>
          </article>

          <article className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#17202e]">Money Split</h2>
              <ReceiptText className="text-[#1f6f5f]" size={22} />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#6b7686]">Subscriptions</span>
                <span className="font-bold text-[#253348]">Core revenue</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#6b7686]">SMS credits</span>
                <span className="font-bold text-[#253348]">Add-on margin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#6b7686]">Client payments</span>
                <span className="font-bold text-[#253348]">Tracked invoices</span>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17202e]">Billing Activity</h2>
              <p className="text-sm text-[#6b7686]">
                Demo checkout events become real Stripe records after backend connection.
              </p>
            </div>
            <PlugZap className="text-[#c36f3d]" size={23} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5eaf1] text-sm text-[#6b7686]">
                  <th className="px-4 py-3 font-bold">Checkout</th>
                  <th className="px-4 py-3 font-bold">Plan</th>
                  <th className="px-4 py-3 font-bold">Cadence</th>
                  <th className="px-4 py-3 font-bold">Date</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 text-right font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {checkoutIntents.map((event) => (
                  <tr className="border-b border-[#eef2f6] last:border-0" key={event.id}>
                    <td className="px-4 py-4 font-bold text-[#17202e]">{event.id}</td>
                    <td className="px-4 py-4 text-[#253348]">{event.plan}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{event.cadence}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{event.createdAt}</td>
                    <td className="px-4 py-4">
                      <StatusBadge>{event.status}</StatusBadge>
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-[#17202e]">
                      {event.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {billingStack.map((item) => (
            <article className="rounded-lg border border-[#dfe5ee] bg-white p-4 shadow-sm" key={item.label}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-[#17202e]">{item.label}</h3>
                <StatusBadge>{item.status}</StatusBadge>
              </div>
              <p className="text-sm text-[#6b7686]">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {plans.slice(1, 3).map((plan) => (
            <PlanCard
              action={
                <button
                  className="h-10 w-full rounded-lg bg-[#1f6f5f] text-sm font-bold text-white transition hover:bg-[#19594d]"
                  onClick={() => handleCheckout(plan.name)}
                  type="button"
                >
                  Start {plan.name} checkout
                </button>
              }
              key={plan.name}
              selected={activePlan === plan.name}
              {...plan}
            />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
