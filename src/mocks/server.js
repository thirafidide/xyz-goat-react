import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const MOCK_INITIAL_TODO_LIST = [
  { id: 1, title: 'Mock todo item 1' },
  { id: 2, title: 'Mock todo item 2' },
  { id: 3, title: 'Mock todo item 3' },
]

const handlers = [
  rest.get('http://localhost:3001/tasks', (req, res, ctx) => {
    let tasks = sessionStorage.getItem('tasks')

    if (!tasks) {
      sessionStorage.setItem('tasks', MOCK_INITIAL_TODO_LIST)
      tasks = MOCK_INITIAL_TODO_LIST
    }

    return res(ctx.status(200), ctx.json(tasks))
  }),

  rest.post('http://localhost:3001/tasks', async (req, res, ctx) => {
    const title = await req.json()?.title
    const tasks = sessionStorage.getItem('tasks') ?? []

    let biggestId = 0
    for (const { id } of tasks) {
      biggestId = Math.max(biggestId, id)
    }

    const newTask = { id: biggestId + 1, title }
    const newTasks = tasks.concat([newTask])
    sessionStorage.setItem('tasks', newTasks)

    return res(ctx.status(200), ctx.json(newTask))
  }),

  rest.delete('http://localhost:3001/tasks/:id', async (req, res, ctx) => {
    const idToDelete = req.params.id

    const tasks = sessionStorage.getItem('tasks') ?? []
    const newTasks = tasks.filter(({ id }) => id !== idToDelete)
    sessionStorage.setItem('tasks', newTasks)

    return res(ctx.status(200), ctx.json({}))
  }),
]

export const server = setupServer(...handlers)
