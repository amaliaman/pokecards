import { Grid } from '@chakra-ui/react';
import type { FC, JSX } from 'react';

export interface AppGridProps {
  items: JSX.Element[];
}
const AppGrid: FC<AppGridProps> = ({ items }) => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap="4"
      md={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '6' }}
      lg={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
      xl={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
    >
      {...items}
    </Grid>
  );
};

export default AppGrid;
