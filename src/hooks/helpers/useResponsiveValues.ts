import { useBreakpoint } from '@chakra-ui/react';

type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ResponsiveValues {
  gridColumns: number;
}

const values: Record<Breakpoint, ResponsiveValues> = {
  base: { gridColumns: 2 },
  sm: { gridColumns: 2 },
  md: { gridColumns: 3 },
  lg: { gridColumns: 4 },
  xl: { gridColumns: 5 },
  '2xl': { gridColumns: 6 },
};

const fallbackBreakpoint: Breakpoint = 'base';

const useResponsiveValues = (): ResponsiveValues => {
  const breakpoints = Object.keys(values) as Breakpoint[];

  const currentBreakpoint = useBreakpoint({
    breakpoints,
  }) as Breakpoint;

  return {
    ...values[currentBreakpoint ?? fallbackBreakpoint],
  };
};

export default useResponsiveValues;
