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

/**
 * Custom hook to get responsive values based on the current Chakra UI breakpoint.
 * Returns the current breakpoint and the corresponding configuration.
 *
 * @returns {ResponsiveValues & { currentBreakpoint: Breakpoint }}
 */
const useResponsiveValues = (): ResponsiveValues & {
  currentBreakpoint: Breakpoint;
} => {
  const breakpoints = Object.keys(values) as Breakpoint[];

  const currentBreakpoint = useBreakpoint({
    breakpoints,
  }) as Breakpoint;

  return {
    currentBreakpoint,
    ...values[currentBreakpoint ?? fallbackBreakpoint],
  };
};

export default useResponsiveValues;
