import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function PlusCircleIcon({ size = 22, color = 'white' }: IconProps) {
	const strokeColor = getThemeColor(color);
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="11"
				cy="11"
				r="9"
				stroke={strokeColor}
				strokeWidth="2"
			/>
			<path
				d="M11 7V15M7 11H15"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
