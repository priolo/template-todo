import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Task } from "@/types/Task"



function index(opt?: CallOptions): Promise<{ tasks: Task[] }> {
	return ajax.get(`tasks`, opt)
}

async function get(id: string, opt?: CallOptions): Promise<{ task: Task | null }> {
	if (!id) throw new Error("ID is required")
	return ajax.get(`tasks/${id}`, opt)
}

async function save(task: Task, opt?: CallOptions): Promise<{ task: Task }> {
	if (!task) throw new Error("Task is required")
	if ( task.id ) {
		return ajax.put(`tasks/${task.id}`, { task }, opt)
	}
	return ajax.post(`tasks`, { task }, opt)
}

async function bulkDelete(taskIds: string[], opt?: CallOptions): Promise<{ confirm: boolean }> {
	return ajax.delete(`tasks`, { taskIds }, opt)
}


const tasksApi = {
	index,
	get,
	save,
	bulkDelete
}

export default tasksApi

export type TasksApi = typeof tasksApi