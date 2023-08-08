import PropTypes from 'prop-types'

import styles from './index.module.css'
import Button, { BUTTON_VARIANT_DELETE } from '../Button'
import useDeleteTodo from '../../hooks/useDeleteTodo'

/**
 * Render individual task/todo item as a list item for TodoList component
 *
 * @param {Object} props The component props
 * @param {number} props.id Id of the task
 * @param {string} props.title Title of the task
 *
 * @returns {JSX.Element} React element
 */
export default function Task(props) {
  const { id, title } = props
  const { deleteTodo, status, error } = useDeleteTodo(id)

  function handleDelete() {
    deleteTodo()
  }

  return (
    <li className={styles.task} data-testid="todo-list-item">
      <div className={styles.task__content}>
        {title}

        <Button
          type="button"
          onClick={handleDelete}
          variant={BUTTON_VARIANT_DELETE}
          disabled={status === 'loading'}
          data-testid="todo-list-item-delete-btn"
        >
          {status === 'loading' ? 'Deleting...' : 'Delete'}
        </Button>
      </div>

      {status === 'error' && (
        <div className={styles.task__errormsg}>
          Failed to delete: {error?.message}
        </div>
      )}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
}
