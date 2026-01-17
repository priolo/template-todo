import tasksSo from '@/stores/task/list';
import { Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';



const TaskDetailHeader: React.FC = () => {

	// STORES
	useStore(tasksSo)

	// HOOKS

	// HANDLERS


	// RENDER
	return <>
		<Typography variant="h5">
			TASK DETAIL
		</Typography>
	</>
}

export default TaskDetailHeader;
