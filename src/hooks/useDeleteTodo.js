import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../api/todoListApi'
import { TODO_LIST_QUERY_KEY } from './useTodoList'

/**
 * @typedef {Object} UseDeleteTodoReturn
 *
 * @property {() => void} deleteTodo Function to delete todo item from the list on the server
 * @property {'error' | 'idle' | 'loading' | 'success'} status Status of the last `deleteTodo` calls to the server
 * @property {Error?} error Error if the last deleteTodo failed to delete the todo. Only have value if `status === 'error'`
 */

/**
 * Hooks that handle deleting a todo item from the list on the server.
 *
 * @param {number} id ID of the todo item to be deleted
 * @param {Object?} options Options to set callbacks when the api returned
 * @param {() => void} options.onSuccess callbacks when the todo deleted successfully
 * @param {(error: Error) => void} options.onError callbacks when the todo failed to be deleted from the server
 *
 * @returns {UseDeleteTodoReturn} Function to trigger the deletion of the todo item from the list on the server
 */
export default function useDeleteTodo(id, { onSuccess, onError } = {}) {
  const queryClient = useQueryClient()
  const {
    mutate: mutateDeleteTodo,
    status,
    error,
  } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // refetch the list
      queryClient.invalidateQueries({ queryKey: TODO_LIST_QUERY_KEY })
      onSuccess?.()
    },
    onError,
  })

  return { deleteTodo: () => mutateDeleteTodo(id), status, error }
}
