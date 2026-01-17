import { TASK_STATUS } from '@/types/Task';
import { Chip } from '@mui/material';
import React from 'react';



interface Props {
	status: TASK_STATUS;
	onClick?: (e: React.MouseEvent) => void;
}

const StatusCmp: React.FC<Props> = ({ 
	status, 
	onClick, 
}) => {
	
	return (
		<Chip 
			label={status} 
			color="primary" 
			onClick={onClick}
		/>
	);
};

export default StatusCmp;
