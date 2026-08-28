export const clients = [
  {
    name: "Bright Auto Detail",
    owner: "Andre Lewis",
    phone: "(312) 555-0142",
    email: "andre@brightauto.example",
    lastJob: "Fleet wash and interior clean",
    status: "Active",
    value: "$4,820"
  },
  {
    name: "Northline Realty",
    owner: "Priya Shah",
    phone: "(312) 555-0167",
    email: "priya@northline.example",
    lastJob: "Move-out clean",
    status: "Active",
    value: "$7,340"
  },
  {
    name: "Mason Reed",
    owner: "Mason Reed",
    phone: "(312) 555-0191",
    email: "mason.reed@example.com",
    lastJob: "Gutter repair estimate",
    status: "Quote Open",
    value: "$980"
  },
  {
    name: "Hannah Pierce",
    owner: "Hannah Pierce",
    phone: "(312) 555-0188",
    email: "hannah@example.com",
    lastJob: "Monthly lawn service",
    status: "Recurring",
    value: "$1,740"
  }
];

export const jobs = [
  {
    id: "JP-1048",
    client: "Bright Auto Detail",
    service: "Fleet wash and interior clean",
    time: "Today, 9:30 AM",
    status: "Scheduled",
    crew: "Avery + Nolan",
    value: "$420"
  },
  {
    id: "JP-1049",
    client: "Mason Reed",
    service: "Gutter repair estimate",
    time: "Today, 1:00 PM",
    status: "Quote Sent",
    crew: "Dana",
    value: "$180"
  },
  {
    id: "JP-1050",
    client: "Northline Realty",
    service: "Move-out clean",
    time: "Tomorrow, 8:00 AM",
    status: "Deposit Paid",
    crew: "Avery + Kim",
    value: "$690"
  },
  {
    id: "JP-1051",
    client: "Hannah Pierce",
    service: "Monthly lawn service",
    time: "Fri, 3:00 PM",
    status: "Recurring",
    crew: "Nolan",
    value: "$145"
  }
];

export const invoices = [
  {
    number: "INV-2031",
    client: "Northline Realty",
    issued: "Aug 24, 2026",
    due: "Aug 31, 2026",
    status: "Unpaid",
    amount: "$690"
  },
  {
    number: "INV-2030",
    client: "Bright Auto Detail",
    issued: "Aug 22, 2026",
    due: "Aug 29, 2026",
    status: "Paid",
    amount: "$420"
  },
  {
    number: "INV-2029",
    client: "Hannah Pierce",
    issued: "Aug 20, 2026",
    due: "Sep 1, 2026",
    status: "Scheduled",
    amount: "$145"
  },
  {
    number: "INV-2028",
    client: "Mason Reed",
    issued: "Aug 18, 2026",
    due: "Aug 28, 2026",
    status: "Overdue",
    amount: "$180"
  }
];

export const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Validate the workflow.",
    features: ["5 clients", "5 jobs monthly", "Basic booking page"],
    limits: "Starter workspace"
  },
  {
    name: "Starter",
    price: "$19",
    description: "For solo operators.",
    features: ["50 clients", "Online payments", "Email reminders"],
    limits: "1 user"
  },
  {
    name: "Pro",
    price: "$49",
    description: "For growing businesses.",
    features: ["Unlimited jobs", "Recurring work", "SMS credits"],
    limits: "3 users",
    featured: true
  },
  {
    name: "Business",
    price: "$99",
    description: "For teams.",
    features: ["Team members", "Advanced reports", "Multiple calendars"],
    limits: "10 users"
  }
];

export const packageFeatures = [
  { feature: "Client records", free: "5", starter: "50", pro: "Unlimited", business: "Unlimited" },
  { feature: "Jobs per month", free: "5", starter: "50", pro: "Unlimited", business: "Unlimited" },
  { feature: "Online payments", free: "Basic", starter: "Yes", pro: "Yes", business: "Yes" },
  { feature: "Email reminders", free: "No", starter: "Yes", pro: "Automated", business: "Automated" },
  { feature: "SMS reminders", free: "No", starter: "Add-on", pro: "Included", business: "Higher limits" },
  { feature: "Team members", free: "No", starter: "No", pro: "3", business: "10" },
  { feature: "Recurring jobs", free: "No", starter: "No", pro: "Yes", business: "Yes" }
];
