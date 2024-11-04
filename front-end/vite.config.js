import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
        changeOrigin: true, // Add this line
        secure: false, // Set to true if your backend uses HTTPS
        ws: true, // If you are using WebSocket connections
        logLevel: 'debug', // Enable debug logging for the proxy
			},
		},
	},
});