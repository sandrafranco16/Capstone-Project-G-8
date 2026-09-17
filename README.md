# Capstone-Project-G-8

# BITDOT Marketing and Training Platform

This repository contains the source code for the **BITDOT Marketing and Training Platform**, developed by **Group 8** for **CITS5206 – Information Technology Capstone Project, Semester 2, 2026** at The University of Western Australia.

## Project Overview

The project aims to redesign and develop BITDOT Consulting Services Pty Ltd’s digital presence into a responsive, professional and user-focused platform that clearly communicates its AI governance, career development, training and advisory services.

The platform is designed to help different audiences quickly find relevant services, access educational content, complete an AI Readiness Assessment, submit enquiries and book consultations.

## MVP Features

- Responsive homepage with four audience pathways
- Service pages for BITDOT’s major service areas
- Blog and article publishing through Decap CMS
- YouTube video embeds within blog articles
- AI Readiness Assessment with result categories and service recommendations
- Contact and assessment lead delivery via email
- External consultation booking integration
- Testimonials
- SEO and analytics
- Responsive and accessibility-focused design
- Production deployment using Vercel

## Technology Stack

- **Next.js**
- **React**
- **TypeScript**
- **Decap CMS**
- **GitHub**
- **Vercel**
- **Jira**

## Team

| Team Member            | Role                                    |
| ---------------------- | --------------------------------------- |
| Sandra Franco Pynadath | Project Manager / Back-end Support      |
| Shravan Suresh Kumar   | Front-end Developer                     |
| Karthikeya Bezwada     | Front-end Developer                     |
| Lizhou Xiong           | UI/UX Designer                          |
| Junlong Huang          | Back-end Developer / Solution Architect |

## Development Workflow

Development work is managed through Jira and GitHub. Tasks are assigned to team members and progressed through the project workflow:

**Backlog → Ready → In Progress → Review/Testing → Done**

Development changes are completed using feature branches and submitted through pull requests for review before being merged into the project codebase.

## Project Timeline

**28 July 2026 – 6 October 2026**

The project is being developed iteratively across multiple sprints, followed by final regression testing, production deployment to Vercel, smoke testing and client acceptance.

## Client

**BITDOT Consulting Services Pty Ltd**
Client Representative: **Vibs Agrawal**

## Academic Context

This project is being completed as part of **CITS5206 – Information Technology Capstone Project, Semester 2, 2026** at The University of Western Australia.

## Local Development

Requirements: Node.js 20.9 or later and pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Formatting uses Prettier with the checked-in configuration:

```bash
pnpm format
pnpm format:check
```

The equivalent `npm run format` and `npm run format:check` scripts are also
available after dependencies are installed. Generated files, the approved static
demo, public assets and CMS-managed content are excluded in `.prettierignore`.

## Application Structure

The Next.js application lives at the repository root and uses the App Router. Shared UI is under `src/components`, feature-specific rules are under `src/features`, routes and server endpoints are under `src/app`, and Decap-managed Markdown content is under `src/content/blog`.

The approved static pages are retained in `demo/` as the source of truth for the
initial high-fidelity migration. The Next.js routes render those local assets through
an isolated compatibility layer while new MVP features continue to use the modular
`src/features` structure. See [`docs/architecture/README.md`](docs/architecture/README.md)
for module boundaries, integration points and deferred decisions.
