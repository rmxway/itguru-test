import type { ThemeColorKey } from '@shared/types';

export const breakpoints = {
	xs: 480,
	sm: 768,
	md: 1024,
	lg: 1280,
	xl: 1536,
} as const;

export const theme = {
	colors: {
		background: '#F9F9F9',
		pageBackground: '#F6F6F6',
		white: '#FFFFFF',
		text: {
			primary: '#232323',
			secondary: '#c4c4c4',
			tertiary: '#9C9C9C',
			quaternary: '#6C6C6C',
			icon: '#CACACA',
			black: '#222222',
			placeholder: '#999999',
			muted: '#969B9F',
			tableHeader: '#B2B3B9',
		},
		accent: {
			primary: '#242EDB',
			secondary: '#367AFF',
			pagination: '#797FEA',
		},
		border: '#EDEDED',
		borderLight: '#E2E2E2',
		borderGray: '#ECECEB',
		error: '#FF3B30',
		ratingLow: '#F11010',
		inputBg: '#F3F3F3',
	},
	fonts: {
		primary:
			"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	},
	fontSizes: {
		xs: '14px',
		sm: '16px',
		md: '18px',
		lg: '24px',
		xl: '40px',
	},
	fontWeights: {
		regular: 400,
		medium: 500,
		semibold: 600,
	},
	radii: {
		sm: '12px',
		md: '34px',
		lg: '40px',
		full: '100px',
	},
	shadows: {
		card: '0px 24px 32px 0px rgba(0,0,0,0.04)',
		button: '0px 8px 8px 0px rgba(54,122,255,0.03)',
		buttonInset: 'inset 0px -2px 0px 1px rgba(0,0,0,0.08)',
		logo: '0px 0px 0px 2px white, 0px 12px 8px 0px rgba(0,0,0,0.03)',
		pagination: '0px 20px 50px 0px rgba(0,0,0,0.12)',
	},
} as const;

export type Theme = typeof theme;

const colorMap: Record<string, string> = {
	background: theme.colors.background,
	white: theme.colors.white,
	border: theme.colors.border,
	error: theme.colors.error,
	'text.primary': theme.colors.text.primary,
	'text.secondary': theme.colors.text.secondary,
	'text.tertiary': theme.colors.text.tertiary,
	'text.quaternary': theme.colors.text.quaternary,
	'text.icon': theme.colors.text.icon,
	'text.placeholder': theme.colors.text.placeholder,
	'text.tableHeader': theme.colors.text.tableHeader,
	'accent.primary': theme.colors.accent.primary,
	'accent.secondary': theme.colors.accent.secondary,
};

export function getThemeColor(key: ThemeColorKey): string {
	return colorMap[key] ?? theme.colors.text.primary;
}
