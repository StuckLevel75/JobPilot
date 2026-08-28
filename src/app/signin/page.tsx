import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { AppShell } from "../components/app-shell";

const accessItems = [
  "Email and password screen",
  "Demo workspace access",
  "Ready for paid account gating"
];

const securityItems = [
  { label: "Authentication", status: "Frontend demo" },
  { label: "Customer account", status: "Prepared" },
  { label: "Subscription check", status: "Prepared" }
];

export default function SignInPage() {
  return (
    <AppShell
      actionHref="/onboarding"
      actionLabel="Finish setup"
      eyebrow="Account access"
      title="Sign In"
    >
      <div className="mx-auto max-w-7xl px-5 py-6">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#e8f4ef] text-[#1f6f5f]">
                <LockKeyhole size={22} />
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#17202e]">Demo Access</h2>
                <p className="text-sm text-[#6b7686]">
                  Your public demo is ready for a real sign-in provider next.
                </p>
              </div>
            </div>

            <form className="grid max-w-xl gap-4">
              <label className="grid gap-1.5 text-sm font-bold text-[#253348]">
                Email
                <input
                  className="h-11 rounded-lg border border-[#d8e0ea] bg-white px-3 text-sm font-normal text-[#17202e] outline-none transition focus:border-[#1f6f5f] focus:ring-2 focus:ring-[#d6eee7]"
                  defaultValue="owner@jobpilot.example"
                  type="email"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold text-[#253348]">
                Password
                <input
                  className="h-11 rounded-lg border border-[#d8e0ea] bg-white px-3 text-sm font-normal text-[#17202e] outline-none transition focus:border-[#1f6f5f] focus:ring-2 focus:ring-[#d6eee7]"
                  defaultValue="jobpilot-demo"
                  type="password"
                />
              </label>
              <Link
                className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white transition hover:bg-[#19594d]"
                href="/onboarding"
              >
                Continue demo
                <ArrowRight size={16} />
              </Link>
            </form>

            <div className="mt-8 grid gap-3 border-t border-[#edf1f6] pt-5 sm:grid-cols-3">
              {accessItems.map((item) => (
                <p className="flex items-center gap-2 text-sm font-bold text-[#253348]" key={item}>
                  <CheckCircle2 className="text-[#1f6f5f]" size={16} />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#17202e]">Access Status</h2>
                <p className="text-sm text-[#6b7686]">What this demo has prepared.</p>
              </div>
              <ShieldCheck className="text-[#c36f3d]" size={23} />
            </div>
            <div className="divide-y divide-[#edf1f6]">
              {securityItems.map((item) => (
                <div className="flex items-center justify-between gap-4 py-3" key={item.label}>
                  <span className="text-sm font-bold text-[#253348]">{item.label}</span>
                  <span className="rounded-md bg-[#e8f4ef] px-2.5 py-1 text-xs font-bold text-[#1f6f5f]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <Link
              className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#d8e0ea] px-3 text-sm font-bold text-[#253348] transition hover:bg-[#f3f6fa]"
              href="/settings"
            >
              <Mail size={16} />
              Review settings
            </Link>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}
