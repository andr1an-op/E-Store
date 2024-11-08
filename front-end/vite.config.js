import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "e-store-production-6a21.up.railway.app",
			},
		},
	},
	build: { outDir: 'dist' }
});