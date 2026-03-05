import { StyledContainer } from './styled';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	fluid?: boolean;
	children: React.ReactNode;
}

export function Container({
	fluid = false,
	children,
	...props
}: ContainerProps) {
	return (
		<StyledContainer $fluid={fluid} {...props}>
			{children}
		</StyledContainer>
	);
}
