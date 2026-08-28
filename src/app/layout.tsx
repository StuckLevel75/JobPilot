import type { Metadata } from "next";
import { WorkspaceProvider } from "./components/workspace-provider";
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
      <body>
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </body>
    </html>
  );
}
