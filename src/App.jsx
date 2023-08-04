import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoList from './components/TodoList'
import './App.css'

const queryClient = new QueryClient()

export default function App() {
  return (
    <div className="App">
      <div className="App-container">
        <QueryClientProvider client={queryClient}>
          <TodoList />
        </QueryClientProvider>
      </div>
    </div>
  )
}
