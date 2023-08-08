import { renderHook } from '@testing-library/react-hooks/dom'
import { rest } from 'msw'

import useDeleteTodo from '../useDeleteTodo'
import { getTodoList } from '../../api/todoListApi'
import { server } from '../../test/server'
import { createTestWrapperComponent } from '../../test/wrapper'

test('should provide deleteTodo function', async () => {
  const wrapper = createTestWrapperComponent()
  const { result } = renderHook(() => useDeleteTodo(1), {
    wrapper,
  })

  expect(result.current.status).toBe('idle')
  expect(result.current.deleteTodo).toBeInstanceOf(Function)
})

test('should delete todo from the server when called', async () => {
  // populate todo list
  await getTodoList()

  const idToDelete = 1
  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(
    () => useDeleteTodo(idToDelete),
    {
      wrapper,
    },
  )
  result.current.deleteTodo()

  await waitForNextUpdate()
  if (result.current.status === 'loading') {
    await waitForNextUpdate()
  }

  expect(result.current.status).toBe('success')

  const list = await getTodoList()
  for (const task of list) {
    expect(task.id).not.toBe(idToDelete)
  }
})

test('should trigger callback on success', async () => {
  const idToDelete = 2
  const onSuccess = jest.fn()
  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(
    () => useDeleteTodo(idToDelete, { onSuccess }),
    {
      wrapper,
    },
  )

  result.current.deleteTodo()

  await waitForNextUpdate()
  if (result.current.status === 'loading') {
    await waitForNextUpdate()
  }

  expect(result.current.status).toBe('success')
  expect(onSuccess).toBeCalled()
})

test('should return error when failed to fetch', async () => {
  // Mock network error like offline/connection failed
  server.use(
    rest.delete('http://localhost:3001/tasks/:id', (req, res) => {
      return res.networkError('Network error')
    }),
  )

  // Supress expected network error message
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const listBefore = await getTodoList()

  const onError = jest.fn()
  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(
    () => useDeleteTodo(3, { onError }),
    {
      wrapper,
    },
  )

  result.current.deleteTodo()

  await waitForNextUpdate()
  if (result.current.status === 'loading') {
    await waitForNextUpdate()
  }

  expect(result.current.status).toBe('error')
  expect(result.current.error).toBeInstanceOf(Error)
  expect(onError).toBeCalled()

  const listAfter = await getTodoList()
  expect(listAfter).toMatchObject(listBefore)
})
