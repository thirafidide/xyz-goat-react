import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { deleteTask, getTodoList } from '../../api/todoListApi'
import AddTodoForm from '../AddTodoForm'
import './index.css'

/**
 * TODO List
 */
export default function TodoList() {
  const {
    isLoading,
    isError,
    data: todoList,
    error,
  } = useQuery({ queryKey: ['todos'], queryFn: getTodoList })

  const queryClient = useQueryClient()
  const { mutate: mutateDeleteTodo } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // refetch the list
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  /**
   * @param {number} id ID of the task to be deleted
   */
  function handleDelete(id) {
    mutateDeleteTodo(id)
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>

      <AddTodoForm />

      {todoList.map(({ id, title }) => (
        <li key={id}>
          {title}{' '}
          <button type="button" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </div>
  )
}
