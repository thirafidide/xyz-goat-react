/**
 * @typedef {object} Task
 * @property {number} id
 * @property {string} title
 */

/**
 * Fetch list of tasks from the server
 *
 * @returns {Promise<Task[]>} list of tasks
 */
export async function getTodoList() {
  const response = await fetch('http://localhost:3001/tasks', { method: 'GET' })

  return response.json()
}
