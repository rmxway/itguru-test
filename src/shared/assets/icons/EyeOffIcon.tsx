import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export function EyeOffIcon({ size = 24, color = 'text.primary' }: IconProps) {
	const fillColor = getThemeColor(color);
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.27 13.86 23 12C21.27 8.11 17 5 12 5C10.6 5 9.26 5.32 8 5.89L10.17 8.06C10.74 7.87 11.35 7.75 12 7.75V7ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10.02 1 12C2.73 15.89 7 19 12 19C13.55 19 15.03 18.63 16.38 17.96L16.8 18.4L19.73 21.33L21 20.06L3.27 2.27L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.02 12C15.02 10.35 13.67 9 12.02 9L11.84 9.02Z"
				fill={fillColor}
			/>
		</svg>
	);
}
