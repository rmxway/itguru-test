import styled, { css } from 'styled-components';

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
	width: 20px;
	height: 20px;
	flex-shrink: 0;
	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.white};
	transition:
		border-color 0.2s ease,
		background-color 0.2s ease;

	${({ $checked, theme }) =>
		$checked &&
		css`
			background-color: ${theme.colors.accent.primary};
			border-color: ${theme.colors.accent.primary};
		`}
`;

export const Label = styled.span`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.sm};
		font-weight: ${theme.fontWeights.medium};
		line-height: 1.5;
		color: ${theme.colors.text.tertiary};
	`}
`;
