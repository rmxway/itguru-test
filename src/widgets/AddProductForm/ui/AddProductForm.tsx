import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addProductSchema } from '../model/schema';
import type { AddProductFormData } from '@shared/types';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Form, Title, FieldsBlock, ButtonBlock } from './styled';

export interface AddProductFormProps {
	onSubmit: (data: AddProductFormData) => void;
	onCancel: () => void;
}

export function AddProductForm({ onSubmit, onCancel }: AddProductFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddProductFormData>({
		resolver: yupResolver(addProductSchema),
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			title: '',
			price: undefined,
			brand: '',
			sku: '',
		},
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Title>Добавить товар</Title>
			<FieldsBlock>
				<Input
					label="Наименование"
					placeholder="Введите наименование"
					error={errors.title?.message}
					{...register('title')}
				/>
				<Input
					label="Цена, $"
					type="number"
					placeholder="Введите цену"
					error={errors.price?.message}
					{...register('price', { valueAsNumber: true })}
				/>
				<Input
					label="Вендор"
					placeholder="Введите вендора"
					error={errors.brand?.message}
					{...register('brand')}
				/>
				<Input
					label="Артикул"
					placeholder="Введите артикул"
					error={errors.sku?.message}
					{...register('sku')}
				/>
			</FieldsBlock>
			<ButtonBlock>
				<Button type="button" variant="secondary" onClick={onCancel}>
					Отмена
				</Button>
				<Button type="submit">Добавить</Button>
			</ButtonBlock>
		</Form>
	);
}
