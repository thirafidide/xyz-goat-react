import { renderHook } from '@testing-library/react-hooks/dom'
import useTodoList from '../useTodoList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MOCK_INITIAL_TODO_LIST } from '../../mocks/server'

function createTestWrapperComponent() {
  const queryClient = new QueryClient()
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return wrapper
}

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
