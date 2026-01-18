import { useDebounce } from '@/hooks/useDebounce';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import tasksSo from '@/stores/task/list';
import { Close, Search } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';



const TasksListHeader: React.FC = () => {

	// STORES
	useStore(tasksSo)


	// HOOKS
	const navigate = useNavigate()

	const [filter, setFilter] = useDebounce<string>(
		tasksSo.getTextFilter(), 
		(value) => tasksSo.setTextFilter(value),
	)

	const selectedIds = useMemo(() => tasksSo.getSelected(), [tasksSo.state])



	// HANDLERS
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

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value)
	}


	// RENDER

	return <>

		<Typography variant="h5">
			TASKS LIST
		</Typography>

		<TextField sx={{ flex: 1 }}
			value={filter}
			slotProps={{
				input: {
					startAdornment: <InputAdornment position="start">
						<Search fontSize='small' />
					</InputAdornment>,
					endAdornment: <InputAdornment position="end">
						<IconButton size="small"
							onClick={() => tasksSo.setTextFilter(null)}
						><Close /></IconButton>
					</InputAdornment>,
				},
			}}
			onChange={handleFilterChange}
			placeholder="Search tasks..."
		/>

		{selectedIds.length > 0 && (
			<Button variant="contained"
				onClick={handleDeleteClick}
			>{`DELETE${selectedIds.length > 1 ? " ALL" : ""}`}</Button>
		)}

		<Button variant="contained"
			onClick={handleNewTaskClick}
		>ADD</Button>

	</>
}

export default TasksListHeader;
