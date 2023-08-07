import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const MOCK_INITIAL_TODO_LIST = [
  { id: 1, title: 'Mock todo item 1' },
  { id: 2, title: 'Mock todo item 2' },
  { id: 3, title: 'Mock todo item 3' },
]

function getTasksFromSession() {
  return JSON.parse(sessionStorage.getItem('tasks'))
}

function setTasksToSession(tasks) {
  sessionStorage.setItem('tasks', JSON.stringify(tasks))
}

const handlers = [
  rest.get('http://localhost:3001/tasks', (req, res, ctx) => {
    let tasks = getTasksFromSession()

    if (!tasks) {
      setTasksToSession(MOCK_INITIAL_TODO_LIST)
      tasks = MOCK_INITIAL_TODO_LIST
    }

    return res(ctx.status(200), ctx.json(tasks))
  }),

  rest.post('http://localhost:3001/tasks', async (req, res, ctx) => {
    const body = await req.json()
    const title = body?.title
    const tasks = getTasksFromSession() ?? []

    let biggestId = 0
    for (const { id } of tasks) {
      biggestId = Math.max(biggestId, id)
    }

    const newTask = { id: biggestId + 1, title }
    const newTasks = tasks.concat([newTask])
    setTasksToSession(newTasks)

    return res(ctx.status(200), ctx.json(newTask))
  }),

  rest.delete('http://localhost:3001/tasks/:id', async (req, res, ctx) => {
    const idToDelete = Number(req.params.id)

    const tasks = getTasksFromSession() ?? []
    const newTasks = tasks.filter(({ id }) => id !== idToDelete)
    setTasksToSession(newTasks)

    return res(ctx.status(200), ctx.json({}))
  }),
]

export const server = setupServer(...handlers)
