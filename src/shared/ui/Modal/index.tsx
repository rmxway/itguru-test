import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@shared/assets/icons';
import { lockScroll, unlockScroll } from '@shared/lib/utils';
import { Backdrop, Content, CloseButton, type ModalSize } from './styled';

export type { ModalSize } from './styled';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	size?: ModalSize;
}

export function Modal({ isOpen, onClose, children, size }: ModalProps) {
	const handleClose = useCallback(() => onClose(), [onClose]);

	const handleEscape = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		},
		[handleClose],
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			lockScroll();
			return () => {
				document.removeEventListener('keydown', handleEscape);
				unlockScroll();
			};
		}
	}, [isOpen, handleEscape]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) handleClose();
	};

	if (!isOpen) return null;

	return createPortal(
		<Backdrop onClick={handleBackdropClick} role="dialog" aria-modal="true">
			<Content $size={size} onClick={(e) => e.stopPropagation()}>
				<CloseButton
					type="button"
					onClick={handleClose}
					aria-label="Закрыть"
				>
					<CloseIcon size={24} color="text.primary" />
				</CloseButton>
				{children}
			</Content>
		</Backdrop>,
		document.body,
	);
}
