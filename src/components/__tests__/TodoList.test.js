import { render, screen, waitForElementToBeRemoved } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import TodoList from '../TodoList'

test('loads and displays add new form', async () => {
  render(<TodoList />)

  await screen.findByText('New Task')

  expect(screen.getByLabelText('New Task')).toBeInTheDocument()
  expect(screen.getByTestId('addtodoform-submit-btn')).toBeInTheDocument()
})

test('loads and displays todo list', async () => {
  render(<TodoList />)

  await screen.findByRole('list')

  expect(screen.getAllByTestId('todo-list-item').length).toBeGreaterThan(0)
})

test('add new todo and display it in the list', async () => {
  render(<TodoList />)

  const listBefore = await screen.findAllByTestId('todo-list-item')

  const newTodo = 'New Todo item'
  const input = screen.getByLabelText('New Task')
  const submitButton = screen.getByTestId('addtodoform-submit-btn')

  userEvent.type(input, newTodo)
  userEvent.click(submitButton)

  await screen.findByText(newTodo)

  expect(screen.getByText(newTodo)).toBeInTheDocument()
  expect(screen.getAllByTestId('todo-list-item').length).toBe(
    listBefore.length + 1,
  )
})

test('Delete a todo and remove it from the list', async () => {
  render(<TodoList />)

  const listBefore = await screen.findAllByTestId('todo-list-item')

  const deleteBtn = screen.getAllByTestId('todo-list-item-delete-btn')[0]
  userEvent.click(deleteBtn)

  await waitForElementToBeRemoved(deleteBtn)

  expect(deleteBtn).not.toBeInTheDocument()
  expect(screen.getAllByTestId('todo-list-item').length).toBe(
    listBefore.length - 1,
  )
})

test('Prevent empty new todo submission and show validation error', async () => {
  render(<TodoList />)

  const listBefore = await screen.findAllByTestId('todo-list-item')

  const input = screen.getByLabelText('New Task')
  const submitButton = screen.getByTestId('addtodoform-submit-btn')

  userEvent.type(input, '')
  userEvent.click(submitButton)

  await screen.findByTestId('addtodoform-error-msg')

  expect(screen.getByTestId('addtodoform-error-msg')).toBeInTheDocument()
  expect(screen.getAllByTestId('todo-list-item').length).toBe(listBefore.length)
})
