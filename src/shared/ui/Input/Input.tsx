import { forwardRef, useId } from 'react';
import {
	Wrapper,
	Label,
	InputWrapper,
	StyledInput,
	IconWrapper,
} from './styled';
import { ErrorMessage } from '@shared/ui/ErrorMessage';

export interface InputProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'size'
> {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	onRightIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ label, error, leftIcon, rightIcon, onRightIconClick, id, ...props },
		ref,
	) => {
		const generatedId = useId();
		const inputId = id ?? `input-${generatedId}`;

		return (
			<Wrapper>
				{label && (
					<Label htmlFor={inputId} id={`${inputId}-label`}>
						{label}
					</Label>
				)}
				<InputWrapper $hasError={Boolean(error)}>
					{leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
					<StyledInput
						ref={ref}
						id={inputId}
						aria-invalid={Boolean(error)}
						aria-describedby={
							error ? `${inputId}-error` : undefined
						}
						{...props}
					/>
					{rightIcon && (
						<IconWrapper
							onClick={onRightIconClick}
							role={onRightIconClick ? 'button' : undefined}
							tabIndex={onRightIconClick ? 0 : undefined}
							onKeyDown={
								onRightIconClick
									? (e) => {
											if (
												e.key === 'Enter' ||
												e.key === ' '
											) {
												e.preventDefault();
												onRightIconClick();
											}
										}
									: undefined
							}
						>
							{rightIcon}
						</IconWrapper>
					)}
				</InputWrapper>
				{error && (
					<ErrorMessage id={`${inputId}-error`} role="alert">
						{error}
					</ErrorMessage>
				)}
			</Wrapper>
		);
	},
);

Input.displayName = 'Input';
