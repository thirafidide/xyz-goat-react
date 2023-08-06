import { useState } from 'react'

import styles from './index.module.css'
import Button from '../Button'
import useAddTodo from '../../hooks/useAddTodo'

export default function AddTodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const addTodo = useAddTodo({
    onSuccess: () => {
      // Clear the input field so user can easil add more items
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
    addTodo(newTodo)
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
