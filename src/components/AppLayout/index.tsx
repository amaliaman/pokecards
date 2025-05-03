import { Button, Container, HStack } from '@chakra-ui/react';
import { ColorModeButton } from 'components/ui/color-mode';
import type { FC, ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <Container>
      <HStack>
        <Button>Click me</Button>
        <Button variant={'ghost'}>Click me</Button>
        <ColorModeButton />
      </HStack>
      {children}
    </Container>
  );
};

export default AppLayout;
