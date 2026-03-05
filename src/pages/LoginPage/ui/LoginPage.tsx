import { useLocation } from 'react-router-dom';
import { LoginForm } from '@widgets/LoginForm';
import { Page, Card, CardInner } from './styled';

export function LoginPage() {
	const location = useLocation();
	const fromLogout = (location.state as { fromLogout?: boolean })?.fromLogout;

	return (
		<Page>
			<Card>
				<CardInner>
					<LoginForm key={fromLogout ? 'reset' : undefined} />
				</CardInner>
			</Card>
		</Page>
	);
}
