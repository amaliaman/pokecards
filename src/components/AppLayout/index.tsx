import { Container } from '@chakra-ui/react';
import TopBar from 'components/navigation/TopBar';
import type { FC } from 'react';
import { Outlet } from 'react-router';

const AppLayout: FC = () => {
  return (
    <Container h="100dvh" py={[4, 4, 6]}>
      <TopBar />
      <Outlet />
    </Container>
  );
};

export default AppLayout;
