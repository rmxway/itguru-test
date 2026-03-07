import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { API_REMOTE_URL } from './src/shared/constants';

/**
 * Конфигурация Vite для React-приложения
 * @see https://vite.dev/config/
 */
export default defineConfig({
	// Базовый путь приложения (для деплоя в поддиректорию)
	base: process.env.VITE_BASE_PATH || '/',
	plugins: [react()],
	server: {
		// Слушать на всех сетевых интерфейсах (доступ с других устройств в сети)
		host: true,
		proxy: {
			// Проксирование /api/* на удалённый бэкенд (обход CORS в dev)
			'/api': {
				target: API_REMOTE_URL,
				changeOrigin: true,
				// /api/users -> /users
				rewrite: (path) => path.replace(/^\/api/, '/'),
				cookieDomainRewrite: '',
				configure: (proxy) => {
					// Убираем Secure и Domain из cookies для работы в dev (HTTP)
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
	build: {
		rollupOptions: {
			output: {
				// Разделение vendor-бандлов для лучшего кэширования
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
