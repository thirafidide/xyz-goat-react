import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewTask } from '../api/todoListApi'
import { TODO_LIST_QUERY_KEY } from './useTodoList'
import { useState } from 'react'

/**
 * @typedef {Object} UseAddTodoReturn
 *
 * @property {(title: string) => void} addTodo Function to add new todo item to the list on the server
 * @property {'error' | 'idle' | 'loading' | 'success'} status Status of the last `addTodo` calls to the server
 * @property {Error?} error Error if the last addTodo failed to save the new todo. Only have value if `status === 'error'`
 */

/**
 * Hooks that handle validate and add new todo item to the list on the server.
 *
 * @param {Object} param0 callbacks when the api returned
 * @param {() => void} param0.onSuccess callbacks when the new todo added successfully
 * @param {(error: Error) => void} param0.onError callbacks when the new todo failed to be added to the server
 *
 * @returns {UseAddTodoReturn} Function to add new todo item to the list on the server
 */
export default function useAddTodo({ onSuccess, onError }) {
  const [error, setError] = useState(null)

  const queryClient = useQueryClient()
  const {
    status,
    error: queryError,
    mutate: mutateAddTodo,
  } = useMutation({
    mutationFn: addNewTask,
    onSuccess: () => {
      // refetch the list to show the new task
      queryClient.invalidateQueries({ queryKey: TODO_LIST_QUERY_KEY })
      onSuccess()
    },
    onError,
  })

  function addTodo(title) {
    if (!title) {
      setError(new Error('Task title cannot be empty'))
      return
    }

    setError(null)
    mutateAddTodo(title)
  }

  return {
    addTodo,
    status: error ? 'error' : status,
    error: error || queryError,
  }
}
