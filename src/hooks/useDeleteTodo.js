import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../api/todoListApi'
import { TODO_LIST_QUERY_KEY } from './useTodoList'

/**
 * Hooks that handle deleting a todo item from the list on the server.
 *
 * @param {number} id ID of the todo item to be deleted
 * @param {Object?} param1 callbacks when the api returned
 * @param {() => void} param1.onSuccess callbacks when the todo deleted successfully
 * @param {(error: Error) => void} param1.onError callbacks when the todo failed to be deleted from the server
 *
 * @returns {(title: string) => void} Function to trigger the deletion of the todo item from the list on the server
 */
export default function useDeleteTodo(id, { onSuccess, onError } = {}) {
  const queryClient = useQueryClient()
  const { mutate: mutateDeleteTodo } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // refetch the list
      queryClient.invalidateQueries({ queryKey: TODO_LIST_QUERY_KEY })
      onSuccess?.()
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  return () => mutateDeleteTodo(id)
}
