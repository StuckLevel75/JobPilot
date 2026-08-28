import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Pilot",
  description:
    "Run jobs, bookings, clients, invoices, payments, and reminders from one dashboard."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
