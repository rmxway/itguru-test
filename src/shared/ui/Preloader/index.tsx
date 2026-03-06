import { Overlay, Spinner } from './styled';

export function Preloader() {
	return (
		<Overlay>
			<Spinner />
		</Overlay>
	);
}
