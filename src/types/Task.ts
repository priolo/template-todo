

export enum TASK_STATUS {
	PENDING = "PENDING",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED"
}

export interface Task {
	id?: string
	title: string
	description?: string
	status: TASK_STATUS
	
	createdAt?: string
}
