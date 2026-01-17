import tasksApi, { TasksApi } from "@/api/tasks.js"
import { Task, TASK_STATUS } from "@/types/Task"
import { createStore, StoreCore } from "@priolo/jon"



export const setup = {

	state: {
		selected: <Task>null,
	},

	getters: {
	},

	actions: {

		async fetch(id: string, store?: TaskStore) {
			const task = (await store.api.get(id))?.task
			store.setSelected(task)
		},

		new(_: void, store?: TaskStore) {
			const newTask: Task = {
				title: "",
				description: "",
				status: TASK_STATUS.PENDING,
			}
			store.setSelected(newTask)
		},

		async save(_: void, store?: TaskStore) {
			if (!store.state.selected) return
			const savedTask = (await store.api.save(store.state.selected))?.task
			store.setSelected(savedTask)
		},

	},

	mutators: {
		setSelected: (selected: Task) => ({ selected }),
	},
}

export type TaskState = typeof setup.state
export type TaskGetters = typeof setup.getters
export type TaskActions = typeof setup.actions
export type TaskMutators = typeof setup.mutators
export interface TaskStore extends StoreCore<TaskState>, TaskGetters, TaskActions, TaskMutators {
	state: TaskState
	api: TasksApi
}

const taskSo = createStore<TaskState>(setup) as TaskStore
taskSo.api = tasksApi
export default taskSo 
