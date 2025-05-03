import { Container } from '@chakra-ui/react';
import TopBar from 'components/navigation/TopBar';
import type { FC } from 'react';
import { Outlet } from 'react-router';

const AppLayout: FC = () => {
  return (
    <Container>
      <TopBar />
      <Outlet />
    </Container>
  );
};

export default AppLayout;
