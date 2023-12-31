import { renderHook } from '@testing-library/react-hooks/dom'
import { rest } from 'msw'

import useTodoList from '../useTodoList'
import { MOCK_INITIAL_TODO_LIST, server } from '../../test/server'
import { createTestWrapperComponent } from '../../test/wrapper'

test('should start loading todo list on mounted', async () => {
  const wrapper = createTestWrapperComponent()
  const { result } = renderHook(() => useTodoList(), {
    wrapper,
  })

  expect(result.current.isLoading).toBe(true)
  expect(result.current.todoList).toBeFalsy()
})

test('should return todo list after finished fetching', async () => {
  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(() => useTodoList(), {
    wrapper,
  })

  await waitForNextUpdate()

  expect(result.current.isLoading).toBe(false)
  expect(result.current.todoList).toMatchObject(MOCK_INITIAL_TODO_LIST)
})

test('should return error when failed to fetch', async () => {
  // Mock network error like offline/connection failed
  server.use(
    rest.all('http://localhost:3001/tasks', (req, res) => {
      return res.networkError('Network error')
    }),
  )

  // Supress expected network error message
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const wrapper = createTestWrapperComponent()
  const { result, waitForNextUpdate } = renderHook(() => useTodoList(), {
    wrapper,
  })

  await waitForNextUpdate()

  expect(result.current.isLoading).toBe(false)
  expect(result.current.isError).toBe(true)
  expect(result.current.error).toBeInstanceOf(Error)
})
