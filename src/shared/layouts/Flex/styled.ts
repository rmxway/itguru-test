import styled, { css } from 'styled-components';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
	$direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	$justify?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	$align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
	$gap?: string | number;
	$wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

export const StyledFlex = styled.div<FlexProps>`
	display: flex;
	${({ $direction, $justify, $align, $gap, $wrap }) => css`
		${$direction &&
		css`
			flex-direction: ${$direction};
		`}
		${$justify &&
		css`
			justify-content: ${$justify};
		`}
		${$align &&
		css`
			align-items: ${$align};
		`}
		${$gap != null &&
		css`
			gap: ${typeof $gap === 'number' ? `${$gap}px` : $gap};
		`}
		${$wrap &&
		css`
			flex-wrap: ${$wrap};
		`}
	`}
`;
