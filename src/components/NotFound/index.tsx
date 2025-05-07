import HomeLink from '@/components/navigation/links/HomeLink';
import { AbsoluteCenter, Heading, Text } from '@chakra-ui/react';
import type { FC } from 'react';

const NotFound: FC = () => {
  return (
    <AbsoluteCenter axis="both" flexDir="column" gapY={8}>
      <Text fontSize="xxx-large" fontWeight="bold" textAlign="center">
        :(
      </Text>
      <Heading as="h1">Page not found</Heading>
      <HomeLink />
    </AbsoluteCenter>
  );
};

export default NotFound;
