import { Task, TASK_STATUS } from "@/types/Task";


const TASK_STORAGE_KEY = 'todo-tasks-data'

export function getTasks(): Task[] {
	const data = localStorage.getItem(TASK_STORAGE_KEY)
	if (data) {
		return JSON.parse(data)
	}
	localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(TasksSeed))
	return TasksSeed
}

export function saveTasks(tasks: Task[]) {
	localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
}

const TasksSeed: Task[] = [
	{ 
		id: '1', 
		title: 'Example Task 1', 
		description: 'This is an example task',
		status: TASK_STATUS.PENDING,
	},
	{ 
		id: '2', 
		title: 'Example Task 2', 
		description: 'This is an example task',
		status: TASK_STATUS.PENDING,
	},
	{ 
		id: '3', 
		title: 'Example Task 3', 
		description: 'This is an example task',
		status: TASK_STATUS.PENDING,
	},
	{ 
		id: '4', 
		title: 'Example Task 4', 
		description: 'This is an example task',
		status: TASK_STATUS.PENDING,
	},
]
