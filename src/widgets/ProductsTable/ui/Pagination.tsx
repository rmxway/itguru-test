import { CaretLeftIcon, CaretRightIcon } from '@shared/assets/icons';
import { MAX_VISIBLE_PAGES } from '@shared/constants';
import {
	PaginationFooter,
	PaginationInfo,
	PaginationControls,
	PaginationButton,
	PaginationNumbers,
	PageNumber,
} from './styled';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	start: number;
	end: number;
	total: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	start,
	end,
	total,
	onPageChange,
}: PaginationProps) {
	const getVisiblePages = (): number[] => {
		if (totalPages <= MAX_VISIBLE_PAGES) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		const half = Math.floor(MAX_VISIBLE_PAGES / 2);
		let startPage = Math.max(1, currentPage - half);
		const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
		if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
			startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
		}
		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i,
		);
	};

	const visiblePages = getVisiblePages();
	const range = `${start}-${end}`;

	return (
		<PaginationFooter>
			<PaginationInfo>
				Показано <span>{range}</span> из <span>{total}</span>
			</PaginationInfo>
			<PaginationControls>
				<PaginationButton
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage <= 1}
					aria-label="Предыдущая страница"
				>
					<CaretLeftIcon size={20} color="text.primary" />
				</PaginationButton>
				<PaginationNumbers>
					{visiblePages.map((page) => (
						<PageNumber
							key={page}
							$active={page === currentPage}
							onClick={() => onPageChange(page)}
							type="button"
						>
							{page}
						</PageNumber>
					))}
				</PaginationNumbers>
				<PaginationButton
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage >= totalPages}
					aria-label="Следующая страница"
				>
					<CaretRightIcon size={20} color="text.primary" />
				</PaginationButton>
			</PaginationControls>
		</PaginationFooter>
	);
}
