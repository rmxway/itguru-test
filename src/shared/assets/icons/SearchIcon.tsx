import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function SearchIcon({
	size = 24,
	color = 'text.placeholder',
}: IconProps) {
	const strokeColor = getThemeColor(color);
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="11"
				cy="11"
				r="7"
				stroke={strokeColor}
				strokeWidth="2"
			/>
			<path
				d="M21 21L16.5 16.5"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
