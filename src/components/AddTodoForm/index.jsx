import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addNewTask } from '../../api/todoListApi'

export default function AddTodoForm() {
  const [newTodo, setNewTodo] = useState('')

  const queryClient = useQueryClient()
  const { mutate: mutateAddTodo } = useMutation({
    mutationFn: addNewTask,
    onSuccess: () => {
      // refetch the list to show the new task
      queryClient.invalidateQueries({ queryKey: ['todos'] })

      // clear the form
      setNewTodo('')
    },
  })

  /**
   * @param {React.FormEvent<HTMLInputElement>} event
   */
  function handleChangeInput(event) {
    setNewTodo(event.target.value)
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  function handleSubmit(event) {
    event.preventDefault()
    mutateAddTodo(newTodo)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="add-todo">New Tasks</label>
      <input
        type="text"
        name="add-todo"
        value={newTodo}
        onChange={handleChangeInput}
      />

      <button type="submit">Add</button>
    </form>
  )
}
