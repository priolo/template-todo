import StatusCmp from '@/components/StatusCmp';
import StatusDialog from '@/components/StatusDialog';
import Paragraph from '@/components/Paragraph';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import taskSo from '@/stores/task/detail';
import { Message as MessageIcon } from '@mui/icons-material';
import { Box, Button, SxProps, TextField } from '@mui/material';
import { resetAll, rules, useStore, useValidator, validateAll } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../../components/Card';
import { TASK_STATUS } from '@/types/Task';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';



const TaskDetailPag: React.FC = () => {

	// STORES
	useStore(taskSo)
	const task = taskSo.state.selected


	// HOOKS
	const navigate = useNavigate()
	let { id } = useParams<{ id: string }>()
	const titleProp = useValidator(task?.title, [RequiredStringRule])
	const descProp = useValidator(task?.description, [RequiredStringRule])
	const [dialogOpen, setDialogOpen] = useState(false)

	useEffect(() => {
		resetAll()
		locationSo.setCurrent(LOCATION_PAGE.TASK)
		if (id === 'new' || !id) {
			taskSo.new()
			return
		}
		taskSo.fetch(id)
	}, [id])


	// HANDLERS

	const handleTitleChange = (title: string) => {
		taskSo.setSelected({ ...task, title })
	}

	const handleDescriptionChange = (description: string) => {
		taskSo.setSelected({ ...task, description })
	}

	const handleSaveClick = async () => {
		const warn = validateAll()
		if (warn.length > 0) {
			dialogSo.dialogOpen({ 
				type: DIALOG_TYPE.WARNING, 
				labelCancel: null, 
				text: "Please fix the errors before saving the task."
			})
			return false
		}
		await taskSo.save()
		navigate(`/app/tasks/`)
		dialogSo.dialogOpen({
			type: DIALOG_TYPE.INFO,
			text: 'Task has been saved successfully.',
		})
	}
	const handleCancelClick = () => {
		navigate(`/app/tasks/`)
	}
	const handleDialogClose = (status: TASK_STATUS) => {
		setDialogOpen(false)
		if (status == null) return
		taskSo.setSelected({ ...task, status })
	}


	// RENDER
	if (!task) return null
	const isNew = !task.id

	return <>
		<Card sx={sxRoot}
			icon={<MessageIcon />}
			title={isNew ? "NEW TASK" : "EDIT TASK"}
		>

			<Paragraph title="STATUS">
				<StatusCmp
					status={task.status}
					onClick={() => setDialogOpen(true)}
				/>
			</Paragraph>

			<Paragraph title="TITLE">
				<TextField autoFocus
					placeholder="Write a short title"
					value={task?.title ?? ''}
					onChange={(e) => handleTitleChange(e.target.value)}
					{...titleProp}
				/>
			</Paragraph>

			<Paragraph title="DESCRIPTION">
				<TextField
					placeholder="Write a task description"
					value={task?.description ?? ''}
					onChange={(e) => handleDescriptionChange(e.target.value)}
					multiline
					rows={5}
					{...descProp}
				/>
			</Paragraph>

			<Box sx={sxFooter}>
				<Button
					onClick={handleCancelClick}
				>CANCEL</Button>
				<Button variant="contained"
					onClick={handleSaveClick}
				>SAVE</Button>
			</Box>

		</Card>

		<StatusDialog
			isOpen={dialogOpen}
			status={task.status}
			onClose={handleDialogClose}
		/>

	</>


}

export default TaskDetailPag;

const sxRoot: SxProps = {
	mt: 4,
	boxShadow: 5,
	width: '100%',
	maxWidth: "800px",
}

const sxFooter = {
	p: 2,
	display: 'flex',
	justifyContent: 'flex-end',
	gap: 2
}

const RequiredStringRule = (value: string) => {
	if (!value || value.trim() === '') {
		return 'This field is required';
	}
	return null;
}