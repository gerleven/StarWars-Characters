import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  
  return {
    // dev specific config
    plugins: [react()],
    base: "./"
  };
});