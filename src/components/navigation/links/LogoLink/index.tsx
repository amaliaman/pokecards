import { HStack, Image, Text } from '@chakra-ui/react';
import logo from 'assets/icon-512.png';
import type { FC } from 'react';
import { Link, type LinkProps } from 'react-router';
import { APP_NAME } from 'utils/constants';

const LogoLink: FC<Partial<LinkProps>> = (props) => {
  return (
    <Link to="/" {...props}>
      <HStack alignItems="center">
        <Image src={logo} boxSize={9} alt={APP_NAME} />

        <Text fontSize="2xl" fontWeight="bold">
          {APP_NAME}
        </Text>
      </HStack>
    </Link>
  );
};

export default LogoLink;
