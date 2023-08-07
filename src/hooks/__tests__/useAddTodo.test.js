import { act, renderHook } from '@testing-library/react-hooks/dom'
import { rest } from 'msw'

import useAddTodo from '../useAddTodo'
import { getTodoList } from '../../api/todoListApi'
import { server } from '../../mocks/server'
import { createTestWrapperComponent } from '../../mocks/wrapper'

test('should provide addTodo function', async () => {
  const wrapper = createTestWrapperComponent()
  const { result } = renderHook(() => useAddTodo(), {
    wrapper,
  })

  expect(result.current.status).toBe('idle')
  expect(result.current.addTodo).toBeInstanceOf(Function)
})

test('should save todo to the server when called', async () => {
  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(() => useAddTodo(), {
    wrapper,
  })

  const newTodoTitle = 'New Todo'
  result.current.addTodo(newTodoTitle)

  await waitForNextUpdate()
  expect(result.current.status).toBe('loading')

  await waitForNextUpdate()
  expect(result.current.status).toBe('success')

  const list = await getTodoList()
  expect(list).toMatchObject([{ id: 1, title: newTodoTitle }])
})

test('should trigger callback on success', async () => {
  const onSuccess = jest.fn()
  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(
    () => useAddTodo({ onSuccess }),
    {
      wrapper,
    },
  )

  const newTodoTitle = 'New Todo 2'
  result.current.addTodo(newTodoTitle)

  await waitForNextUpdate()
  await waitForNextUpdate()
  expect(result.current.status).toBe('success')
  expect(onSuccess).toBeCalled()
})

test('should return error when failed to fetch', async () => {
  // Mock network error like offline/connection failed
  server.use(
    rest.post('http://localhost:3001/tasks', (req, res) => {
      return res.networkError('Network error')
    }),
  )

  // Supress expected network error message
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const listBefore = await getTodoList()

  const onError = jest.fn()
  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(
    () => useAddTodo({ onError }),
    {
      wrapper,
    },
  )

  const newTodoTitle = 'Network Error'
  result.current.addTodo(newTodoTitle)

  await waitForNextUpdate()
  await waitForNextUpdate()
  expect(result.current.status).toBe('error')
  expect(result.current.error).toBeInstanceOf(Error)
  expect(onError).toBeCalled()

  const listAfter = await getTodoList()
  expect(listAfter).toMatchObject(listBefore)
})

test('should reject empty todo', async () => {
  const wrapper = createTestWrapperComponent()
  const { result } = renderHook(() => useAddTodo(), {
    wrapper,
  })

  const newTodoTitle = ''
  act(() => result.current.addTodo(newTodoTitle))

  expect(result.current.status).toBe('error')
  expect(result.current.error?.message).toBe('Task title cannot be empty')
})
