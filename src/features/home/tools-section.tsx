import Image from "next/image";
import type { CSSProperties } from "react";

import { toolsSection } from "./tools-resources.content";

import styles from "./tools-resources.module.css";

/** Homepage "tools we train your team on" preview; keeps the prototype's #tools anchor. */
export function ToolsSection() {
  const { tools, topics } = toolsSection;

  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className={styles.section}
    >
      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.label}>{toolsSection.label}</p>
          <h2 id="tools-heading" className={styles.title}>
            {toolsSection.title}
          </h2>
          <p className={styles.lead}>{toolsSection.lead}</p>
        </div>

        <ul
          className={styles.rail}
          style={{ "--columns": tools.length } as CSSProperties}
          aria-label="AI tools covered in workshops"
          tabIndex={0}
        >
          {tools.map((tool) => (
            <li key={tool.id}>
              <div className={styles.tool}>
                <span className={styles.logo}>
                  <Image
                    src={tool.logo.src}
                    alt={tool.name}
                    width={tool.logo.width}
                    height={tool.logo.height}
                  />
                </span>
                <p>{tool.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.topics}>
          <p id="tools-topics" className={styles.topicsCaption}>
            {toolsSection.topicsCaption}
          </p>
          <ul className={styles.chips} aria-labelledby="tools-topics">
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
