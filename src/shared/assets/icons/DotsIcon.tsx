import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function DotsIcon({ size = 32, color = 'text.primary' }: IconProps) {
	const fillColor = getThemeColor(color);
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="8" cy="16" r="2" fill={fillColor} />
			<circle cx="16" cy="16" r="2" fill={fillColor} />
			<circle cx="24" cy="16" r="2" fill={fillColor} />
		</svg>
	);
}
