import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function RefreshIcon({ size = 22, color = 'text.primary' }: IconProps) {
	const strokeColor = getThemeColor(color);
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C14.2091 3 16.9091 4.79086 18 7.5"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M18 1V7H12"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
