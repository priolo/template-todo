import { buildTasksApiMock } from '@/api/tasks.mock'
import { buildExternalParamsMock } from '@/plugins/urlParams/url.mock.'
import { createStore } from '@priolo/jon'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TASK_STATUS } from '../../types/Task'
import { setup, TasksListState, TasksListStore } from './list'



describe('TasksListStore', () => {

	let tasksSo: TasksListStore

	beforeEach(() => {
		tasksSo = createStore<TasksListState>(setup) as TasksListStore
		tasksSo.api = buildTasksApiMock()
		const externalParams = buildExternalParamsMock()
		tasksSo.getExternalValue = externalParams.getUrlParamMock
		tasksSo.setExternalValue = externalParams.setUrlParamMock
	})

	afterEach(() => {
	})

	it('fetch should load tasks from repo and set state', async () => {
		const tasks = (await tasksSo.api.index()).tasks
		await tasksSo.fetch()
		expect(tasksSo.state.all).toHaveLength(3)
		expect(tasksSo.state.all).toEqual(tasks)
	})

	it('getTasksView should filter tasks by text', async () => {
		const tasks = (await tasksSo.api.index()).tasks
		tasksSo.setAll(tasks)
		tasksSo.setTextFilter('Task 1')

		const view = tasksSo.getTasksView()
		expect(view).toHaveLength(1)
		expect(view[0].title).toBe('Task 1')
	})

	it('getTasksView should sort tasks', async () => {
		const tasks = (await tasksSo.api.index()).tasks
		tasksSo.setAll(tasks)

		// Sort DESC
		tasksSo.setSortBy({ prop: 'title', direction: 'desc' })
		const sortedDesc = tasksSo.getTasksView()
		expect(sortedDesc[0].title).toBe('Task 3')
		expect(sortedDesc[2].title).toBe('Task 1')

		// Sort ASC
		tasksSo.setSortBy({ prop: 'title', direction: 'asc' })
		const sortedAsc = tasksSo.getTasksView()
		expect(sortedAsc[0].title).toBe('Task 1')
		expect(sortedAsc[2].title).toBe('Task 3')
	})

	it('toggleSelect should toggle selection', () => {
		tasksSo.toggleSelect('1')
		expect(tasksSo.getSelected()).toEqual(['1'])

		tasksSo.toggleSelect('2')
		expect(tasksSo.getSelected()).toEqual(['1', '2'])

		tasksSo.toggleSelect('1')
		expect(tasksSo.getSelected()).toEqual(['2'])
	})

	it('updateStatus should update status and call repo.save', async () => {
		tasksSo.setAll([{ id: '1', title: 't1', status: TASK_STATUS.PENDING }])
		await tasksSo.updateStatus({ id: '1', status: TASK_STATUS.IN_PROGRESS })
		expect(tasksSo.state.all.find(t => t.id === '1')?.status).toBe(TASK_STATUS.IN_PROGRESS)
	})

})
