import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Mirror the "@/*" path alias from tsconfig.json so components can be tested.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
