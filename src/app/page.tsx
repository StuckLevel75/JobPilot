import {
  ArrowRight,
  BadgeDollarSign,
  Bell,
  CalendarDays,
  Check,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Mail,
  MapPin,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users
} from "lucide-react";

const stats = [
  { label: "Jobs this week", value: "18", note: "+4 from last week" },
  { label: "Unpaid invoices", value: "$2,840", note: "6 waiting" },
  { label: "Booked revenue", value: "$9,620", note: "August pipeline" },
  { label: "Reminder success", value: "94%", note: "Email reminders" }
];

const jobs = [
  {
    client: "Bright Auto Detail",
    service: "Fleet wash and interior clean",
    time: "Today, 9:30 AM",
    status: "Scheduled",
    value: "$420"
  },
  {
    client: "Mason Reed",
    service: "Gutter repair estimate",
    time: "Today, 1:00 PM",
    status: "Quote Sent",
    value: "$180"
  },
  {
    client: "Northline Realty",
    service: "Move-out clean",
    time: "Tomorrow, 8:00 AM",
    status: "Deposit Paid",
    value: "$690"
  },
  {
    client: "Hannah Pierce",
    service: "Monthly lawn service",
    time: "Fri, 3:00 PM",
    status: "Recurring",
    value: "$145"
  }
];

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Validate the workflow.",
    features: ["5 clients", "5 jobs monthly", "Basic booking page"]
  },
  {
    name: "Starter",
    price: "$19",
    description: "For solo operators.",
    features: ["50 clients", "Online payments", "Email reminders"]
  },
  {
    name: "Pro",
    price: "$49",
    description: "For growing businesses.",
    features: ["Unlimited jobs", "Recurring work", "SMS credits"],
    featured: true
  },
  {
    name: "Business",
    price: "$99",
    description: "For teams.",
    features: ["Team members", "Advanced reports", "Multiple calendars"]
  }
];

