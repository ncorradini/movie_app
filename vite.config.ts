import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [react(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/global.scss";',
        },
      },
    },
  };
});
