import { LoginForm } from '@widgets/LoginForm';
import { Page, Card, CardInner } from './styled';

export function LoginPage() {
	return (
		<Page>
			<Card>
				<CardInner>
					<LoginForm />
				</CardInner>
			</Card>
		</Page>
	);
}
