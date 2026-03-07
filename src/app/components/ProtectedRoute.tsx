import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchAuthMe } from '@shared/api/auth';
import { getUser, removeUser } from '@shared/lib/storage';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = getUser();
	const [state, setState] = useState(() => ({
		isValidating: !!user,
		isAuthorized: false,
	}));

	useEffect(() => {
		if (!user) return;

		let cancelled = false;
		fetchAuthMe()
			.then((meUser) => {
				if (cancelled) return;
				if (!meUser) {
					removeUser();
				}
				setState({ isValidating: false, isAuthorized: !!meUser });
			})
			.catch(() => {
				if (cancelled) return;
				removeUser();
				setState({ isValidating: false, isAuthorized: false });
			});

		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount when user exists
	}, []);

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (state.isValidating) {
		return null;
	}

	return state.isAuthorized ? (
		<>{children}</>
	) : (
		<Navigate to="/login" replace />
	);
}
