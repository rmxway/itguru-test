import styled from 'styled-components';

export const StyledButton = styled.button<{
	$variant?: 'primary' | 'secondary';
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 16px 8px;
	border: none;
	border-radius: ${({ theme }) => theme.radii.sm};
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};
	line-height: 1.2;
	letter-spacing: -0.18px;
	cursor: pointer;
	transition: opacity 0.2s ease;

	${({ $variant = 'primary', theme }) =>
		$variant === 'primary'
			? `
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.12) 100%),
      linear-gradient(90deg, ${theme.colors.accent.primary} 0%, ${theme.colors.accent.primary} 100%);
    border: 1px solid ${theme.colors.accent.secondary};
    color: ${theme.colors.white};
    box-shadow: ${theme.shadows.button},
      ${theme.shadows.buttonInset};
  `
			: `
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.text.primary};
  `}

	&:hover:not(:disabled) {
		opacity: 0.9;
	}

	&:active:not(:disabled) {
		opacity: 0.95;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
