import RouterLink from '@/components/navigation/links/RouterLink';
import useResponsiveValues from '@/hooks/helpers/useResponsiveValues';
import { ColorModeButton } from '@/utils/style/color-mode';
import { HStack, Spacer } from '@chakra-ui/react';
import type { FC } from 'react';
import LogoLink from '../links/LogoLink';

const DesktopNav: FC = () => {
  const { currentBreakpoint } = useResponsiveValues();
  if (currentBreakpoint === 'base') return null;

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
