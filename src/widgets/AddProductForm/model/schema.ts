import * as yup from 'yup';
import type { AddProductFormData } from '@shared/types';

export const addProductSchema: yup.ObjectSchema<AddProductFormData> = yup
	.object({
		title: yup
			.string()
			.required('Наименование обязательно для заполнения')
			.min(3, 'Наименование должно содержать минимум 3 символа'),
		price: yup
			.number()
			.required('Цена обязательна для заполнения')
			.positive('Цена должна быть больше 0')
			.typeError('Введите корректное число'),
		brand: yup
			.string()
			.required('Вендор обязателен для заполнения')
			.min(2, 'Вендор должен содержать минимум 2 символа'),
		sku: yup
			.string()
			.required('Артикул обязателен для заполнения')
			.min(3, 'Артикул должен содержать минимум 3 символа'),
	})
	.required();
