import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'

import { deleteTask } from '../../api/todoListApi'

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
    <li>
      {title}{' '}
      <button type="button" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
}
