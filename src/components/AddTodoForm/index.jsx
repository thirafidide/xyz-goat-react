import { useState } from 'react'

import styles from './index.module.css'
import Button from '../Button'
import useAddTodo from '../../hooks/useAddTodo'

export default function AddTodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const { addTodo, status, error } = useAddTodo({
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
          disabled={status === 'loading'}
        />

        <Button
          type="submit"
          disabled={status === 'loading'}
          data-testid="addtodoform-submit-btn"
        >
          {status === 'loading' ? 'Adding...' : 'Add'}
        </Button>
      </div>

      {status === 'error' && (
        <div
          className={styles.addtodoform__errormsg}
          data-testid="addtodoform-error-msg"
        >
          {error?.message}
        </div>
      )}
    </form>
  )
}
