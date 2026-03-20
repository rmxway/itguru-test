import styled from 'styled-components';
import { Button } from '@shared/ui/Button';

const Wrapper = styled.div`
	padding: 2rem;
	text-align: center;
	font-family: ${({ theme }) => theme.fonts.primary};
`;

const Title = styled.h2`
	font-size: ${({ theme }) => theme.fontSizes.lg};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0 0 0.5rem;
`;

const Text = styled.p`
	font-size: ${({ theme }) => theme.fontSizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0 0 1rem;
`;

export function ErrorBoundaryFallback() {
	return (
		<Wrapper>
			<Title>Произошла ошибка</Title>
			<Text>Попробуйте обновить страницу</Text>
			<Button type="button" onClick={() => window.location.reload()}>
				Обновить страницу
			</Button>
		</Wrapper>
	);
}
