import { useQuery } from '@tanstack/react-query'

import { getTodoList } from '../../api/todoListApi'
import AddTodoForm from '../AddTodoForm'
import Task from '../Task'
import styles from './index.module.css'

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
    <div className={styles.todolist}>
      <h1 className={styles.todolist__header}>TODO LIST</h1>

      <AddTodoForm />

      <hr className={styles.todolist__divider} />

      <ul className={styles.todolist__content}>
        {todoList.map(({ id, title }) => (
          <Task key={id} id={id} title={title} />
        ))}
      </ul>
    </div>
  )
}
