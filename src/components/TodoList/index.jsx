import AddTodoForm from '../AddTodoForm'
import Task from '../Task'
import useTodoList from '../../hooks/useTodoList'
import styles from './index.module.css'

/**
 * Todo List
 *
 * Main component that shows todo list and form to add new one
 *
 * @returns {JSX.Element} React element
 */
export default function TodoList() {
  const { isLoading, isError, todoList, error } = useTodoList()

  const hasList = todoList !== null && todoList !== undefined
  const isEmptyList = hasList && todoList.length <= 0

  return (
    <div className={styles.todolist}>
      <h1 className={styles.todolist__header}>TODO LIST</h1>

      {hasList && (
        <>
          <AddTodoForm />
          <hr className={styles.todolist__divider} />
        </>
      )}

      {isLoading && <span>Loading...</span>}
      {isError && (
        <span>
          Failed to refresh the list:{' '}
          {error?.message || 'Failed to connect to the server'}
        </span>
      )}

      {isEmptyList && (
        <div className={styles.todolist__content}>No todo item left! 🎉</div>
      )}

      {!isEmptyList && (
        <ul className={styles.todolist__content}>
          {todoList?.map(({ id, title }) => (
            <Task key={id} id={id} title={title} />
          ))}
        </ul>
      )}
    </div>
  )
}
