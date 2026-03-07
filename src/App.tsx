import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@app/components/ProtectedRoute';
import { ErrorBoundary } from '@app/components/ErrorBoundary';

const LoginPage = lazy(() =>
	import('@pages/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const ProductsPage = lazy(() =>
	import('@pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
);

function App() {
	return (
		<ErrorBoundary>
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
		</ErrorBoundary>
	);
}

export default App;
