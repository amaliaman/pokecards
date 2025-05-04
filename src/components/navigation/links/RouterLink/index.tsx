import { Button } from '@chakra-ui/react';
import type { FC } from 'react';
import { NavLink, type LinkProps } from 'react-router';

const RouterLink: FC<LinkProps> = (props) => (
  <Button asChild variant="plain" size="sm" _hover={{ opacity: 0.8 }}>
    <NavLink
      style={({ isActive }) =>
        isActive ? { textDecoration: 'underline' } : {}
      }
      {...props}
    />
  </Button>
);

export default RouterLink;
