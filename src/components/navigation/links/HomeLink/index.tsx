import { Button } from '@chakra-ui/react';
import { LuHouse } from 'react-icons/lu';
import { NavLink } from 'react-router';

const HomeLink = () => {
  return (
    <Button asChild size="sm">
      <NavLink to="/">
        <LuHouse />
        Go Home
      </NavLink>
    </Button>
  );
};

export default HomeLink;
