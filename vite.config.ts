import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (
						id.includes('node_modules/react/') ||
						id.includes('node_modules/react-dom/')
					) {
						return 'react-vendor';
					}
					if (id.includes('node_modules/@tanstack/react-query/')) {
						return 'query';
					}
					if (id.includes('node_modules/react-router-dom/')) {
						return 'router';
					}
					if (
						id.includes('node_modules/react-hook-form/') ||
						id.includes('node_modules/@hookform/') ||
						id.includes('node_modules/yup/')
					) {
						return 'form';
					}
					if (
						id.includes('node_modules/styled-components/') ||
						id.includes('node_modules/styled-media-query/')
					) {
						return 'styled';
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
