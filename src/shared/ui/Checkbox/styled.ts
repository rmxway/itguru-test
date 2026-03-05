import styled from 'styled-components';

export const Wrapper = styled.label`
	display: flex;
	align-items: center;
	gap: 10px;
	cursor: pointer;
	user-select: none;
`;

export const HiddenInput = styled.input`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
`;

export const CheckboxBox = styled.div<{ $checked: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	flex-shrink: 0;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.white};
	transition:
		border-color 0.2s ease,
		background-color 0.2s ease;

	${({ $checked, theme }) =>
		$checked &&
		`
    background-color: ${theme.colors.accent.primary};
    border-color: ${theme.colors.accent.primary};
  `}
`;

export const Label = styled.span`
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: ${({ theme }) => theme.fontWeights.medium};
	line-height: 1.5;
	color: ${({ theme }) => theme.colors.text.tertiary};
`;
