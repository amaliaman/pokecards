import { HStack, Spacer } from '@chakra-ui/react';
import RouterLink from 'components/navigation/links/RouterLink';
import type { FC } from 'react';
import { ColorModeButton } from 'utils/style/color-mode';
import LogoLink from '../links/LogoLink';

const DesktopNav: FC = () => {
  return (
    <HStack hideBelow="sm" gap={4} alignItems="flex-start">
      <LogoLink />
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink to="/about">About</RouterLink>

      <Spacer />

      <ColorModeButton />
    </HStack>
  );
};

export default DesktopNav;
