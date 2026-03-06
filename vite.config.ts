import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	base: process.env.VITE_BASE_PATH || '/',
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes('node_modules')) return;

					if (
						id.includes('/react/') ||
						id.includes('/react-dom/') ||
						id.includes('/scheduler/')
					) {
						return 'react-vendor';
					}
					if (id.includes('/@tanstack/')) {
						return 'query';
					}
					if (
						id.includes('/react-router') ||
						id.includes('/@remix-run/')
					) {
						return 'router';
					}
					if (
						id.includes('/react-hook-form/') ||
						id.includes('/@hookform/') ||
						id.includes('/yup/')
					) {
						return 'form';
					}
					if (
						id.includes('/styled-components/') ||
						id.includes('/styled-media-query/')
					) {
						return 'styled';
					}
					if (id.includes('/framer-motion/')) {
						return 'motion';
					}
					if (id.includes('/react-hot-toast/')) {
						return 'toast';
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@shared': path.resolve(__dirname, './src/shared'),
		},
	},
});
