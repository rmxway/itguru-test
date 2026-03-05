import styled, { css } from 'styled-components';
import { media } from '@app/styles/media';

export const StyledContainer = styled.div<{ $fluid?: boolean }>`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	padding-left: 16px;
	padding-right: 16px;

	${({ $fluid }) =>
		!$fluid &&
		css`
			max-width: calc(100% - 32px);

			${media.greaterThan('sm')`
				max-width: 720px;
				padding-left: 24px;
				padding-right: 24px;
			`}

			${media.greaterThan('md')`
				max-width: 960px;
				padding-left: 32px;
				padding-right: 32px;
			`}

			${media.greaterThan('lg')`
				max-width: 1200px;
				padding-left: 40px;
				padding-right: 40px;
			`}

			${media.greaterThan('xl')`
				max-width: 1440px;
				padding-left: 48px;
				padding-right: 48px;
			`}
		`}
`;
