import TableCellSort from '@/components/TableCellSort';
import themeSo from '@/stores/layout/theme';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import tasksSo, { Sort } from '@/stores/task/list';
import { Task, TASK_STATUS } from '@/types/Task';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBanner from '../../../components/MessageBanner';
import TaskRow from './TaskRow';



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
	const theme = themeSo.state.current

	if (tasksSo.state.all === null) return
	if (tasksSo.state.all.length > 0 && tasks.length === 0) return (
		<MessageBanner>
			Nessun task corrisponde ai filtri di ricerca impostati.
		</MessageBanner>
	)
	if (tasks.length === 0) return (
		<MessageBanner>
			Nessun task disponibile. Clicca su "ADD" per crearne uno nuovo.
		</MessageBanner>
	)


	return (
		<Table stickyHeader sx={{ maxWidth: '800px', bgcolor: theme.palette.background.paper }} >

			<TableHead >
				<TableRow >
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
					<TableCellSort label='createdAt' sort={sort} onSort={handleClickSort}>
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
	)
};

export default TasksList;
