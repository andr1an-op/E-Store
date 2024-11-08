import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
	  proxy: {
		"/api": {
		  target: import.meta.env.VITE_API_BASE_URL, // mengarah ke backend Railway
		  changeOrigin: true,
		  secure: true,
		},
	  },
	},
	build: { outDir: 'dist' }
  });
  