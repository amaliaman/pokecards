import { router } from '@/utils/router';
import { StyleProvider } from '@/utils/style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <StyleProvider enableSystem={false} enableColorScheme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StyleProvider>
  );
};

export default App;
