import { StyledButton } from './styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	children: React.ReactNode;
}

export function Button({
	variant = 'primary',
	children,
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<StyledButton $variant={variant} type={type} {...props}>
			{children}
		</StyledButton>
	);
}
