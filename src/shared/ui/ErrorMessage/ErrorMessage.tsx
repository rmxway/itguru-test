import type { ChildrenProps } from '@shared/types';
import { StyledErrorMessage } from './styled';

interface ErrorMessageProps extends ChildrenProps {
	id?: string;
	role?: string;
}

export function ErrorMessage({
	children,
	id,
	role = 'alert',
}: ErrorMessageProps) {
	return (
		<StyledErrorMessage id={id} role={role}>
			{children}
		</StyledErrorMessage>
	);
}
