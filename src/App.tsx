import { Button, HStack } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from 'components/AppLayout';
import { ColorModeButton } from 'components/ui/color-mode';
import { StyleProvider } from 'components/ui/provider';
import Home from 'pages/Home';

const queryClient = new QueryClient();

const App = () => {
  return (
    <StyleProvider enableSystem={false} enableColorScheme>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Home />
        </AppLayout>
      </QueryClientProvider>
    </StyleProvider>
  );
};

export default App;
