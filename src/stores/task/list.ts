import tasksApi, { TasksApi } from "@/api/tasks.js"
import { buildUrlParams, URL_PARAMS_TYPE, UrlParamsService } from "@/plugins/services/url"
import { Task, TASK_STATUS } from "@/types/Task"
import { createStore, StoreCore } from "@priolo/jon"



export const setup = {

	state: {
		all: <Task[]>null,
	},

	getters: {
		getSelected: (_: void, store?: TasksListStore): string[] => {
			const value = store.urlParamsService.get(URL_PARAMS_TYPE.TASK_SELECTED) ?? []
			return Array.isArray(value) ? value : [value]
		},

		/** returns the text filtering the tasks */
		getTextFilter: (_: void, store?: TasksListStore): string => {
			return (store.urlParamsService.get(URL_PARAMS_TYPE.TASK_TEXT_FILTER) as string) ?? ""
		},

		getSortBy: (_: void, store?: TasksListStore): Sort => {
			const values = (store.urlParamsService.get(URL_PARAMS_TYPE.TASK_SORT_BY) as string)?.split("-")
			return { prop: values?.[0], direction: values?.[1] as any }
		},

		/** returns the list of TASKs as it should appear in the list */
		getTasksView: (_: void, store?: TasksListStore): Task[] => {
			if (!store.state.all) return []
			let tasks = [...store.state.all]
			// Filter
			const filter = store.getTextFilter().trim().toLowerCase()
			if (filter) {
				tasks = tasks.filter(t =>
					t.title.toLowerCase().includes(filter) ||
					(t.description && t.description.toLowerCase().includes(filter))
				)
			}
			// Sort
			const sort = store.getSortBy()
			if (sort && sort.prop) {
				const { prop, direction } = sort
				const dir = direction === 'desc' ? -1 : 1
				tasks.sort((a, b) => {
					const valA = (a as any)[prop] ?? ""
					const valB = (b as any)[prop] ?? ""

					if (valA < valB) return -1 * dir
					if (valA > valB) return 1 * dir
					return 0
				})
			}
			return tasks
		}
	},

	actions: {

		/**
		 * Loads TASKS from REPO and sets them in STORE
		 * */
		async fetch(_: void, store?: TasksListStore) {
			const tasks = (await store.apiService.index())?.tasks ?? []
			store.setAll(tasks)
		},

		/**
		 * Updates only the STATUS of a TASK
		 */
		async updateStatus(props: { id: string, status: TASK_STATUS }, store?: TasksListStore) {
			const { id, status } = props
			const task = store.state.all.find(t => t.id === id)
			if (!task) return
			task.status = status
			await store.apiService.save(task)
			store.setAll([...store.state.all])
		},

		async bulkDelete(_: void, store?: TasksListStore) {
			const selectedIds = store.getSelected()
			await store.apiService.bulkDelete(selectedIds)
			store.setAll(store.state.all.filter(t => !selectedIds.includes(t.id!)))
			store.setSelected([])
		},

		/**
		 * sets the selected TASKS
		 */
		setSelected(ids: string[], store?: TasksListStore) {
			store.urlParamsService.set(URL_PARAMS_TYPE.TASK_SELECTED, ids.length > 0 ? ids : null);
			store._update()
		},

		/**
		 * toggle selection of a TASK
		 */
		toggleSelect(id: string, store?: TasksListStore) {
			let selected = [...store.getSelected()]
			const index = selected.indexOf(id);
			selected = index === -1 ? [...selected, id] : selected.filter(sid => sid !== id)
			store.setSelected(selected)
		},

		/** 
		 * sets the text that filters the TASKS 
		 * */
		setTextFilter(filter: string, store?: TasksListStore) {
			store.urlParamsService.set(URL_PARAMS_TYPE.TASK_TEXT_FILTER, filter);
			store.setAll([...store.state.all])
		},

		/** 
		 * nome della prop che ordina i TASKS 
		 * */
		setSortBy(payload: Sort, store?: TasksListStore) {
			store.urlParamsService.set(URL_PARAMS_TYPE.TASK_SORT_BY, `${payload.prop}-${payload.direction}`);
			store.setAll([...store.state.all])
		}

	},

	mutators: {
		setAll: (all: Task[]) => ({ all }),
	},
}

export type TasksListState = typeof setup.state
export type TasksListGetters = typeof setup.getters
export type TasksListActions = typeof setup.actions
export type TasksListMutators = typeof setup.mutators
export interface TasksListStore extends StoreCore<TasksListState>, TasksListGetters, TasksListActions, TasksListMutators {
	state: TasksListState,
	apiService: TasksApi,
	urlParamsService?: UrlParamsService,
}

const tasksSo = createStore<TasksListState>(setup) as TasksListStore
tasksSo.apiService = tasksApi
tasksSo.urlParamsService = buildUrlParams()
export default tasksSo

export type Sort = {
	prop: string,
	direction: "asc" | "desc",
}