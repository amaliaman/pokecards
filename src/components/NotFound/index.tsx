import { AbsoluteCenter, Heading, Text, VStack } from '@chakra-ui/react';
import HomeLink from 'components/navigation/links/HomeLink';
import type { FC } from 'react';

const NotFound: FC = () => {
  return (
    <AbsoluteCenter axis="both">
      <VStack>
        <Text fontSize="xxx-large" fontWeight="bold">
          404
        </Text>
        <Heading as="h1">Page not found</Heading>
        <HomeLink />
      </VStack>
    </AbsoluteCenter>
  );
};

export default NotFound;
