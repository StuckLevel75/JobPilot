# Job Pilot Starter File

## Product Name

Job Pilot

## One-Line Pitch

Job Pilot helps small service businesses manage jobs, bookings, clients, invoices, payments, and reminders from one simple dashboard.

## Target Customers

Job Pilot is built for small service-based businesses that need to manage field work, appointments, and client communication without using five different tools.

Good first customer niches:

- Mobile car detailers
- Cleaners
- Landscapers
- Handymen
- Mobile mechanics
- Tutors
- Personal trainers
- Photographers
- Small contractors

## Core Problem

Small service businesses lose time and money because jobs, customer details, payments, and reminders are scattered across texts, notes, calendars, spreadsheets, and payment apps.

## Core Solution

Job Pilot gives each business one place to:

- Track customers
- Schedule jobs
- Send quotes and invoices
- Accept payments
- Send reminders
- Manage recurring work
- See business activity at a glance

## MVP Features

### Account And Business Setup

- User signup and login
- Business profile
- Service area
- Business logo
- Contact information

### Dashboard

- Upcoming jobs
- Recent clients
- Unpaid invoices
- Monthly revenue summary
- Quick actions for creating jobs, clients, and invoices

### Client Management

- Add, edit, and archive clients
- Store contact details
- Store notes
- View client job history

### Job Scheduling

- Create jobs
- Assign date, time, service, price, and status
- Job statuses:
  - New
  - Scheduled
  - In Progress
  - Completed
  - Cancelled

### Public Booking Page

- Customer-facing booking page
- Available services
- Contact form
- Requested appointment time
- Booking request notification

### Quotes And Invoices

- Create quotes
- Convert quote to job
- Create invoices
- Mark invoices as paid
- Stripe payment link support

### Reminders

- Email appointment reminders
- Email unpaid invoice reminders
- SMS reminders as a paid add-on later

## Pricing Packages

### Free

Best for testing the app.

- 1 user
- 5 clients
- 5 jobs per month
- Basic booking page
- Basic invoices

### Starter - $19/month

Best for solo operators.

- 1 user
- 50 clients
- 50 jobs per month
- Online payments
- Email reminders
- Custom services
- Branded booking page

### Pro - $49/month

Best for growing service businesses.

- Unlimited clients
- Unlimited jobs
- Recurring jobs
- Deposits
- Automated invoice reminders
- Revenue dashboard
- SMS reminders with included monthly credits
- Priority email support

### Business - $99/month

Best for teams.

- Everything in Pro
- Team members
- Multiple calendars
- Role-based access
- Advanced reporting
- Multiple booking pages
- Custom forms
- Higher SMS limits

## Paid Add-Ons

- Extra SMS credits
- AI job assistant
- Extra file storage
- White-label booking page
- Custom domain

## Recommended Tech Stack

- Frontend: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Database: Postgres
- ORM: Prisma
- Authentication: Clerk, Auth.js, or Supabase Auth
- Payments: Stripe
- Email: Resend
- SMS: Twilio
- Hosting: Vercel
- Database Hosting: Supabase or Neon

## Suggested GitHub Repo Structure

```text
job-pilot/
  apps/
    web/
  packages/
    db/
    ui/
    config/
  docs/
    product-plan.md
    pricing.md
    roadmap.md
  .github/
    ISSUE_TEMPLATE/
    workflows/
```

## Database Models To Start With

- User
- Business
- Subscription
- Plan
- Client
- Service
- Job
- Quote
- Invoice
- Payment
- Reminder

## Feature Gate Examples

Paid packages should unlock features through permission checks.

```ts
canUseFeature(userPlan, "unlimited_clients");
canUseFeature(userPlan, "sms_reminders");
canUseFeature(userPlan, "team_members");
canUseFeature(userPlan, "recurring_jobs");
```

## First Development Milestones

### Milestone 1: Foundation

- Create Next.js app
- Add TypeScript
- Add Tailwind CSS
- Add authentication
- Connect Postgres database
- Set up Prisma
- Create dashboard shell

### Milestone 2: Client And Job Management

- Add clients
- Add services
- Add jobs
- Add job status updates
- Add dashboard summaries

### Milestone 3: Booking And Invoices

- Create public booking page
- Create quotes
- Create invoices
- Add Stripe payment links
- Add invoice status tracking

### Milestone 4: Subscriptions And Packages

- Add Stripe subscriptions
- Add Free, Starter, Pro, and Business plans
- Add usage limits
- Add feature gates
- Add upgrade prompts

### Milestone 5: Automation

- Add email reminders
- Add recurring jobs
- Add unpaid invoice reminders
- Add SMS reminders as a paid feature

## Sustainability Rules

- Start with one niche before expanding.
- Charge for features that save time or help users collect money.
- Keep free usage limited so server costs stay controlled.
- Charge separately for expensive features like SMS, AI, and extra storage.
- Build upgrade prompts into moments where users hit real limits.
- Track churn, active users, monthly recurring revenue, and payment failures from the beginning.

## Initial GitHub Issues

- Set up Next.js project
- Add authentication
- Create Prisma schema
- Build dashboard layout
- Add client CRUD
- Add service CRUD
- Add job CRUD
- Add booking request form
- Add invoice model
- Add Stripe checkout
- Add Stripe subscription plans
- Add feature gate helper
- Add plan usage limits
- Add email reminders
- Add deployment workflow

## Tagline Ideas

- Run jobs, bookings, and payments from one dashboard.
- The simple command center for service businesses.
- Book jobs. Track clients. Get paid.
- Your service business, organized.

