import path from "node:path";
import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from "vite";


// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
			"@components": path.resolve(import.meta.dirname, "./src/components"),
			"@utils": path.resolve(import.meta.dirname, "./src/utils"),
			"@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
			"@context": path.resolve(import.meta.dirname, "./src/context"),
		},
	},
	plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
