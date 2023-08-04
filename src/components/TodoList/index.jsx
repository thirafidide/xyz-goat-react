import { useEffect, useState } from 'react'

import { getTodoList } from '../../api/todoListApi'
import './index.css'

/**
 * TODO List
 */
export default function TodoList() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodoList().then((todoList) => setTodos(todoList))
  }, [])

  function handleDelete(task) {
    console.log(task)
  }

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>

      <AddTodoForm />

      {todos.map((task) => {
        const { id, title } = task

        return (
          <li key={id}>
            {title}{' '}
            <button type="button" onClick={() => handleDelete(task)}>
              Delete
            </button>
          </li>
        )
      })}
    </div>
  )
}

function AddTodoForm() {
  const [newTodo, setNewTodo] = useState('')

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
    console.log(newTodo)
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
