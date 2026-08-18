# BITDOT Marketing and Training Platform — Project Plan

## Project Information

**Unit:** CITS5206 – Information Technology Capstone Project  
**Semester:** Semester 2, 2026  
**Group:** Group 8  
**Project:** BITDOT Marketing and Training Platform  
**Client:** Vibs Agrawal – BITDOT Consulting Services Pty Ltd  
**Project Period:** 28 July – 6 October 2026  

---

# 1. Project Overview

This project is being developed by Group 8 for BITDOT Consulting Services Pty Ltd as part of CITS5206 – Information Technology Capstone Project.

BITDOT provides AI governance education, career development and advisory services to students, professionals, AI engineers, small businesses, executives and boards.

The project will develop a responsive marketing, educational-content and lead-generation platform that allows users to identify relevant BITDOT services, access educational content, complete an AI Readiness Assessment, submit enquiries and book consultations.

The platform is intended to provide BITDOT with a professional and maintainable digital presence while supporting lead generation, educational content publishing and consultation bookings.

---

# 2. Project Objectives

The project aims to:

- Provide four clear audience pathways for BITDOT's major customer groups.
- Present BITDOT's career, AI and automation, governance, executive and risk services.
- Provide a maintainable blog publishing workflow through Decap CMS.
- Develop an AI Readiness Assessment with relevant service recommendations.
- Capture contact and assessment enquiries through email.
- Integrate external consultation booking.
- Support basic SEO and analytics.
- Deliver a responsive and accessible user experience.
- Deploy the completed platform to Vercel.
- Provide appropriate project and handover documentation to the client.

---

# 3. Minimum Viable Product (MVP)

The agreed MVP includes the following deliverables.

## 3.1 Homepage and Audience Pathways

A responsive homepage will provide four audience pathways:

1. Launch My AI Career
2. Learn AI & Automation
3. Govern AI Responsibly
4. Prepare for AI Risks

Each pathway will direct users to relevant content and an appropriate booking or contact action.

## 3.2 Service Pages

Service pages will represent BITDOT's major service areas, including:

- Career development
- AI and automation
- AI governance
- Executive and board services
- AI risk and crisis preparedness

Each service page will clearly communicate the service outcomes and provide appropriate calls to action.

## 3.3 Blog and Content Management

The website will include a blog managed through Decap CMS.

The client will be able to create, edit and publish categorised Markdown articles without requiring code changes.

Article templates will support YouTube links and embedded videos where required.

## 3.4 AI Readiness Assessment

The website will include an AI Readiness Assessment.

Assessment questions and scoring will produce one of four result categories:

- Beginner
- Explorer
- Practitioner
- Leader

The result will recommend relevant BITDOT services.

Where consent is provided, assessment lead information will be delivered to BITDOT by email.

## 3.5 Contact and Lead Delivery

The website will provide contact and assessment lead-capture functionality.

Form fields will be validated and appropriate spam controls will be implemented.

Submissions will be delivered to BITDOT by email.

No database or CRM will be used to store leads as part of the MVP.

## 3.6 Consultation Booking

Consultation booking will be provided through Cal.com Hosted Booking.

Calls to action will direct users to the appropriate appointment type, including:

- Career Coaching
- Discovery Call
- Executive Consultation
- Training Discussion
- Workshop Enquiry

Scheduling will remain within Cal.com rather than being implemented as a custom booking system.

## 3.7 Testimonials

The website will display at least three client-approved testimonials in a consistent and accessible format.

## 3.8 SEO and Analytics

The project will implement basic SEO and analytics functionality, including:

- Page metadata
- Sitemap
- Social preview metadata
- Google Analytics
- Microsoft Clarity

Analytics will be configured to avoid collecting unnecessary personally identifiable information.

## 3.9 Deployment and Handover

The final website will be deployed to Vercel.

The project handover will include relevant repository, CMS, configuration and project documentation.

---

# 4. Out of Scope

The following are explicitly outside the MVP:

- Learning Management System
- Online courses
- Learner accounts
- Certificates
- Payments or subscriptions
- Custom video hosting or streaming
- Standalone Video Hub
- Custom booking engine
- Database or CRM for lead storage

YouTube videos will appear only within relevant blog articles.

External booking functionality will manage scheduling.

Lead information will be delivered by email rather than stored in a project database.

---

# 5. Team Roles and Responsibilities

| Team Member | Role | Key Responsibilities |
|---|---|---|
| Sandra Franco Pynadath | Project Manager / Back-end Support | Lead team and client meetings, maintain meeting minutes and project documentation, manage the project specification and project board, delegate tasks, track progress, coordinate team activities and support back-end development. |
| Shravan Suresh Kumar | Front-end Developer | Responsive components, homepage implementation, SEO implementation and browser testing. |
| Karthikeya Bezwada | Front-end Developer | Blog and article UI, service pages, interaction states, analytics events and responsive testing. |
| Lizhou Xiong | UI/UX Designer | User flows, content generation, wireframe design and accessibility review. |
| Junlong Huang | Back-end Developer / Solution Architect | Design and maintain the overall architecture, lead back-end implementation, integrate CMS, booking and email services, define data and security approaches and support deployment and technical handover. |

