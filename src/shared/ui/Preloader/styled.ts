import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Overlay = styled.div`
	${({ theme }) => css`
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: ${theme.radii.sm};
		z-index: 10;
	`}
`;

export const Spinner = styled.div`
	${({ theme }) => css`
		width: 48px;
		height: 48px;
		border: 3px solid ${theme.colors.borderGray};
		border-top-color: ${theme.colors.accent.primary};
		border-radius: 50%;
		animation: ${spin} 0.8s linear infinite;
	`}
`;
