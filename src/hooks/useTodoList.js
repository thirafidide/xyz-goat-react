import { useQuery } from '@tanstack/react-query'
import { getTodoList } from '../api/todoListApi'

export const TODO_LIST_QUERY_KEY = ['todo-list']

/**
 * @typedef {Object} UseTodoListReturn
 *
 * @property {boolean} isLoading
 * @property {boolean} isError
 * @property {Error?} error
 * @property {import('../api/todoListApi').Task[]?} todoList
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
