import { Loader } from '@chakra-ui/react';
import React, { type JSX, Suspense } from 'react';

/**
 * Higher-order component that wraps the given component with React Suspense,
 * displaying a Chakra UI Loader as a fallback while loading.
 *
 * @param Component - The component to wrap with suspense handling.
 * @returns The memoized component wrapped in Suspense with a loader fallback.
 */
export const withSuspense = (Component: React.ComponentType) =>
  React.memo((props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  ));
