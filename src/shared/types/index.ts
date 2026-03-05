import type { ReactNode } from 'react';

export type ThemeColorKey =
	| 'background'
	| 'white'
	| 'border'
	| 'error'
	| 'text.primary'
	| 'text.secondary'
	| 'text.tertiary'
	| 'text.quaternary'
	| 'accent.primary'
	| 'accent.secondary';

export interface IconProps {
	size?: number;
	color?: ThemeColorKey;
}

export interface ChildrenProps {
	children: ReactNode;
}
