import { Loader } from '@chakra-ui/react';
import { type JSX, Suspense } from 'react';
/**
 * Higher-order component that wraps the given component with React Suspense,
 * displaying a loader as a fallback while the component is loading.
 *
 * @param Component - The React component to wrap with Suspense.
 * @returns A new component that renders the original component within Suspense.
 */
export const withSuspense =
  (Component: React.ComponentType) => (props?: JSX.IntrinsicAttributes) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
