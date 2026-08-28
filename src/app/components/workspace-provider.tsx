"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  type BusinessProfile,
  type Client,
  type Invoice,
  type Job,
  type PlanName,
  businessProfile as starterBusinessProfile,
  clients as starterClients,
  invoices as starterInvoices,
  jobs as starterJobs,
  plans
} from "../data";

type WorkspaceContextValue = {
  clients: Client[];
  jobs: Job[];
  invoices: Invoice[];
  businessProfile: BusinessProfile;
  activePlan: PlanName;
  activePlanDetails: (typeof plans)[number];
  addClient: (client: Omit<Client, "id" | "value">) => boolean;
  addJob: (job: Omit<Job, "id">) => boolean;
  addInvoice: (invoice: Omit<Invoice, "number">) => void;
  markInvoicePaid: (number: string) => void;
  saveBusinessProfile: (profile: BusinessProfile) => void;
  setActivePlan: (plan: PlanName) => void;
  resetDemo: () => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);
const storageKey = "job-pilot-workspace-v1";

type StoredWorkspace = {
  clients: Client[];
  jobs: Job[];
  invoices: Invoice[];
  businessProfile: BusinessProfile;
  activePlan: PlanName;
};

const starterWorkspace: StoredWorkspace = {
  clients: starterClients,
  jobs: starterJobs,
  invoices: starterInvoices,
  businessProfile: starterBusinessProfile,
  activePlan: "Starter"
};

function readInitialWorkspace() {
  if (typeof window === "undefined") {
    return starterWorkspace;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return starterWorkspace;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredWorkspace>;

    return {
      ...starterWorkspace,
      ...parsed,
      businessProfile: parsed.businessProfile ?? starterBusinessProfile
    };
  } catch {
    window.localStorage.removeItem(storageKey);
    return starterWorkspace;
  }
}

function canAdd(currentCount: number, limit: number | "Unlimited") {
  return limit === "Unlimited" || currentCount < limit;
}

function nextId(prefix: string, count: number) {
  return `${prefix}-${String(count + 1).padStart(4, "0")}`;
}

export function WorkspaceProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [workspace, setWorkspace] = useState<StoredWorkspace>(readInitialWorkspace);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(workspace));
  }, [workspace]);

  const activePlanDetails =
    plans.find((plan) => plan.name === workspace.activePlan) ?? plans[1];

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      ...workspace,
      activePlanDetails,
      addClient(client) {
        if (!canAdd(workspace.clients.length, activePlanDetails.clientLimit)) {
          return false;
        }

        setWorkspace((current) => ({
          ...current,
          clients: [
            {
              ...client,
              id: nextId("client", current.clients.length),
              value: "$0"
            },
            ...current.clients
          ]
        }));
        return true;
      },
      addJob(job) {
        if (!canAdd(workspace.jobs.length, activePlanDetails.jobLimit)) {
          return false;
        }

        setWorkspace((current) => ({
          ...current,
          jobs: [
            {
              ...job,
              id: `JP-${1048 + current.jobs.length}`
            },
            ...current.jobs
          ]
        }));
        return true;
      },
      addInvoice(invoice) {
        setWorkspace((current) => ({
          ...current,
          invoices: [
            {
              ...invoice,
              number: `INV-${2031 + current.invoices.length}`
            },
            ...current.invoices
          ]
        }));
      },
      markInvoicePaid(number) {
        setWorkspace((current) => ({
          ...current,
          invoices: current.invoices.map((invoice) =>
            invoice.number === number ? { ...invoice, status: "Paid" } : invoice
          )
        }));
      },
      saveBusinessProfile(profile) {
        setWorkspace((current) => ({
          ...current,
          businessProfile: profile
        }));
      },
      setActivePlan(plan) {
        setWorkspace((current) => ({
          ...current,
          activePlan: plan
        }));
      },
      resetDemo() {
        window.localStorage.removeItem(storageKey);
        setWorkspace(starterWorkspace);
      }
    }),
    [activePlanDetails, workspace]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }
  return context;
}
