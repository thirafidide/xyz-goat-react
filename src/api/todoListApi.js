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

/**
 * Add new task to the database
 *
 * @param {string} taskTitle Title for the task to be added to the list
 *
 * @returns {Promise<number>} id of new task
 */
export async function addNewTask(taskTitle) {
  const response = await fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: taskTitle }),
  })

  const { id } = await response.json()
  return id
}

/**
 * Delete a task from the database
 *
 * @param {number} id ID of the task to be deleted from the list
 *
 * @returns {Promise<void>}
 */
export async function deleteTask(id) {
  await fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'DELETE',
  })
}
