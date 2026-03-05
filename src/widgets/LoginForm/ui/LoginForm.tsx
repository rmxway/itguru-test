import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../model/schema';
import type { LoginFormData } from '../model/schema';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
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
	ButtonBlock,
	Divider,
	DividerLine,
	DividerText,
	FooterText,
	CreateLink,
} from './styled';

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			login: '',
			password: '',
			rememberMe: false,
		},
	});

	const loginValue = watch('login'); // eslint-disable-line react-hooks/incompatible-library -- RHF watch for conditional clear button

	const onSubmit = (data: LoginFormData) => {
		console.log('Form submitted:', data);
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
						leftIcon={<UserIcon size={24} color="text.tertiary" />}
						rightIcon={
							loginValue ? (
								<CloseIcon size={24} color="text.tertiary" />
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
						leftIcon={<LockIcon size={24} color="text.tertiary" />}
						rightIcon={
							showPassword ? (
								<EyeOffIcon size={24} color="text.tertiary" />
							) : (
								<EyeOnIcon size={24} color="text.tertiary" />
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

				<ButtonBlock>
					<Button type="submit">Войти</Button>
					<Divider>
						<DividerLine />
						<DividerText>или</DividerText>
						<DividerLine />
					</Divider>
				</ButtonBlock>
			</FieldsBlock>

			<FooterText>
				Нет аккаунта? <CreateLink href="#">Создать</CreateLink>
			</FooterText>
		</Form>
	);
}
