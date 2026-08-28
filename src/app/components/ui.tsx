import { Check } from "lucide-react";

export function StatCard({
  label,
  value,
  note
}: Readonly<{
  label: string;
  value: string;
  note: string;
}>) {
  return (
    <article className="rounded-lg border border-[#dfe5ee] bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#6b7686]">{label}</p>
      <p className="mt-3 text-3xl font-bold text-[#17202e]">{value}</p>
      <p className="mt-1 text-sm text-[#1f6f5f]">{note}</p>
    </article>
  );
}

export function StatusBadge({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="inline-flex rounded-md bg-[#e8f4ef] px-2.5 py-1 text-xs font-bold text-[#1f6f5f]">
      {children}
    </span>
  );
}

export function PlanCard({
  action,
  description,
  featured,
  features,
  name,
  price,
  selected
}: Readonly<{
  action?: React.ReactNode;
  description: string;
  featured?: boolean;
  features: string[];
  name: string;
  price: string;
  selected?: boolean;
}>) {
  return (
    <article
      className={`rounded-lg border p-5 shadow-sm ${
        featured || selected
          ? "border-[#1f6f5f] bg-[#f4faf8]"
          : "border-[#dfe5ee] bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-[#17202e]">{name}</h3>
          <p className="text-sm text-[#6b7686]">{description}</p>
        </div>
        <p className="text-2xl font-bold text-[#17202e]">
          {price}
          <span className="text-xs font-semibold text-[#6b7686]">/mo</span>
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {features.map((feature) => (
          <li className="flex items-center gap-2 text-sm text-[#4a5667]" key={feature}>
            <Check size={15} className="text-[#1f6f5f]" />
            {feature}
          </li>
        ))}
      </ul>
      {action ? <div className="mt-4">{action}</div> : null}
    </article>
  );
}

export function Field({
  label,
  name,
  placeholder,
  required = true,
  type = "text"
}: Readonly<{
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}>) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-[#253348]">
      {label}
      <input
        className="h-11 rounded-lg border border-[#d8e0ea] bg-white px-3 text-sm font-normal text-[#17202e] outline-none transition focus:border-[#1f6f5f] focus:ring-2 focus:ring-[#d6eee7]"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  options
}: Readonly<{
  label: string;
  name: string;
  options: string[];
}>) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-[#253348]">
      {label}
      <select
        className="h-11 rounded-lg border border-[#d8e0ea] bg-white px-3 text-sm font-normal text-[#17202e] outline-none transition focus:border-[#1f6f5f] focus:ring-2 focus:ring-[#d6eee7]"
        name={name}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function FormPanel({
  children,
  title
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <section className="rounded-lg border border-[#dfe5ee] bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-[#17202e]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
