import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

import { describe, expect, it } from "vitest";

import { toReplayableScript } from "./replayable-script";

describe("toReplayableScript", () => {
  it("turns top-level const and let declarations into var", () => {
    expect(
      toReplayableScript("const RM = true;\nlet tt;function toast(){}"),
    ).toBe("var RM = true;\nvar tt;function toast(){}");
  });

  it("leaves nested declarations and identifiers alone", () => {
    const source =
      "function f(){\n  const a=1;\n  let b=2;\n}\nconst letter='x';";
    expect(toReplayableScript(source)).toBe(
      "function f(){\n  const a=1;\n  let b=2;\n}\nvar letter='x';",
    );
  });

  it("can run the same script twice in one global scope", () => {
    const script = toReplayableScript("const RM = 1;\nlet count = RM + 1;");
    const context = {};
    runInNewContext(script, context);
    expect(() => runInNewContext(script, context)).not.toThrow();
  });

  it("leaves no top-level const or let in the homepage prototype", () => {
    const html = readFileSync("demo/index.html", "utf8");
    const scripts = [
      ...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi),
    ].map((match) => toReplayableScript(match[1]));
    for (const script of scripts) {
      expect(script).not.toMatch(/^(?:const|let)\s/m);
    }
  });
});
