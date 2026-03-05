import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function CloseIcon({ size = 24, color = 'text.primary' }: IconProps) {
	const strokeColor = getThemeColor(color);
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1.01031 1.00002L15.0103 17"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M15 1.00002L1 17"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