const quickActions = [
  { label: "New job", icon: Plus },
  { label: "Add client", icon: Users },
  { label: "Send invoice", icon: CreditCard },
  { label: "Create quote", icon: ClipboardList }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#17202e]">
      <aside className="fixed left-0 top-0 hidden h-screen w-20 border-r border-[#dfe5ee] bg-white xl:block">
        <div className="flex h-full flex-col items-center gap-6 py-5">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#163b5c] text-sm font-bold text-white">
            JP
          </div>
          <nav className="flex flex-1 flex-col gap-3" aria-label="Primary">
            {[LayoutDashboard, CalendarDays, Users, BadgeDollarSign, Bell, Settings].map(
              (Icon, index) => (
                <button
                  aria-label={`Navigation ${index + 1}`}
                  className="grid h-11 w-11 place-items-center rounded-lg text-[#546274] transition hover:bg-[#eef3f8] hover:text-[#163b5c]"
                  key={Icon.name}
                  type="button"
                >
                  <Icon size={20} />
                </button>
              )
            )}
          </nav>
        </div>
      </aside>

      <section className="xl:pl-20">
        <header className="border-b border-[#dfe5ee] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#163b5c] text-sm font-bold text-white xl:hidden">
                JP
              </div>
              <div>
                <p className="text-sm font-semibold text-[#6b7686]">
                  Service business command center
                </p>
                <h1 className="text-2xl font-bold tracking-normal text-[#17202e]">
                  Job Pilot
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#d8e0ea] bg-[#f8fafc] px-3 text-[#6b7686] sm:w-72">
                <Search size={18} />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#17202e] outline-none"
                  placeholder="Search clients or jobs"
                  type="search"
                />
              </label>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6f5f] px-4 text-sm font-bold text-white transition hover:bg-[#19594d]" type="button">
                <Plus size={18} />
                New job
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  className="rounded-lg border border-[#dfe5ee] bg-white p-4 shadow-sm"
                  key={stat.label}
                >
                  <p className="text-sm font-semibold text-[#6b7686]">{stat.label}</p>
                  <p className="mt-3 text-3xl font-bold text-[#17202e]">{stat.value}</p>
                  <p className="mt-1 text-sm text-[#1f6f5f]">{stat.note}</p>
                </article>
              ))}
            </section>

            <section className="rounded-lg border border-[#dfe5ee] bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-[#e5eaf1] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#17202e]">Upcoming Jobs</h2>
                  <p className="text-sm text-[#6b7686]">
                    Keep scheduling, status, and money in one working view.
                  </p>
                </div>
                <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#d8e0ea] px-3 text-sm font-bold text-[#253348] transition hover:bg-[#f3f6fa]" type="button">
                  View calendar
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#e5eaf1] text-sm text-[#6b7686]">
                      <th className="px-4 py-3 font-bold">Client</th>
                      <th className="px-4 py-3 font-bold">Service</th>
                      <th className="px-4 py-3 font-bold">Time</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                      <th className="px-4 py-3 text-right font-bold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr className="border-b border-[#eef2f6] last:border-0" key={job.client}>
                        <td className="px-4 py-4 font-bold text-[#17202e]">{job.client}</td>
                        <td className="px-4 py-4 text-[#4a5667]">{job.service}</td>
                        <td className="px-4 py-4 text-[#4a5667]">{job.time}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-md bg-[#e8f4ef] px-2.5 py-1 text-xs font-bold text-[#1f6f5f]">
                            {job.status}
                          </span>
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

            <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">Booking Page</h2>
                    <p className="text-sm text-[#6b7686]">Public intake for new jobs.</p>
                  </div>
                  <MapPin className="text-[#c36f3d]" size={22} />
                </div>
                <div className="space-y-3">
                  {["Choose a service", "Pick a preferred time", "Pay a deposit"].map(
                    (item) => (
                      <div className="flex items-center gap-3" key={item}>
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-[#f5eadf] text-[#9a552b]">
                          <Check size={16} />
                        </span>
                        <span className="text-sm font-semibold text-[#253348]">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">Automation Queue</h2>
                    <p className="text-sm text-[#6b7686]">Reminders ready to send.</p>
                  </div>
                  <Mail className="text-[#1f6f5f]" size={22} />
                </div>
                <div className="space-y-3">
                  {["3 appointment reminders", "2 unpaid invoice nudges", "1 quote follow-up"].map(
                    (item) => (
                      <div
                        className="flex items-center justify-between rounded-lg border border-[#edf1f6] px-3 py-3"
                        key={item}
                      >
                        <span className="text-sm font-semibold text-[#253348]">{item}</span>
                        <Bell size={16} className="text-[#6b7686]" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Quick Actions</h2>
                <Sparkles className="text-[#c36f3d]" size={20} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map(({ label, icon: Icon }) => (
                  <button
                    className="flex h-24 flex-col items-start justify-between rounded-lg border border-[#dfe5ee] p-3 text-left text-sm font-bold text-[#253348] transition hover:border-[#1f6f5f] hover:bg-[#f4faf8]"
                    key={label}
                    type="button"
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold">Packages</h2>
              <p className="mt-1 text-sm text-[#6b7686]">
                Feature gates are planned around real business limits.
              </p>
              <div className="mt-4 space-y-3">
                {plans.map((plan) => (
                  <div
                    className={`rounded-lg border p-4 ${
                      plan.featured
                        ? "border-[#1f6f5f] bg-[#f4faf8]"
                        : "border-[#e5eaf1] bg-white"
                    }`}
                    key={plan.name}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-[#17202e]">{plan.name}</h3>
                        <p className="text-sm text-[#6b7686]">{plan.description}</p>
                      </div>
                      <p className="text-lg font-bold text-[#17202e]">
                        {plan.price}
                        <span className="text-xs font-semibold text-[#6b7686]">/mo</span>
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {plan.features.map((feature) => (
                        <li className="flex items-center gap-2 text-sm text-[#4a5667]" key={feature}>
                          <Check size={15} className="text-[#1f6f5f]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
