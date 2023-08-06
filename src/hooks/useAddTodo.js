import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewTask } from '../api/todoListApi'
import { TODO_LIST_QUERY_KEY } from './useTodoList'

/**
 * Hooks that handle adding new todo item to the list on the server.
 *
 * @param {Object} param0 callbacks when the api returned
 * @param {() => void} param0.onSuccess callbacks when the new todo added successfully
 * @param {(error: Error) => void} param0.onError callbacks when the new todo failed to be added to the server
 *
 * @returns {(title: string) => void} Function to add new todo item to the list on the server
 */
export default function useAddTodo({ onSuccess, onError }) {
  const queryClient = useQueryClient()
  const { mutate: mutateAddTodo } = useMutation({
    mutationFn: addNewTask,
    onSuccess: () => {
      // refetch the list to show the new task
      queryClient.invalidateQueries({ queryKey: TODO_LIST_QUERY_KEY })
      onSuccess()
    },
    onError,
  })

  return mutateAddTodo
}
