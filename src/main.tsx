import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@app/providers/QueryProvider';
import { ThemeProvider } from '@app/providers/ThemeProvider';
import { setupCSPReporter } from '@shared/lib/security/cspReporter';
import { setupErrorBoundary } from '@shared/lib/logging/errorLogger';
import App from './App.tsx';

setupCSPReporter();
setupErrorBoundary();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<BrowserRouter basename={import.meta.env.BASE_URL}>
				<ThemeProvider>
					<App />
					<Toaster position="top-right" />
				</ThemeProvider>
			</BrowserRouter>
		</QueryProvider>
	</StrictMode>,
);
