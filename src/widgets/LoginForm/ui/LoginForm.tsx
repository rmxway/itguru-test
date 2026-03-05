import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../model/schema';
import type { LoginFormData } from '../model/schema';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { useAuth } from '@shared/lib/hooks';
import {
	UserIcon,
	LockIcon,
	EyeOffIcon,
	EyeOnIcon,
	CloseIcon,
	LogoIcon,
} from '@shared/assets/icons';
import {
	Form,
	LogoContainer,
	TextBlock,
	Title,
	Subtitle,
	FieldsBlock,
	InputsGroup,
	CheckboxRow,
	ApiErrorBlock,
	ButtonBlock,
	Divider,
	DividerLine,
	DividerText,
} from './styled';

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { login, isLoading, error, clearError } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		watch,
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			login: '',
			password: '',
			rememberMe: false,
		},
	});

	const loginValue = watch('login'); // eslint-disable-line react-hooks/incompatible-library -- RHF watch for conditional clear button

	const onSubmit = async (data: LoginFormData) => {
		clearError();
		const success = await login(data.login, data.password, data.rememberMe);
		if (success) {
			navigate('/products', { replace: true });
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} noValidate>
			<LogoContainer>
				<LogoIcon size={35} color="text.primary" />
			</LogoContainer>

			<TextBlock>
				<Title>Добро пожаловать!</Title>
				<Subtitle>Пожалуйста, авторизируйтесь</Subtitle>
			</TextBlock>

			<FieldsBlock>
				<InputsGroup>
					<Input
						label="Логин"
						placeholder="Введите логин"
						error={errors.login?.message}
						leftIcon={<UserIcon size={24} color="text.icon" />}
						rightIcon={
							loginValue ? (
								<CloseIcon size={24} color="text.icon" />
							) : undefined
						}
						onRightIconClick={() => setValue('login', '')}
						{...register('login')}
					/>
					<Input
						label="Пароль"
						type={showPassword ? 'text' : 'password'}
						placeholder="Введите пароль"
						error={errors.password?.message}
						leftIcon={<LockIcon size={24} color="text.icon" />}
						rightIcon={
							showPassword ? (
								<EyeOffIcon size={24} color="text.icon" />
							) : (
								<EyeOnIcon size={24} color="text.icon" />
							)
						}
						onRightIconClick={() =>
							setShowPassword((prev) => !prev)
						}
						{...register('password')}
					/>
				</InputsGroup>

				<CheckboxRow>
					<Checkbox
						label="Запомнить данные"
						{...register('rememberMe')}
						checked={watch('rememberMe')}
					/>
				</CheckboxRow>

				{error && (
					<ApiErrorBlock>
						<ErrorMessage>{error}</ErrorMessage>
					</ApiErrorBlock>
				)}

				<ButtonBlock>
					<Button type="submit" disabled={!isValid || isLoading}>
						{isLoading ? 'Вход...' : 'Войти'}
					</Button>
					<Divider>
						<DividerLine />
						<DividerText>или</DividerText>
						<DividerLine />
					</Divider>
				</ButtonBlock>
			</FieldsBlock>
		</Form>
	);
}
