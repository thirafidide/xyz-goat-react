import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addNewTask } from '../../api/todoListApi'
import styles from './index.module.css'
import Button from '../Button'

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
    <form onSubmit={handleSubmit} className={styles.addtodoform}>
      <label className={styles.addtodoform__inputlabel} htmlFor="add-todo">
        New Task
      </label>

      <div className={styles.addtodoform__inputfield}>
        <input
          type="text"
          id="add-todo"
          value={newTodo}
          onChange={handleChangeInput}
          className={styles['addtodoform__inputfield-input']}
        />

        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}
