"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./assessment-journey.module.css";

export function CopyResult({ summary }: { summary: string }) {
  const [status, setStatus] = useState<
    "idle" | "copying" | "copied" | "failed"
  >("idle");
  const manualCopy = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (status === "failed") {
      manualCopy.current?.focus();
      manualCopy.current?.select();
    }
  }, [status]);

  async function copy() {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className={styles.copyResult}>
      <div className={styles.actions}>
        <button type="button" onClick={copy} disabled={status === "copying"}>
          {status === "copying" ? "Copying…" : "Copy result"}
        </button>
      </div>
      <p role="status" className={styles.copyStatus}>
        {status === "copied"
          ? "Result summary copied."
          : status === "failed"
            ? "Copying isn’t available here. Select the summary below and copy it manually."
            : "Only the result summary and service suggestions are copied. Individual answers are excluded."}
      </p>
      {status === "failed" && (
        <label className={styles.manualCopy}>
          Result summary
          <textarea ref={manualCopy} readOnly value={summary} rows={8} />
        </label>
      )}
    </div>
  );
}
