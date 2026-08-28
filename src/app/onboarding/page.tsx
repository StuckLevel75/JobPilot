"use client";

import type { FormEvent } from "react";
import { ArrowRight, Building2, CheckCircle2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppShell } from "../components/app-shell";
import { Field, FormPanel, SelectField, StatCard } from "../components/ui";
import { useWorkspace } from "../components/workspace-provider";

const setupSteps = [
  "Business profile",
  "Package selected",
  "Workspace seeded",
  "Settings ready"
];

export default function OnboardingPage() {
  const { activePlan, businessProfile, clients, jobs, saveBusinessProfile } = useWorkspace();
  const router = useRouter();

  function handleSetup(event: FormEvent<HTMLFormElement>) {
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

    router.push("/settings");
  }

  return (
    <AppShell
      actionHref="/settings"
      actionLabel="Open settings"
      eyebrow="Workspace setup"
      title="Onboarding"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Selected package" note="Can change anytime" value={activePlan} />
          <StatCard label="Saved clients" note="Demo workspace" value={String(clients.length)} />
          <StatCard label="Tracked jobs" note="Demo workspace" value={String(jobs.length)} />
          <StatCard label="Setup steps" note="Ready to finish" value="4" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <FormPanel title="Business Setup">
            <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSetup}>
              <Field
                defaultValue={businessProfile.businessName}
                label="Business name"
                name="businessName"
                placeholder="Your service business"
              />
              <Field
                defaultValue={businessProfile.ownerName}
                label="Owner name"
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
                label="Business phone"
                name="phone"
                placeholder="(312) 555-0100"
                type="tel"
              />
              <Field
                defaultValue={businessProfile.email}
                label="Business email"
                name="email"
                placeholder="hello@example.com"
                type="email"
              />
              <SelectField
                defaultValue={businessProfile.depositRequired}
                label="Require deposits"
                name="depositRequired"
                options={["Yes", "No", "Only for jobs over $500"]}
              />
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white transition hover:bg-[#19594d] lg:self-end"
                type="submit"
              >
                <Save size={16} />
                Save setup
                <ArrowRight size={16} />
              </button>
            </form>
          </FormPanel>

          <aside className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#17202e]">Launch Checklist</h2>
                <p className="text-sm text-[#6b7686]">The foundation for paid accounts.</p>
              </div>
              <Building2 className="text-[#c36f3d]" size={23} />
            </div>
            <div className="divide-y divide-[#edf1f6]">
              {setupSteps.map((step) => (
                <div className="flex items-center gap-3 py-3" key={step}>
                  <CheckCircle2 className="text-[#1f6f5f]" size={17} />
                  <span className="text-sm font-bold text-[#253348]">{step}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}
