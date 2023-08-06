import PropTypes from 'prop-types'

import styles from './index.module.css'
import Button, { BUTTON_VARIANT_DELETE } from '../Button'
import useDeleteTodo from '../../hooks/useDeleteTodo'

export default function Task(props) {
  const { id, title } = props
  const deleteTodo = useDeleteTodo(id)

  function handleDelete() {
    deleteTodo()
  }

  return (
    <li className={styles.task}>
      {title}{' '}
      <Button
        type="button"
        onClick={handleDelete}
        variant={BUTTON_VARIANT_DELETE}
      >
        Delete
      </Button>
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
}
