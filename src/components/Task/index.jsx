import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'

import { deleteTask } from '../../api/todoListApi'
import styles from './index.module.css'
import Button, { BUTTON_VARIANT_DELETE } from '../Button'

export default function Task(props) {
  const { id, title } = props

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

  return (
    <li className={styles.task}>
      {title}{' '}
      <Button
        type="button"
        onClick={() => handleDelete(id)}
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
