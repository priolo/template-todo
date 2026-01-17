import { buildTasksApiMock } from '@/api/tasks.mock'
import { createStore } from '@priolo/jon'
import { beforeEach, describe, expect, it } from 'vitest'
import { TASK_STATUS } from '../../types/Task'
import { setup, TaskState, TaskStore } from './detail'


describe('TaskDetailStore', () => {
	
	let taskSo: TaskStore

	beforeEach(() => {
		taskSo = createStore<TaskState>(setup) as TaskStore
		taskSo.api = buildTasksApiMock()
	})

	it('fetch should load a task and set it as selected', async () => {
		await taskSo.fetch('1')
		
		expect(taskSo.state.selected).not.toBeNull()
		expect(taskSo.state.selected!.id).toBe('1')
		expect(taskSo.state.selected!.title).toBe('Task 1')
	})

	it('new should create a empty task and set it as selected', () => {
		taskSo.new()

		expect(taskSo.state.selected).not.toBeNull()
		expect(taskSo.state.selected!.id).toBeUndefined()
		expect(taskSo.state.selected!.title).toBe("")
		expect(taskSo.state.selected!.description).toBe("")
		expect(taskSo.state.selected!.status).toBe(TASK_STATUS.PENDING)
	})

	it('save should call api.save and update selected task', async () => {
		// Scenario: Modifica task esistente
		await taskSo.fetch('1') // Carichiamo un task
		expect(taskSo.state.selected).not.toBeNull()

		// Modifichiamo il task selezionato nello store
		taskSo.setSelected({ ...taskSo.state.selected!, title: 'Updated Title' })
		
		await taskSo.save()

		expect(taskSo.state.selected!.title).toBe('Updated Title')
	})

	it('save should handle new task creation', async () => {
		// Scenario: Nuovo task
		taskSo.new()
		expect(taskSo.state.selected!.id).toBeUndefined()

		taskSo.setSelected({ ...taskSo.state.selected!, title: 'New Task' })

		await taskSo.save()

		// Il mock aggiunge un id 'new-id'
		expect(taskSo.state.selected!.id).toBe('4')
		expect(taskSo.state.selected!.title).toBe('New Task')
	})

})
