import { Task, TASK_STATUS } from "@/types/Task";


export function buildTasksApiMock() {
	const tasks: Task[] = [
		{ id: '1', title: 'Task 1', description: "desc 1", status: TASK_STATUS.PENDING },
		{ id: '2', title: 'Task 2', description: "desc 2", status: TASK_STATUS.IN_PROGRESS },
		{ id: '3', title: 'Task 3', description: "desc 3", status: TASK_STATUS.COMPLETED },
	]
	return {
		index: async () => ({ tasks }),
		get: async (id: string) => ({
			task: tasks.find(t => t.id === id) || null
		}),
		save: async (task: Task) => {
			const index = tasks.findIndex(t => t.id === task.id)
			if (index >= 0) {
				tasks[index] = { ...tasks[index], ...task }
			} else {
				task.id = (tasks.length + 1).toString()
				tasks.push(task)
			}
			return { task }
		},
		bulkDelete: async (ids: string[]) => {
			for (const id of ids) {
				const index = tasks.findIndex(t => t.id === id)
				if (index >= 0) tasks.splice(index, 1)
			}
			return { confirm: true }
		},
	}
}