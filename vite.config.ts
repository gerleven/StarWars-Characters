import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // dev specific config
  plugins: [react()],
  base: "./",
});
