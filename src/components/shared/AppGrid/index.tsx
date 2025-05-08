import { Grid } from '@chakra-ui/react';
import type { FC } from 'react';
import type { AppGridProps } from './types';

const AppGrid: FC<AppGridProps> = ({ items }) => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap="4"
      sm={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '6' }}
      md={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
      lg={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
      xl={{ gridTemplateColumns: 'repeat(6, 1fr)' }}
    >
      {...items}
    </Grid>
  );
};

export default AppGrid;
