import RouterLink from '@/components/navigation/links/RouterLink';
import { ColorModeButton } from '@/utils/style/color-mode';
import {
  Drawer,
  HStack,
  IconButton,
  Portal,
  Spacer,
  VStack,
  useBreakpoint,
} from '@chakra-ui/react';
import { Menu, X } from 'lucide-react';
import { type FC, useState } from 'react';
import LogoLink from '../links/LogoLink';

const MobileNav: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const breakpoint = useBreakpoint({ breakpoints: ['sm'] });

  if (breakpoint !== 'base') return null;

  return (
    <HStack>
      <LogoLink />

      <Spacer />

      <ColorModeButton />

      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="top"
      >
        <Drawer.Backdrop />

        <Drawer.Trigger asChild hideFrom="sm">
          <IconButton variant="subtle" size="sm">
            <Menu />
          </IconButton>
        </Drawer.Trigger>

        <Portal>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger asChild top={4} right={4}>
                <IconButton variant="subtle" size="sm">
                  <X />
                </IconButton>
              </Drawer.CloseTrigger>

              <Drawer.Header>
                <Drawer.Title>
                  <LogoLink onClick={handleClose} />
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.Body>
                <VStack alignItems="start">
                  <RouterLink onClick={handleClose} to="/settings">
                    Settings
                  </RouterLink>
                  <RouterLink onClick={handleClose} to="/about">
                    About
                  </RouterLink>
                </VStack>
              </Drawer.Body>

              <Drawer.Footer />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </HStack>
  );
};

export default MobileNav;
