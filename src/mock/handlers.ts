import { Task } from '@/types/Task'
import { http, HttpResponse } from 'msw'
import { getTasks, saveTasks } from './repository'



export const handlers = [

	// INDEX
	http.get('/api/tasks', async ({ params, request }) => {
		return HttpResponse.json({
			tasks: getTasks()
		})
	}),

	// GET 
	http.get('/api/tasks/:id', async ({ params, request }) => {
		const { id } = params
		const tasks = getTasks()
		const task = tasks.find((t) => t.id === id)
		return HttpResponse.json({
			task
		})
	}),

	// POST /api/tasks
	http.post('/api/tasks', async ({ request }) => {
		const data = await request.json() as { task: Task }

		const newTask: Task = {
			id: crypto.randomUUID(),
			...data.task,
			createdAt: new Date().toISOString(),
		}
		const tasks = getTasks()
		tasks.push(newTask)
		saveTasks(tasks)

		return HttpResponse.json({ task: newTask })
	}),

	// PUT /api/tasks/:id
	http.put('/api/tasks/:id', async ({ params, request }) => {
		const { id } = params
		const data = await request.json() as { task: Task }

		const tasks = getTasks()
		const taskIndex = tasks.findIndex((t) => t.id === id)

		if (taskIndex === -1) return new HttpResponse(null, { status: 404 })

		const updatedTask: Task = {
			...tasks[taskIndex],
			...data.task,
		}
		tasks[taskIndex] = updatedTask
		saveTasks(tasks)

		return HttpResponse.json(updatedTask)
	}),

	// DELETE /api/tasks
	http.delete('/api/tasks', async ({ request }) => {
		const data = await request.json() as { taskIds: string[] }
		const taskIds = data.taskIds

		let tasks = getTasks()
		tasks = tasks.filter(t => !taskIds.includes(t.id))
		saveTasks(tasks)

		return HttpResponse.json({ confirm: true })
	}),
]
