import { media } from '@app/styles/media';
import styled from 'styled-components';

export const Page = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.background};
	padding: 24px;

	${media.lessThan('xs')`
		padding: 10px;
	`}
`;

export const Card = styled.div`
	position: relative;
	width: 100%;
	max-width: 527px;
	padding: 6px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.radii.lg};
	box-shadow: ${({ theme }) => theme.shadows.card};
	overflow: hidden;
`;

export const CardInner = styled.div`
	padding: 48px;
	background: linear-gradient(
		180deg,
		rgba(35, 35, 35, 0.03) 0%,
		rgba(35, 35, 35, 0) 50%
	);
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.md};
	display: flex;
	flex-direction: column;
	align-items: center;

	${media.lessThan('xs')`
		padding: 20px;
	`}
`;
