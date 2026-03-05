import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '@app/styles/theme';
import { GlobalStyles } from '@app/styles/GlobalStyles';
import type { ChildrenProps } from '@shared/types';

export function ThemeProvider({ children }: ChildrenProps) {
	return (
		<StyledThemeProvider theme={theme}>
			<GlobalStyles />
			{children}
		</StyledThemeProvider>
	);
}
