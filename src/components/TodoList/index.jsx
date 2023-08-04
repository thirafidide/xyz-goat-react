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

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>

      {todos.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </div>
  )
}
