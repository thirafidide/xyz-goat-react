import { useQuery } from '@tanstack/react-query'

import { getTodoList } from '../../api/todoListApi'
import AddTodoForm from '../AddTodoForm'
import './index.css'
import Task from '../Task'

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
        <Task key={id} id={id} title={title} />
      ))}
    </div>
  )
}
