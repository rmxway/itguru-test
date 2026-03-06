import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function PlusIcon({ size = 24, color = 'white' }: IconProps) {
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
				d="M12 5v14M5 12h14"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
