import PropTypes from 'prop-types'

import styles from './index.module.css'
import Button, { BUTTON_VARIANT_DELETE } from '../Button'
import useDeleteTodo from '../../hooks/useDeleteTodo'

export default function Task(props) {
  const { id, title } = props
  const { deleteTodo, status, error } = useDeleteTodo(id)

  function handleDelete() {
    deleteTodo()
  }

  return (
    <li className={styles.task}>
      <div className={styles.task__content}>
        {title}

        <Button
          type="button"
          onClick={handleDelete}
          variant={BUTTON_VARIANT_DELETE}
          disabled={status === 'loading'}
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
