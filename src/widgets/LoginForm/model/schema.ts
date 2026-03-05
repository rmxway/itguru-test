import * as yup from 'yup';

export const loginSchema = yup
	.object({
		login: yup
			.string()
			.required('Логин обязателен для заполнения')
			.min(3, 'Логин должен содержать минимум 3 символа'),
		password: yup
			.string()
			.required('Пароль обязателен для заполнения')
			.min(6, 'Пароль должен содержать минимум 6 символов'),
		rememberMe: yup.boolean().default(false),
	})
	.required();

export type LoginFormData = yup.InferType<typeof loginSchema>;
