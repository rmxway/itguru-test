import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../model/schema';
import type { LoginFormData } from '@shared/types';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { AuthApiError } from '@shared/api/auth';
import { logError } from '@shared/lib/logging/errorLogger';
import { getLoginErrorMessage } from '@shared/lib/errors/getErrorMessage';
import { useLoginMutation } from '@shared/lib/hooks';
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
	const { mutateAsync: login, isPending, error, reset } = useLoginMutation();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isValid },
		setValue,
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			login: '',
			password: '',
			rememberMe: false,
		},
	});

	const loginValue = useWatch({ name: 'login', control, defaultValue: '' });
	const rememberMeValue = useWatch({
		name: 'rememberMe',
		control,
		defaultValue: false,
	});

	useEffect(() => {
		document.getElementById('login-input')?.focus();
	}, []);

	const onSubmit = async (data: LoginFormData) => {
		reset();
		try {
			await login({
				username: data.login,
				password: data.password,
				rememberMe: data.rememberMe,
			});
			navigate('/products', { replace: true });
		} catch (e) {
			if (!(e instanceof AuthApiError)) {
				logError(e, { context: 'loginSubmit' });
			}
		}
	};

	const loginErrorMessage = error ? getLoginErrorMessage(error) : '';

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
						id="login-input"
						label="Логин"
						placeholder="Введите логин"
						disabled={isPending}
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
						disabled={isPending}
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
						checked={Boolean(rememberMeValue)}
					/>
				</CheckboxRow>

				{loginErrorMessage && (
					<ApiErrorBlock>
						<ErrorMessage>{loginErrorMessage}</ErrorMessage>
					</ApiErrorBlock>
				)}

				<ButtonBlock>
					<Button type="submit" disabled={!isValid || isPending}>
						{isPending ? 'Вход...' : 'Войти'}
					</Button>
					<Divider>
						<DividerLine />
						<DividerText>или</DividerText>
						<DividerLine />
					</Divider>
					<TextBlock>
						<Subtitle>Создать аккаунт (в разработке)</Subtitle>
					</TextBlock>
				</ButtonBlock>
			</FieldsBlock>
		</Form>
	);
}
