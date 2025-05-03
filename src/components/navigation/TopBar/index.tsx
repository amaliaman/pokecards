import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import DesktopNav from '../DesktopNav';
import MobileNav from '../MobileNav';

const TopBar: FC = () => {
  return (
    <Box mb={[4, 4, 6]}>
      <DesktopNav />
      <MobileNav />
    </Box>
  );
};

export default TopBar;
