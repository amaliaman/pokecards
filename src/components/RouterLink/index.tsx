import { Button } from '@chakra-ui/react';
import type { FC } from 'react';
import { Link, type LinkProps } from 'react-router';

const RouterLink: FC<LinkProps> = (props) => (
  <Button asChild variant="plain" _hover={{ opacity: 0.8 }}>
    <Link {...props} />
  </Button>
);

export default RouterLink;
