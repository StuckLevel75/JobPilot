"use client";

import type { FormEvent } from "react";
import { CheckCircle2, PlugZap, Save, ShieldCheck } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { Field, FormPanel, PlanCard, SelectField, StatCard, StatusBadge } from "../components/ui";
import { plans } from "../data";
import { useWorkspace } from "../components/workspace-provider";

const integrations = [
  {
    name: "Authentication",
    purpose: "Customer accounts and protected workspaces",
    status: "Ready to connect"
  },
  {
    name: "Stripe Billing",
    purpose: "Subscriptions, plan checks, and paid upgrades",
    status: "Ready to connect"
  },
  {
    name: "Database",
    purpose: "Cloud storage for clients, jobs, invoices, and users",
    status: "Ready to connect"
  },
  {
    name: "Email and SMS",
    purpose: "Appointment reminders, quote follow-ups, and invoice nudges",
    status: "Ready to connect"
  }
];

export default function SettingsPage() {
  const {
    activePlan,
    activePlanDetails,
    businessProfile,
    saveBusinessProfile,
    setActivePlan
  } = useWorkspace();

  function handleSaveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    saveBusinessProfile({
      businessName: String(form.get("businessName")),
      defaultService: String(form.get("defaultService")),
      depositRequired: String(form.get("depositRequired")),
      email: String(form.get("email")),
      ownerName: String(form.get("ownerName")),
      phone: String(form.get("phone")),
      serviceArea: String(form.get("serviceArea"))
    });
  }

  return (
    <AppShell
      actionHref="/signin"
      actionLabel="Demo access"
      eyebrow="Business controls"
      title="Settings"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Business" note={businessProfile.serviceArea} value={businessProfile.businessName} />
          <StatCard label="Current package" note={activePlanDetails.limits} value={activePlan} />
          <StatCard label="Users included" note="Package limit" value={String(activePlanDetails.users)} />
          <StatCard label="SMS" note="Messaging access" value={activePlanDetails.sms} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <FormPanel title="Business Profile">
            <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSaveSettings}>
              <Field
                defaultValue={businessProfile.businessName}
                label="Business name"
                name="businessName"
                placeholder="Your service business"
              />
              <Field
                defaultValue={businessProfile.ownerName}
                label="Owner"
                name="ownerName"
                placeholder="Your name"
              />
              <Field
                defaultValue={businessProfile.serviceArea}
                label="Service area"
                name="serviceArea"
                placeholder="Chicago, IL"
              />
              <Field
                defaultValue={businessProfile.defaultService}
                label="Default service"
                name="defaultService"
                placeholder="House cleaning"
              />
              <Field
                defaultValue={businessProfile.phone}
                label="Phone"
                name="phone"
                placeholder="(312) 555-0100"
                type="tel"
              />
              <Field
                defaultValue={businessProfile.email}
                label="Email"
                name="email"
                placeholder="hello@example.com"
                type="email"
              />
              <SelectField
                defaultValue={businessProfile.depositRequired}
                label="Deposits"
                name="depositRequired"
                options={["Yes", "No", "Only for jobs over $500"]}
              />
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white transition hover:bg-[#19594d] lg:self-end"
                type="submit"
              >
                <Save size={16} />
                Save changes
              </button>
            </form>
          </FormPanel>

          <aside className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#17202e]">Workspace Health</h2>
                <p className="text-sm text-[#6b7686]">What is ready for a paid build.</p>
              </div>
              <ShieldCheck className="text-[#1f6f5f]" size={23} />
            </div>
            <div className="divide-y divide-[#edf1f6]">
              {["Profile saved", "Packages mapped", "Feature gates active"].map((item) => (
                <div className="flex items-center gap-3 py-3" key={item}>
                  <CheckCircle2 className="text-[#1f6f5f]" size={17} />
                  <span className="text-sm font-bold text-[#253348]">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard
              action={
                <button
                  className={`h-10 w-full rounded-lg text-sm font-bold transition ${
                    activePlan === plan.name
                      ? "bg-[#163b5c] text-white"
                      : "border border-[#d8e0ea] text-[#253348] hover:bg-[#f3f6fa]"
                  }`}
                  onClick={() => setActivePlan(plan.name)}
                  type="button"
                >
                  {activePlan === plan.name ? "Current plan" : "Select plan"}
                </button>
              }
              key={plan.name}
              selected={activePlan === plan.name}
              {...plan}
            />
          ))}
        </section>

        <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17202e]">Launch Integrations</h2>
              <p className="text-sm text-[#6b7686]">
                These connections make the app self-sustainable.
              </p>
            </div>
            <PlugZap className="text-[#c36f3d]" size={23} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5eaf1] text-sm text-[#6b7686]">
                  <th className="px-4 py-3 font-bold">Connection</th>
                  <th className="px-4 py-3 font-bold">Purpose</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {integrations.map((integration) => (
                  <tr className="border-b border-[#eef2f6] last:border-0" key={integration.name}>
                    <td className="px-4 py-4 font-bold text-[#17202e]">{integration.name}</td>
                    <td className="px-4 py-4 text-[#4a5667]">{integration.purpose}</td>
                    <td className="px-4 py-4">
                      <StatusBadge>{integration.status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
