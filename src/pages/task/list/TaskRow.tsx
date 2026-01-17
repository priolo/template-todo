import StatusCmp from '@/components/StatusCmp';
import StatusDialog from '@/components/StatusDialog';
import { Task, TASK_STATUS } from '@/types/Task';
import { Checkbox, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import dayjs from 'dayjs';



interface TaskRowProps {
	task: Task;
	selected?: boolean;
	onClick?: (task: Task) => void;
	onSelect?: (task: Task) => void;
	onStatusChange?: (task: Task, status: TASK_STATUS) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
	task,
	selected,
	onClick,
	onSelect,
	onStatusChange,
}) => {

	// STATE
	const [dialogOpen, setDialogOpen] = useState(false)


	// HANDLERS
	const handleRowClick = () => {
		onClick?.(task)
	}
	const handleDialogClose = (status: TASK_STATUS) => {
		setDialogOpen(false)
		if ( status == null ) return
		onStatusChange?.(task, status)
	}
	const handleStatusClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setDialogOpen(true)
	}


	// RENDER
	const title = task.title;
	const createdAt = task.createdAt ? dayjs(task.createdAt).format('DD/MM/YYYY HH:mm') : "--";

	return <>
		<TableRow hover role="checkbox" sx={{ cursor: 'pointer' }}
			onClick={handleRowClick}
			selected={selected}
		>

			<TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
				<Checkbox
					color="primary"
					checked={selected}
					inputProps={{
						'aria-labelledby': `enhanced-table-checkbox-${task.id}`,
					}}
					onChange={() => onSelect?.(task)}
				/>
			</TableCell>

			<TableCell>
				<StatusCmp
					status={task.status}
					onClick={handleStatusClick}
				/>
			</TableCell>

			<TableCell>
				<Typography variant="body2" fontWeight="bold">
					{title}
				</Typography>
			</TableCell>

			<TableCell>
				<Typography variant="body2">
					{task.description}
				</Typography>
			</TableCell>

			<TableCell>
				<Typography variant="overline" color="text.secondary">
					{createdAt}
				</Typography>
			</TableCell>

		</TableRow>


		<StatusDialog
			isOpen={dialogOpen}
			status={task.status}
			onClose={handleDialogClose}
		/>

	</>
};

export default TaskRow
