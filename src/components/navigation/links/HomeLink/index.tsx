import { Button } from '@chakra-ui/react';
import { House } from 'lucide-react';
import { NavLink } from 'react-router';

const HomeLink = () => {
  return (
    <Button asChild size="sm">
      <NavLink to="/">
        <House />
        Go Home
      </NavLink>
    </Button>
  );
};

export default HomeLink;
