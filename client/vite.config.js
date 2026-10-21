import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = process.env.VITE_API_URL || env.VITE_API_URL;

  if (mode === "production") {
    if (!apiUrl?.trim()) {
      throw new Error(
        "VITE_API_URL is required for production builds. Set it to the public backend URL.",
      );
    }

    const parsedApiUrl = new URL(apiUrl);
    if (parsedApiUrl.protocol !== "https:") {
      throw new Error("VITE_API_URL must use HTTPS in production.");
    }
    if (["localhost", "127.0.0.1"].includes(parsedApiUrl.hostname)) {
      throw new Error("VITE_API_URL cannot point to localhost in production.");
    }
  }

  return {
    plugins: [react()],
  };
});
