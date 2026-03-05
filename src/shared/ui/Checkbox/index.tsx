import { forwardRef, useId } from 'react';
import { Wrapper, HiddenInput, CheckboxBox, Label } from './styled';

export interface CheckboxProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'type'
> {
	label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, id, checked, ...props }, ref) => {
		const generatedId = useId();
		const checkboxId = id ?? `checkbox-${generatedId}`;

		return (
			<Wrapper htmlFor={checkboxId}>
				<HiddenInput
					ref={ref}
					type="checkbox"
					id={checkboxId}
					checked={checked}
					{...props}
				/>
				<CheckboxBox $checked={Boolean(checked)} aria-hidden="true">
					{checked && (
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
								fill="white"
							/>
						</svg>
					)}
				</CheckboxBox>
				{label && <Label>{label}</Label>}
			</Wrapper>
		);
	},
);

Checkbox.displayName = 'Checkbox';
