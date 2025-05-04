import { HStack, Spacer, useBreakpoint } from '@chakra-ui/react';
import RouterLink from 'components/navigation/links/RouterLink';
import type { FC } from 'react';
import { ColorModeButton } from 'utils/style/color-mode';
import LogoLink from '../links/LogoLink';

const DesktopNav: FC = () => {
  const breakpoint = useBreakpoint({ breakpoints: ['sm'] });

  if (breakpoint === 'base') return null;

  return (
    <HStack gap={4} alignItems="center">
      <LogoLink />
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink to="/about">About</RouterLink>

      <Spacer />

      <ColorModeButton />
    </HStack>
  );
};

export default DesktopNav;
