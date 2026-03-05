import type { FlexProps } from './styled';
import { StyledFlex } from './styled';

export type { FlexProps } from './styled';

export function Flex({
	$direction = 'row',
	$justify = 'flex-start',
	$align = 'stretch',
	$gap,
	$wrap = 'nowrap',
	children,
	...props
}: FlexProps) {
	return (
		<StyledFlex
			{...{ $direction, $justify, $align, $gap, $wrap }}
			{...props}
		>
			{children}
		</StyledFlex>
	);
}
