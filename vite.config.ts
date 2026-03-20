import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { API_REMOTE_URL } from './src/shared/constants';

export default defineConfig({
	base: process.env.VITE_BASE_PATH || '/',
	plugins: [react()],
	server: {
		host: true,
		proxy: {
			'/api': {
				target: API_REMOTE_URL,
				changeOrigin: true,
				rewrite: (p) => p.replace(/^\/api/, '/'),
				cookieDomainRewrite: '',
				configure: (proxy) => {
					proxy.on('proxyRes', (proxyRes) => {
						const cookies = proxyRes.headers['set-cookie'];
						if (cookies) {
							proxyRes.headers['set-cookie'] = cookies.map(
								(cookie: string) =>
									cookie
										.replace(/;\s*Secure/gi, '')
										.replace(/;\s*Domain=[^;]+/gi, '')
										.replace(/;\s*;+/g, ';')
										.replace(/;\s*$/, ''),
							);
						}
					});
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
