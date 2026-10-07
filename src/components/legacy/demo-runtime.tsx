"use client";

import { useEffect, useRef } from "react";

import { toReplayableScript } from "./replayable-script";

type DemoRuntimeProps = {
  scripts: string[];
};

/** Runs the interaction scripts that shipped with the approved static demo. */
export function DemoRuntime({ scripts }: DemoRuntimeProps) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const nodes = scripts.map((source) => {
      const script = document.createElement("script");
      script.dataset.bitdotDemoRuntime = "true";
      script.text = toReplayableScript(source);
      document.body.appendChild(script);
      return script;
    });

    return () => nodes.forEach((node) => node.remove());
  }, [scripts]);

  return null;
}
