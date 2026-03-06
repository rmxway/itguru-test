import styled, { keyframes } from 'styled-components';

const fadeInDown = keyframes`
	from {
		opacity: 0;
		transform: translateY(-4px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const StyledErrorMessage = styled.span`
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.xs};
	font-weight: ${({ theme }) => theme.fontWeights.regular};
	line-height: 1.5;
	color: ${({ theme }) => theme.colors.error};
	animation: ${fadeInDown} 0.2s ease-out;
`;
