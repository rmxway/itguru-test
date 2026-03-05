import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getToken } from '@shared/lib/storage';

const LoginPage = lazy(() =>
	import('@pages/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const ProductsPage = lazy(() =>
	import('@pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const token = getToken();
	return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/products"
					element={
						<ProtectedRoute>
							<ProductsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Navigate to="/products" replace />
						</ProtectedRoute>
					}
				/>
				<Route
					path="*"
					element={
						<ProtectedRoute>
							<Navigate to="/products" replace />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Suspense>
	);
}

export default App;
