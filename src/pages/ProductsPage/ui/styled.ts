import styled, { css } from 'styled-components';

export const Page = styled.div`
	${({ theme }) => css`
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: ${theme.colors.background};
	`}
`;

export const Header = styled.header`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 0;
		background-color: ${theme.colors.white};
		border-bottom: 1px solid ${theme.colors.border};
	`}
`;

export const Username = styled.span`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.md};
		font-weight: ${theme.fontWeights.semibold};
		color: ${theme.colors.text.primary};
	`}
`;

export const LogoutLink = styled.a`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.md};
		font-weight: ${theme.fontWeights.medium};
		color: ${theme.colors.accent.primary};
		text-decoration: none;
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	`}
`;

export const Content = styled.main`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px;
`;

export const Title = styled.h1`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.xl};
		font-weight: ${theme.fontWeights.semibold};
		color: ${theme.colors.text.primary};
	`}
`;
