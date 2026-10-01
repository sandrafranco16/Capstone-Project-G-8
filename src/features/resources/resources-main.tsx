"use client";

import { memo, type CSSProperties } from "react";

import { resourceClassNames as rc } from "./resource-class-names";
import Link from "next/link";
import Image from "next/image";

import { ResourceTimeline } from "./resource-timeline";

type CustomStyle = CSSProperties & Record<`--${string}`, string>;

export const ResourcesMain = memo(function ResourcesMain() {
  return (
    <>
      <section className={rc("p-hero")}>
        <span className={rc("blob blob-blue")} aria-hidden="true"></span>
        <span className={rc("blob blob-green")} aria-hidden="true"></span>
        <div className={rc("wrap")}>
          <div className={rc("inner")}>
            <p className={rc("label rv")}>{"Resource hub"}</p>
            <h1 className={rc("display rv")}>
              {"The AI rules, "}
              <em>{"dated"}</em>
              {"."}
            </h1>
            <p className={rc("lead rv")}>
              {
                "Most AI governance writing tells you the landscape is moving. Less of it tells you what has actually commenced, what is merely proposed, and which dates are already locked into legislation. This is the reference we keep for our own clients."
              }
            </p>
            <p className={rc("stamp rv")}>
              <i></i>
              {"Reviewed 30 August 2026"}
            </p>
            <div className={rc("jump rv")}>
              <a href="#clock">{"The compliance clock"}</a>
              <a href="#frameworks">{"Frameworks & standards"}</a>
              <a href="#board">{"For boards"}</a>
              <a href="#reading">{"Reading list"}</a>
            </div>
          </div>
        </div>
      </section>
      <section className={rc("section bg-mist")} id="clock">
        <div className={rc("wrap")}>
          <div className={rc("sec-head rv")}>
            <p className={rc("label c-blue")}>{"The compliance clock"}</p>
            <h2 className={rc("display big")}>
              {"What has commenced, and what is coming."}
            </h2>
            <p className={rc("lead")}>
              {
                "Australia has no AI Act. That does not mean nothing has commenced, it means the obligations arrive through privacy law, procurement rules and sector regulators instead, on dates that are already fixed."
              }
            </p>
          </div>
          <ResourceTimeline />
        </div>
      </section>
      <section className={rc("section")} id="frameworks">
        <div className={rc("wrap")}>
          <div className={rc("sec-head rv")}>
            <p className={rc("label c-plum")}>{"Frameworks & standards"}</p>
            <h2 className={rc("display big")}>
              {"Six documents worth knowing by name."}
            </h2>
            <p className={rc("lead")}>
              {
                "You do not need all of these. You need to know which one your organisation is being measured against, and to be able to say so out loud."
              }
            </p>
          </div>
          <div className={rc("fw-grid")}>
            <a
              className={rc("card fill fw rv")}
              style={{ "--f": "var(--fill-lilac)" } as CustomStyle}
              href="https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("who")}
                style={{ "--wc": "#6D5BD0" } as CustomStyle}
              >
                {"Start here · Australia"}
              </span>
              <h3>{"Guidance for AI Adoption — the AI6"}</h3>
              <p>
                {
                  "Six essential practices from the National AI Centre, developed with CSIRO's Data61. Voluntary in the same way the Essential Eight is voluntary — which is to say, increasingly the standard of care auditors, insurers and large customers expect to see evidenced."
                }
              </p>
              <span className={rc("src")}>
                {"ai.gov.au "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill fw rv")}
              style={
                {
                  "--f": "var(--fill-mint)",
                  transitionDelay: "0.06s",
                } as CustomStyle
              }
              href="https://www.aicd.com.au/innovative-technology/digital-business/artificial-intelligence/governance-of-ai.html"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("who")}
                style={{ "--wc": "#0B7A56" } as CustomStyle}
              >
                {"Boards · Australia"}
              </span>
              <h3>{"A Director's Guide to AI Governance"}</h3>
              <p>
                {
                  "The AICD board governance suite: an introduction for directors new to AI, the governance guide itself, a snapshot of the eight elements, and a separate checklist scaled for SME and not-for-profit boards."
                }
              </p>
              <span className={rc("src")}>
                {"AICD "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill fw rv")}
              style={
                {
                  "--f": "var(--fill-blush)",
                  transitionDelay: "0.12s",
                } as CustomStyle
              }
              href="https://www.iso.org/standard/42001"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("who")}
                style={{ "--wc": "#D53F17" } as CustomStyle}
              >
                {"Certifiable · International"}
              </span>
              <h3>{"ISO/IEC 42001"}</h3>
              <p>
                {
                  "The AI management system standard — the one you can actually be certified against, which makes it the usual answer when a customer or tender asks for proof rather than intent. The AI6's six practices map onto it more cleanly than the ten guardrails did."
                }
              </p>
              <span className={rc("src")}>
                {"ISO "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill fw rv")}
              style={{ "--f": "var(--fill-sand)" } as CustomStyle}
              href="https://www.nist.gov/itl/ai-risk-management-framework"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("who")}
                style={{ "--wc": "#93630A" } as CustomStyle}
              >
                {"Risk teams · United States"}
              </span>
              <h3>{"NIST AI Risk Management Framework"}</h3>
              <p>
                {
                  "Voluntary, widely adopted, and organised around four functions — govern, map, measure, manage. Useful even outside the US as a vocabulary that risk and engineering teams can share without translation."
                }
              </p>
              <span className={rc("src")}>
                {"NIST "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill fw rv")}
              style={
                {
                  "--f": "var(--fill-rose)",
                  transitionDelay: "0.06s",
                } as CustomStyle
              }
              href="https://artificialintelligenceact.eu/"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("who")}
                style={{ "--wc": "#B23A56" } as CustomStyle}
              >
                {"If you touch the EU · Europe"}
              </span>
              <h3>{"The EU AI Act"}</h3>
              <p>
                {
                  "Risk-tiered and extraterritorial: if your system's output reaches the EU meaningfully, you are potentially in scope regardless of where you sit. Deadlines have shifted; the tiers and the obligations attached to them have not."
                }
              </p>
              <span className={rc("src")}>
                {"AI Act explorer "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill fw rv")}
              style={
                {
                  "--f": "var(--fill-sky)",
                  transitionDelay: "0.12s",
                } as CustomStyle
              }
              href="https://www.oaic.gov.au/privacy/australian-privacy-principles"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("who")}
                style={{ "--wc": "#0057B8" } as CustomStyle}
              >
                {"Everyone holding personal data · Australia"}
              </span>
              <h3>{"The Australian Privacy Principles"}</h3>
              <p>
                {
                  "The quiet centre of Australian AI regulation. Privacy law already governs how AI systems handle personal information, and from December 2026 it carries the automated-decision transparency obligation as well. Regulator guidance is expected close to commencement."
                }
              </p>
              <span className={rc("src")}>
                {"OAIC "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
      <section
        className={rc("section tight")}
        id="board"
        style={{ paddingTop: "0" }}
      >
        <div className={rc("wrap")}>
          <div className={rc("band rv")}>
            <span className={rc("dots")} aria-hidden="true"></span>
            <p className={rc("label on-dark")}>{"For boards and executives"}</p>
            <h2 className={rc("display big")}>
              {"Six questions to answer before December."}
            </h2>
            <p className={rc("lead")}>
              {
                "If your organisation cannot answer these, the gap is not a compliance gap yet, it is an information gap. Fix that first."
              }
            </p>
            <div className={rc("qs")} style={{ marginTop: "32px" }}>
              <div
                className={rc("card fill qq rv")}
                style={{ "--f": "var(--fill-mint)" } as CustomStyle}
              >
                <b>{"Where is AI already being used here?"}</b>
                <p>
                  {
                    "Not where it is approved. Where it is actually running, including the tools people brought in themselves."
                  }
                </p>
              </div>
              <div
                className={rc("card fill qq rv")}
                style={
                  {
                    "--f": "var(--fill-blush)",
                    transitionDelay: "0.04s",
                  } as CustomStyle
                }
              >
                <b>{"Does anything we run make decisions about people?"}</b>
                <p>
                  {
                    "If software materially shapes an outcome for a customer, an applicant or an employee, December's transparency obligation is your problem."
                  }
                </p>
              </div>
              <div
                className={rc("card fill qq rv")}
                style={
                  {
                    "--f": "var(--fill-sand)",
                    transitionDelay: "0.08s",
                  } as CustomStyle
                }
              >
                <b>{"Who owns each use case by name?"}</b>
                <p>
                  {
                    "Accountability is the first of the six essential practices because everything else fails without it."
                  }
                </p>
              </div>
              <div
                className={rc("card fill qq rv")}
                style={
                  {
                    "--f": "var(--fill-lilac)",
                    transitionDelay: "0.12s",
                  } as CustomStyle
                }
              >
                <b>{"What would we do at 9am on a bad day?"}</b>
                <p>
                  {
                    "A model produces something defamatory, discriminatory or plainly wrong, and a journalist calls. Rehearse it before you need it."
                  }
                </p>
              </div>
              <div
                className={rc("card fill qq rv")}
                style={
                  {
                    "--f": "var(--fill-rose)",
                    transitionDelay: "0.16s",
                  } as CustomStyle
                }
              >
                <b>{"What have our vendors actually committed to?"}</b>
                <p>
                  {
                    "Supply-chain assurance is where most mid-sized organisations find their real exposure, and where contract renewal is the only lever."
                  }
                </p>
              </div>
              <div
                className={rc("card fill qq rv")}
                style={
                  {
                    "--f": "var(--fill-sky)",
                    transitionDelay: "0.20s",
                  } as CustomStyle
                }
              >
                <b>{"Can we show our working?"}</b>
                <p>
                  {
                    "Under a technology-neutral regime, the defence is evidence of reasonable care — decisions recorded at the time, not reconstructed afterwards."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={rc("section")} id="reading">
        <div className={rc("wrap")}>
          <div className={rc("sec-head rv")}>
            <p className={rc("label c-green")}>{"Reading list"}</p>
            <h2 className={rc("display big")}>
              {"Written by us, and worth reading anyway."}
            </h2>
            <p className={rc("lead")}>{"Field notes from our own practice."}</p>
          </div>
          <div className={rc("read")}>
            <article
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-lilac)",
                  transitionDelay: "0.00s",
                } as CustomStyle
              }
            >
              <span
                className={rc("accent")}
                style={{ background: "#6D5BD0" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#6D5BD0" }}></i>
                {"BITDOT · Change leadership"}
              </span>
              <h3>{"The real hurdle with AI isn't the software, it is us"}</h3>
              <p>
                {
                  "Psychological and psychosocial safety decide whether adoption succeeds. How to steady a team while the ground moves under it."
                }
              </p>
              <span className={rc("src note")}>{"Ask us for the article"}</span>
            </article>
            <article
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-blush)",
                  transitionDelay: "0.05s",
                } as CustomStyle
              }
            >
              <span
                className={rc("accent")}
                style={{ background: "#D53F17" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#D53F17" }}></i>
                {"BITDOT · AI governance"}
              </span>
              <h3>{"The imperative of AI governance for NFPs and SMBs"}</h3>
              <p>
                {
                  "Smaller organisations carry the same AI risks as large enterprises on a fraction of the resources. A practical route through."
                }
              </p>
              <span className={rc("src note")}>{"Ask us for the article"}</span>
            </article>
            <article
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-sky)",
                  transitionDelay: "0.10s",
                } as CustomStyle
              }
            >
              <span
                className={rc("accent")}
                style={{ background: "#0057B8" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#0057B8" }}></i>
                {"BITDOT · Data governance"}
              </span>
              <h3>{"Beyond data governance"}</h3>
              <p>
                {
                  "What one of the country's largest agencies taught us about turning an information framework into organisational excellence."
                }
              </p>
              <span className={rc("src note")}>{"Ask us for the article"}</span>
            </article>
            <article
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-mint)",
                  transitionDelay: "0.15s",
                } as CustomStyle
              }
            >
              <span
                className={rc("accent")}
                style={{ background: "#0B7A56" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#0B7A56" }}></i>
                {"BITDOT · Data literacy"}
              </span>
              <h3>{"Data literacy in the times of AI and data science"}</h3>
              <p>
                {
                  "Data doesn't make decisions, people do. On setting honest expectations between business users and the models informing them."
                }
              </p>
              <span className={rc("src note")}>{"Ask us for the article"}</span>
            </article>
          </div>
          <div className={rc("sec-head rv")} style={{ margin: "56px 0 36px" }}>
            <p className={rc("label c-blue")}>{"Primary sources"}</p>
            <h2 className={rc("display big")}>
              {"Straight from the people who write the rules."}
            </h2>
          </div>
          <div className={rc("read")}>
            <a
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-sand)",
                  transitionDelay: "0.00s",
                } as CustomStyle
              }
              href="https://www.ai.gov.au/"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("accent")}
                style={{ background: "#93630A" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#93630A" }}></i>
                {"National AI Centre"}
              </span>
              <h3>{"ai.gov.au"}</h3>
              <p>
                {
                  "Where the essential practices, templates and updates now live. Worth a bookmark rather than a one-time read."
                }
              </p>
              <span className={rc("src")}>
                {"Open "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-mint)",
                  transitionDelay: "0.05s",
                } as CustomStyle
              }
              href="https://www.oaic.gov.au/"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("accent")}
                style={{ background: "#0B7A56" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#0B7A56" }}></i>
                {"OAIC"}
              </span>
              <h3>{"Automated decision-making transparency"}</h3>
              <p>
                {
                  "The regulator's consultation and guidance on the December 2026 obligation. Read it before you rewrite your privacy policy, not after."
                }
              </p>
              <span className={rc("src")}>
                {"Open "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-lilac)",
                  transitionDelay: "0.10s",
                } as CustomStyle
              }
              href="https://www.aicd.com.au/innovative-technology/digital-business/artificial-intelligence/governance-of-ai.html"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("accent")}
                style={{ background: "#6D5BD0" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#6D5BD0" }}></i>
                {"AICD"}
              </span>
              <h3>{"A Director's Guide to AI Governance"}</h3>
              <p>
                {
                  "The board-facing suite: an introduction, the governance guide, the eight-element snapshot, and a checklist scaled for SME and NFP boards."
                }
              </p>
              <span className={rc("src")}>
                {"Open "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
            <a
              className={rc("card fill rd rv")}
              style={
                {
                  "--f": "var(--fill-sand)",
                  transitionDelay: "0.15s",
                } as CustomStyle
              }
              href="https://www.iso.org/standard/42001"
              target="_blank"
              rel="noopener"
            >
              <span
                className={rc("accent")}
                style={{ background: "#93630A" }}
              ></span>
              <span className={rc("meta")}>
                <i style={{ background: "#93630A" }}></i>
                {"Standards"}
              </span>
              <h3>{"ISO/IEC 42001"}</h3>
              <p>
                {
                  "The AI management system standard, the one you can actually be certified against when a tender asks for proof rather than intent."
                }
              </p>
              <span className={rc("src")}>
                {"Open "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </span>
            </a>
          </div>
          <div className={rc("disclaimer rv")}>
            <b>{"How to use this page"}</b>
            {
              " Everything here was checked against primary sources and reviewed on 30 August 2026. AI policy moves quickly, and the position may have changed since, always confirm against the linked source before acting. This page is general information, not legal advice, and it is not a substitute for advice on your own circumstances. "
            }
          </div>
        </div>
      </section>
      <section className={rc("section bg-mist")} style={{ paddingTop: "0" }}>
        <div className={rc("wrap")}>
          <div className={rc("promo rv")}>
            <div className={rc("promo-copy")}>
              <h2 className={rc("display")}>
                {"Knowing the dates is the "}
                <em>{"easy part"}</em>
                {"."}
              </h2>
              <p>
                {
                  "We run the board training, the workshops and the governance advisory that turn a timeline into something your organisation can actually evidence."
                }
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link className={rc("btn btn-coral btn-lg")} href="/booking">
                  <span>{"Book a session"}</span>
                </Link>
                <Link
                  className={rc("btn btn-on-dark btn-lg")}
                  href="/#pathways"
                >
                  {"Take the readiness assessment"}
                </Link>
              </div>
            </div>
            <div className={rc("promo-media")} aria-hidden="true">
              <Image
                src="/images/resources/156d12e0456d.svg"
                alt=""
                width={620}
                height={460}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
