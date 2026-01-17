import { TASK_STATUS } from "@/types/Task";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";



interface Props {
	isOpen: boolean,
	status: TASK_STATUS,
	onClose: (status: TASK_STATUS) => void
}

const StatusDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	status,
	onClose,
}) => {


	// HOOKs


	// HANDLERS
	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		onClose?.(null)
	}

	const handleItemClick = (item: any) => {
		onClose?.(item.value)
	}

	// RENDER 
	
	return (

		<Dialog onClose={handleClose} open={isOpen}>

			<DialogTitle>
				STATUS
			</DialogTitle>

			<DialogContent>
				<List>
					{StatusList.map(item =>
						<ListItem disablePadding key={item.value}>
							<ListItemButton
								onClick={() => handleItemClick(item)}
								selected={item.value == status}
							>
								<ListItemText
									primary={item.label}
									secondary={item.description}
								/>
							</ListItemButton>
						</ListItem>
					)}
				</List>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={() => handleClose()}
				>Close</Button>
			</DialogActions>

		</Dialog>
	)
}


export default StatusDialog



export const StatusList = [
	{
		value: TASK_STATUS.PENDING,
		label: "PENDING",
		description: "",
	},
	{
		value: TASK_STATUS.IN_PROGRESS,
		label: "IN PROGRESS",
		description: "",
	},
	{
		value: TASK_STATUS.COMPLETED,
		label: "COMPLETED",
		description: "",
	},
]