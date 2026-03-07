import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '@shared/lib/storage';

export function useAuth() {
	const navigate = useNavigate();
	const user = getUser();

	useEffect(() => {
		if (!user) {
			navigate('/login', { replace: true });
		}
	}, [user, navigate]);

	const handleLogout = useCallback(() => {
		removeUser();
		navigate('/login', { replace: true, state: { fromLogout: true } });
	}, [navigate]);

	return {
		user,
		handleLogout,
	};
}
