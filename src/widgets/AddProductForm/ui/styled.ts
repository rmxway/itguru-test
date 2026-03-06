import styled, { css } from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 24px;
	width: 100%;
	min-width: 320px;
`;

export const Title = styled.h2`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.lg};
		font-weight: ${theme.fontWeights.semibold};
		line-height: 1.2;
		color: ${theme.colors.text.primary};
		margin: 0 0 8px 0;
	`}
`;

export const FieldsBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
`;

export const ButtonBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	width: 100%;
	margin-top: 8px;
`;
