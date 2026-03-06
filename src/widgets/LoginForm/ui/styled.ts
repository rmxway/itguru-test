import { media } from '@app/styles/media';
import styled, { css } from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 32px;
	width: 100%;
	max-width: 100%;
`;

export const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 52px;
	height: 52px;
	border: 1px solid rgba(237, 237, 237, 0.7);
	border-radius: ${({ theme }) => theme.radii.full};
	margin: 0 auto;
	background:
		linear-gradient(
			0deg,
			rgba(35, 35, 35, 0) 50%,
			rgba(35, 35, 35, 0.06) 100%
		),
		linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%);
	box-shadow: ${({ theme }) => theme.shadows.logo};
`;

export const TextBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	text-align: center;
	width: 100%;
`;

export const Title = styled.h1`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.xl};
		font-weight: ${theme.fontWeights.semibold};
		line-height: 1.1;
		letter-spacing: -0.6px;
		color: ${theme.colors.text.primary};

		${media.lessThan('xs')`
			font-size: ${theme.fontSizes.lg};
		`}
	`}
`;

export const Subtitle = styled.p`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.md};
		font-weight: ${theme.fontWeights.medium};
		line-height: 1.5;
		color: ${theme.colors.text.secondary};
	`}
`;

export const FieldsBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
`;

export const InputsGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
`;

export const CheckboxRow = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const ApiErrorBlock = styled.div`
	width: 100%;
	text-align: center;
`;

export const ButtonBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
`;

export const Divider = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
`;

export const DividerLine = styled.div`
	flex: 1;
	height: 2px;
	background-color: ${({ theme }) => theme.colors.border};
`;

export const DividerText = styled.span`
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: ${({ theme }) => theme.fontWeights.medium};
	line-height: 1.5;
	color: ${({ theme }) => theme.colors.text.secondary};
`;
