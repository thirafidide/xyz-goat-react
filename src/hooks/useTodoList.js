import { useQuery } from '@tanstack/react-query'
import { getTodoList } from '../api/todoListApi'

export const TODO_LIST_QUERY_KEY = ['todo-list']

/**
 * @typedef {Object} UseTodoListReturn
 *
 * @property {boolean} isLoading true when the api calls currently loading
 * @property {boolean} isError true when the api calls returned with error
 * @property {Error?} error Error of the last api call. Only have value when isError is true
 * @property {import('../api/todoListApi').Task[]?} todoList Todo list from the server
 */

/**
 * Hooks that handle fetching the todo list
 *
 * @returns {UseTodoListReturn} Objects that contains fetch status, error, and the todo list itself
 */
export default function useTodoList() {
  const {
    isLoading,
    isError,
    data: todoList,
    error,
  } = useQuery({ queryKey: TODO_LIST_QUERY_KEY, queryFn: getTodoList })

  return { isLoading, isError, todoList, error }
}
