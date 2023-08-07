import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Create wrapper component that provide minimal contexts needed by app code to be working on testing environment
 *
 * @returns {import('react').FunctionComponent} Wrapper component as a react component
 */
export function createTestWrapperComponent() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable react query retry behaviour so we can test fail case faster
        retry: false,
      },
    },
  })

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return wrapper
}
