import styled, { css } from 'styled-components';
import { media } from '@app/styles/media';
import { InputWrapper, StyledInput } from '@shared/ui/Input/styled';

export const Page = styled.div`
	${({ theme }) => css`
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: ${theme.colors.pageBackground};
	`}
`;

export const Header = styled.header`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: nowrap;
		gap: 20px;
		height: 105px;
		padding: 0 30px;
		background-color: ${theme.colors.white};
		border-radius: 10px;
		margin: 20px 30px 0;

		${media.lessThan('md')`
			flex-wrap: wrap;
			height: auto;
			padding: 20px;			
			margin: 16px 16px 0;
		`}
	`}
`;

export const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
	flex: 1;
`;

export const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	gap: 20px;

	${media.lessThan('md')`
		order: -1;
		width: 100%;
	`}
`;

export const PageTitle = styled.h1`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.lg};
		font-weight: ${theme.fontWeights.semibold};
		color: ${theme.colors.text.primary};
		margin: 0;

		${media.lessThan('md')`
			font-size: ${theme.fontSizes.md};
		`}
	`}
`;

export const SearchInputWrapper = styled.div`
	flex: 1;
	max-width: 1023px;
	min-width: 0;

	${InputWrapper} {
		background-color: ${({ theme }) => theme.colors.inputBg};
		height: 48px;
		font-size: 14px;
	}

	${StyledInput} {
		font-size: ${({ theme }) => theme.fontSizes.xs};
	}

	${media.lessThan('md')`
		max-width: 100%;
	`}
`;

export const Username = styled.span`
	${({ theme }) => css`
		font-family: ${theme.fonts.primary};
		font-size: ${theme.fontSizes.md};
		font-weight: ${theme.fontWeights.semibold};
		color: ${theme.colors.text.primary};

		${media.lessThan('md')`
			font-size: ${theme.fontSizes.sm};
		`}
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

		${media.lessThan('md')`
			font-size: ${theme.fontSizes.sm};
		`}
	`}
`;

export const Content = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 30px;

	${media.lessThan('md')`
		padding: 16px;
	`}
`;
