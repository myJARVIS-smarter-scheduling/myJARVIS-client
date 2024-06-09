import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react()],
});

const vitestConfig = defineVitestConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      exclude: ["**/node_modules/**", "**/src/utils/microsoft/**"],
    },
    setupFiles: ["src/setupTests.ts"],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
