import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function CaretRightIcon({
	size = 20,
	color = 'text.primary',
}: IconProps) {
	const strokeColor = getThemeColor(color);
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.5 5L12.5 10L7.5 15"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