---

# 6. Project Timeline and Sprint Plan

The planned project period is:

**28 July – 6 October 2026**

Estimated hours represent the expected effort required for each task.

---

## Sprint 0 – Project Setup

**Dates:** 28 July – 3 August

| Task | Owner(s) | Estimated Hours |
|---|---|---:|
| Project introduction and briefing; review client requirements document | All members | 8 |
| Client kick-off meeting; clarify and resolve requirements | All members | 5 |
| Agree MVP scope, inclusions and exclusions with client | All members | 5 |
| Assign roles and responsibilities; set up GitHub, Jira board and communication channels | Sandra | 3 |
| Create initial risk register | Junlong | 2 |

**Sprint Total: 23 hours**

---

## Sprint 1 – Architecture and Design

**Dates:** 4 August – 17 August

| Task | Owner(s) | Estimated Hours |
|---|---|---:|
| Information architecture and user journeys | Lizhou | 3 |
| Wireframes for key pages and confirmation with client | Lizhou, Shravan | 6 |
| Design system and high-fidelity screens | Lizhou | 6 |
| Propose MVP architecture using Next.js modular monolith, Vercel, CMS, email and Cal.com Hosted Booking | Junlong | 4 |
| Repository and TypeScript project setup; establish GitHub branching and pull-request workflow | Shravan, Karthikeya | 6 |
| Confirm wireframes, design and architecture with client | All members | 5 |

**Sprint Total: 30 hours**

---

## Sprint 2 – Core Website Development

**Dates:** 18 August – 31 August

| Task | Owner(s) | Estimated Hours |
|---|---|---:|
| Homepage layout and four audience pathways | Shravan, Lizhou | 16 |
| Service pages: career, AI/automation, governance, executive and risk | Karthikeya, Lizhou | 18 |
| Navigation, responsive layout and shared components | Shravan, Karthikeya | 12 |
| Content model and page data structure | Junlong | 12 |
| Front-end/back-end integration for homepage and services | Junlong, Sandra | 10 |
| Draft page content and first client review | All members | 10 |

**Sprint Total: 78 hours**

---

## Sprint 3 – Content, CMS and Booking

**Dates:** 1 September – 14 September

| Task | Owner(s) | Estimated Hours |
|---|---|---:|
| Blog listing and category pages | Karthikeya | 12 |
| Individual article template with YouTube links/embeds | Shravan | 10 |
| Decap CMS integration and CMS-to-GitHub publishing workflow verification | Junlong | 16 |
| Book Consultation page with Cal.com Hosted Booking integration | Junlong, Sandra | 16 |
| Testimonials section | Lizhou, Shravan | 10 |
| Content drafts for blog and client review | All members | 10 |

**Sprint Total: 74 hours**

---

## Sprint 4 – Assessment, SEO and Testing

**Dates:** 15 September – 28 September

| Task | Owner(s) | Estimated Hours |
|---|---|---:|
| AI Readiness Assessment questions, scoring and result categories | Sandra, Junlong | 16 |
| Contact form and Assessment lead capture with email delivery | Junlong | 12 |
| SEO: metadata, sitemap, social preview and semantic structure | Shravan | 10 |
| Analytics: Google Analytics and Microsoft Clarity event tracking | Karthikeya | 8 |
| Accessibility review: keyboard, contrast, labels and alt text | Lizhou | 8 |
| Bug testing and defect fixing across all journeys | All members | 10 |

**Sprint Total: 64 hours**

---

## Final Stage – Release and Handover

**Dates:** 29 September – 6 October

| Task | Owner(s) | Estimated Hours |
|---|---|---:|
| Full regression testing on desktop, tablet and mobile | All members | 12 |
| Security and privacy checks: validation, spam controls, secrets and headers | Junlong | 8 |
| Bug fixing and release-candidate sign-off | All members | 10 |
| Deployment planning: rollback procedure and launch rehearsal | Junlong | 8 |
| Production deployment, smoke tests and client acceptance | All members | 8 |
| Handover pack: repository, CMS guide and configuration | All members | 6 |

**Final Stage Total: 52 hours**

---

# 7. Total Estimated Project Effort

**Total Estimated Effort: 321 hours**

These estimates represent the expected effort required for planned project tasks and may be refined as development progresses.

---

# 8. Project Management and Development Workflow

Project tasks are managed through the following workflow:

**Backlog → Ready → In Progress → Review/Testing → Done**

Development work follows this process:

**Feature Branch → Pull Request → Peer Review → Local/Integration Testing → Merge**

Each task is tracked through Jira and assigned to the relevant team member or members.

Development changes are completed through feature branches and pull requests linked to the relevant GitHub or Jira issue.

Pull requests are reviewed by another team member before being merged.

After final regression testing, the approved release will be deployed to Vercel for production smoke testing and client acceptance.

A task is considered complete when:

- Agreed requirements have been implemented.
- Relevant acceptance criteria have been satisfied.
- Another team member has reviewed the work where applicable.
- Relevant testing has been completed.
- Critical defects have been resolved before release.

