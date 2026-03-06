import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function CaretLeftIcon({
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
				d="M12.5 15L7.5 10L12.5 5"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
