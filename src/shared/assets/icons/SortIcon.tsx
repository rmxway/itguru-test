import styled from 'styled-components';
import { getThemeColor } from '@app/styles/theme';
import type { IconProps } from '@shared/types';

export interface SortIconProps extends IconProps {
	direction?: 'asc' | 'desc';
}

const StyledSvg = styled.svg<{ $desc: boolean }>`
	transform: ${({ $desc }) => ($desc ? 'scaleY(-1)' : 'none')};
`;

export function SortIcon({
	size = 16,
	color = 'text.tableHeader',
	direction = 'asc',
}: SortIconProps) {
	const strokeColor = getThemeColor(color);
	return (
		<StyledSvg
			width={size}
			height={size}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			$desc={direction === 'desc'}
		>
			<path
				d="M4 10L8 6L12 10"
				stroke={strokeColor}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</StyledSvg>
	);
}
