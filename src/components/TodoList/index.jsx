import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { addNewTask, getTodoList } from '../../api/todoListApi'
import './index.css'

/**
 * TODO List
 */
export default function TodoList() {
  const {
    isLoading,
    isError,
    data: todoList,
    error,
  } = useQuery({ queryKey: ['todos'], queryFn: getTodoList })

  function handleDelete(task) {
    console.log(task)
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>

      <AddTodoForm />

      {todoList.map((task) => {
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