---

# 9. Project Tools

| Tool | Purpose |
|---|---|
| GitHub | Source control, feature branches, pull requests and project documentation |
| Jira | Sprint planning, backlog management, task assignment, priorities, deadlines and workflow tracking |
| Figma | Information architecture, user flows, wireframes and UI/UX design |
| Next.js / TypeScript | Website and application development |
| Decap CMS | Blog and content management |
| Cal.com Hosted Booking | External consultation and appointment booking |
| Microsoft Teams | Team, facilitator and client communication |
| Email | Formal client communication and approvals |
| Google Analytics | Website analytics |
| Microsoft Clarity | User-interaction analytics |
| Vercel | Final production hosting and deployment |

---

# 10. Communication Plan

The team maintains regular communication with the client, facilitator and other team members.

| Touchpoint | Participants | Purpose | Record |
|---|---|---|---|
| Weekly client review | Vibs Agrawal and student team | Demonstrate progress, resolve questions and agree priorities | Meeting minutes and project-board updates |
| Fortnightly sprint review | Vibs Agrawal and student team | Review sprint deliverables, gather feedback and confirm acceptance | Meeting minutes |
| Fortnightly facilitator check-in | Student team and Karla Ivkovic | Clarify project expectations, discuss progress and raise issues requiring guidance | Meeting minutes |
| Weekly internal stand-up | Student team | Review progress, blockers and next actions | Meeting minutes and project-board updates |

Key decisions and outcomes are documented through meeting minutes and project-board updates.

The client formally approved the proposed MVP scope and requirements on **17 August 2026**.

---

# 11. Risk Management

The project risk register is reviewed regularly throughout development.

Key identified risks include:

- Content volume or accuracy delays
- Scope creep
- Late client feedback
- Form abuse and injection attacks
- Email delivery failure
- Secrets or personally identifiable information exposure
- AI Readiness Assessment scoring errors
- Deployment failure
- Accessibility and mobile defects
- Team member availability
- Dependency vulnerabilities

Each risk is assigned an owner and includes preventative actions and a planned response.

---

# 12. Skills and Resource Management

The five team members provide primary coverage across:

- Project management
- UX/UI design
- Front-end development
- Back-end development

The team shares responsibility for:

- Content
- Quality assurance
- Deployment

Identified skills gaps are addressed before the sprint that depends on the relevant capability.

These include:

- Next.js SEO and analytics
- Production performance
- Accessibility testing
- Responsive edge cases
- Secure email delivery
- Spam controls
- CMS integration
- Content and SEO verification
- Vercel production deployment
- Quality assurance and regression testing

The team uses paired work, peer review, checklists, technical prototypes and cross-member testing to address these gaps.

---

# 13. Security and Privacy

The project follows a security-focused approach that includes:

- Managed HTTPS through the final Vercel production deployment.
- Server-side validation of submitted fields.
- Length and type limits for user input.
- Anti-spam and rate controls.
- Error messages that do not expose server, provider or secret information.
- Secrets stored only in protected environment variables.
- Repository scanning and peer review to reduce accidental secret exposure.
- Data minimisation.
- No database or CRM for lead storage.
- Analytics configured to avoid unnecessary personal information.
- Restricted CMS administration.
- Least-privilege access to GitHub, Vercel, CMS and analytics.
- Dependency checks before production.
- Production rollback planning.
- Security and privacy testing before release.

The MVP deliberately avoids unnecessary attack surfaces by excluding user accounts, payments, certificates, custom video streaming and lead databases.

---

# 14. Deployment and Handover

Vercel will be used for final production deployment after development and regression testing are completed.

Before release, the team will complete:

1. Regression testing.
2. Security and privacy checks.
3. Bug fixing.
4. Release-candidate review.
5. Deployment preparation.
6. Production deployment.
7. Production smoke testing.
8. Client acceptance.

A rollback procedure will be prepared before production release.

The final handover will include:

- Source-code repository
- CMS guidance
- Relevant configuration documentation
- Project documentation

---

# 15. Project Resources

The following resources are used to manage and document the project.

## GitHub Repository

https://github.com/bkarthikey/Capstone-Project-G-8

## Meeting Minutes

Microsoft Teams / SharePoint Meeting Minutes folder:

https://uniwa.sharepoint.com/:f:/r/teams/CITS5206-InformationTechnologyCapstoneProjectSEM-22026-Group8/Shared%20Documents/Meeting%20Minutes?d=w27270451d28744649a16b5b7f5c7bbaf&csf=1&web=1&e=BHdMeh

## Additional Project Resources

The following links will be added as the relevant resources are finalised:

- GitHub Meeting Minutes folder
- Jira Project Board
- Microsoft Teams Group Workspace
- Figma project/design workspace

**Access requirement:** Project resources required for assessment will be made accessible to the group facilitator.

---

# 16. Client Approval

The proposed MVP scope and requirements were formally approved by the client, Vibs Agrawal, on **17 August 2026**.

Client communication and approval evidence is maintained within the team's project records and D1 submission documentation.
