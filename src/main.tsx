import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@app/providers/QueryProvider';
import { ThemeProvider } from '@app/providers/ThemeProvider';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<BrowserRouter>
				<ThemeProvider>
					<App />
					<Toaster position="top-right" />
				</ThemeProvider>
			</BrowserRouter>
		</QueryProvider>
	</StrictMode>,
);
