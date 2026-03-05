import styled from 'styled-components';

export const StyledErrorMessage = styled.span`
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.xs};
	font-weight: ${({ theme }) => theme.fontWeights.regular};
	line-height: 1.5;
	color: ${({ theme }) => theme.colors.error};
`;
