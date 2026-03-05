import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	width: 100%;
`;

export const Label = styled.label`
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-weight: ${({ theme }) => theme.fontWeights.medium};
	line-height: 1.5;
	letter-spacing: -0.27px;
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const InputWrapper = styled.div<{ $hasError?: boolean }>`
	display: flex;
	align-items: center;
	gap: 14px;
	width: 100%;
	padding: 14px 16px;
	background-color: ${({ theme }) => theme.colors.white};
	border: 2px solid
		${({ theme, $hasError }) =>
			$hasError ? theme.colors.error : theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.sm};
	transition: border-color 0.2s ease;

	&:focus-within {
		border-color: ${({ theme, $hasError }) =>
			$hasError ? theme.colors.error : theme.colors.accent.primary};
	}
`;

export const StyledInput = styled.input`
	flex: 1;
	min-width: 0;
	border: none;
	outline: none;
	background: transparent;
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-weight: ${({ theme }) => theme.fontWeights.medium};
	line-height: 1.5;
	letter-spacing: -0.27px;
	color: ${({ theme }) => theme.colors.text.primary};

	&::placeholder {
		color: ${({ theme }) => theme.colors.text.tertiary};
	}

	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.white}
			inset;
		box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.white} inset;
	}
`;

export const IconWrapper = styled.div<{ $clickable?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	cursor: pointer;
	pointer-events: ${({ $clickable }) => ($clickable ? 'auto' : 'none')};
`;
