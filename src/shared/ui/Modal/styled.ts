import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { media } from '@app/styles/media';

export const modalSizes = {
	sm: 400,
	md: 560,
	lg: 720,
} as const;

export type ModalSize = keyof typeof modalSizes;

export const backdropVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

export const contentVariants = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.95 },
};

export const modalTransition = { duration: 0.2 };

export const Backdrop = styled(motion.div)`
	${() => css`
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 16px;
		padding-top: max(16px, env(safe-area-inset-top));
		padding-bottom: max(16px, env(safe-area-inset-bottom));
		padding-left: max(16px, env(safe-area-inset-left));
		padding-right: max(16px, env(safe-area-inset-right));
		z-index: 1000;
		-webkit-overflow-scrolling: touch;

		${media.greaterThan('sm')`
			padding: 24px;
		`}
	`}
`;

export const Content = styled(motion.div)<{ $size?: ModalSize }>`
	${({ theme, $size }) => css`
		position: relative;
		width: 100%;
		max-width: ${$size ? `min(${modalSizes[$size]}px, 90vw)` : '400px'};
		background-color: ${theme.colors.white};
		border-radius: ${theme.radii.sm};
		box-shadow: ${theme.shadows.card};
		padding: 16px;
		padding-top: 44px;
		margin: auto;
		-webkit-overflow-scrolling: touch;

		${media.greaterThan('sm')`						
			padding: 24px;
			padding-top: 48px;
		`}

		&:focus {
			outline: none;
		}
	`}
`;

export const CloseButton = styled.button`
	${({ theme }) => css`
		position: absolute;
		top: 12px;
		right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: none;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: ${theme.colors.inputBg};
		}

		${media.greaterThan('sm')`
			top: 16px;
			right: 16px;
			width: 32px;
			height: 32px;
		`}
	`}
`;
