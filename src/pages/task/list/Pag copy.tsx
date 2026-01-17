import TableCellSort from '@/components/TableCellSort';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import tasksSo, { Sort } from '@/stores/task/list';
import { Task, TASK_STATUS } from '@/types/Task';
import { Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBanner from '../../../components/MessageBanner';
import TaskRow from './TaskRow';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import Card from '@/components/Card';



interface Props {
}

const TasksList: React.FC<Props> = ({
}) => {

	// STORES
	useStore(tasksSo)


	// HOOKS
	const navigate = useNavigate()

	useEffect(() => {
		locationSo.setCurrent(LOCATION_PAGE.TASKS)
		tasksSo.fetch()
	}, [])

	const tasks = useMemo(
		() => tasksSo.getTasksView(),
		[tasksSo.state.all]
	)

	const selectedIds = useMemo(
		() => tasksSo.getSelected(),
		[tasksSo.state]
	)


	// HANDLERS

	const handleRowClick = (task: Task) => {
		navigate(`/app/tasks/${task.id}`)
	}

	const handleNewTaskClick = () => {
		navigate(`/app/tasks/new`)
	}

	const handleDeleteClick = async () => {
		if (!(await dialogSo.dialogOpen({
			type: DIALOG_TYPE.WARNING,
			text: 'Are you sure you want to delete the selected tasks?',
			modal: true,
		}))) return
		await tasksSo.bulkDelete()
		dialogSo.dialogOpen({
			type: DIALOG_TYPE.INFO,
			text: 'Selected tasks have been deleted.',
		})
	}

	const handleSelectAllClick = () => {
		if (selectedIds.length == tasks.length) {
			tasksSo.setSelected([])
			return
		}
		tasksSo.setSelected(tasks.map((n) => n.id!))
	}

	const handleSelect = (task: Task) => {
		tasksSo.toggleSelect(task.id);
	}

	const handleClickSort = (sort: Sort) => {
		tasksSo.setSortBy(sort)
	}

	const handleStatusChange = async (task: Task, status: TASK_STATUS) => {
		tasksSo.updateStatus({ id: task.id!, status: status })
	}


	// RENDER
	const isSelected = (id: string) => selectedIds.indexOf(id) !== -1
	const sort: Sort = tasksSo.getSortBy()

	if (!tasks || tasks.length === 0) {
		return <MessageBanner>
			Nessun task disponibile. Clicca su "ADD" per crearne uno nuovo.
		</MessageBanner>
	}

	return (
		<Card >
			<TableContainer sx={{  }} component={Paper}>
				
				<Table stickyHeader sx={{ maxWidth: '800px', maxHeight: "600px" }} >

					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									color="primary"
									checked={tasks.length > 0 && selectedIds.length === tasks.length}
									onChange={handleSelectAllClick}
								/>
							</TableCell>
							<TableCellSort label='status' sort={sort} onSort={handleClickSort}>
								STATUS
							</TableCellSort>
							<TableCellSort label='title' sort={sort} onSort={handleClickSort}>
								TITLE
							</TableCellSort>
							<TableCellSort label='description' sort={sort} onSort={handleClickSort}>
								DESCRIPTION
							</TableCellSort>
							<TableCellSort label='create_at' sort={sort} onSort={handleClickSort}>
								CREATED AT
							</TableCellSort>
						</TableRow>
					</TableHead>

					<TableBody>
						{tasks.map((task) => (
							<TaskRow key={task.id}
								task={task}
								selected={isSelected(task.id!)}
								onClick={handleRowClick}
								onSelect={handleSelect}
								onStatusChange={handleStatusChange}
							/>
						))}
					</TableBody>

				</Table>

				{/* <Box sx={sxFooter}>
					{selectedIds.length > 0 && (
						<Button variant="contained"
							onClick={handleDeleteClick}
						>{`DELETE${selectedIds.length > 1 ? " ALL" : ""}`}</Button>
					)}

					<Button variant="contained"
						onClick={handleNewTaskClick}
					>ADD</Button>
				</Box> */}

			</TableContainer>
		</Card>
	)
};

export default TasksList;

const sxFooter = {
	p: 2,
	display: 'flex',
	justifyContent: 'flex-end',
	gap: 2
}