import { defineConfig } from "vite";
import react, {
  reactCompilerPreset
} from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()]
    }),
    basicSsl()
  ],

  server: {
    host: "0.0.0.0",
    port: 5173,

    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    }
  }
});