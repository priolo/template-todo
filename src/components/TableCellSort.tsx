import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';
import { Sort } from '@/stores/task/list';



interface Props {
	label: string;
	sort: Sort;

	children: React.ReactNode;
	onSort: (sort: Sort) => void;
}

const TableCellSort: React.FC<Props> = ({ 
	label, 
	sort, 

	children, 
	onSort, 
}) => {

	const handleClick = () => {
		let direction: "asc" | "desc" = 'asc';
		if (sort.prop === label) direction = sort.direction === 'asc' ? 'desc' : 'asc';
		onSort({ prop: label, direction });
	}
	
	return (
		<TableCell>
			<TableSortLabel
				active={sort.prop === label}
				direction={sort.direction}
				onClick={handleClick}
			>
				{children}
			</TableSortLabel>
		</TableCell>
	);
};

export default TableCellSort;
