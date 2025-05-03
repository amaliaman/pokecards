import AppLayout from 'components/AppLayout';
import ErrorAlert from 'components/ErrorAlert';
import { createBrowserRouter } from 'react-router';
import { HomeLazy, NotFoundLazy } from './lazy';
import { withSuspense } from './utils';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    errorElement: <ErrorAlert />,
    children: [
      { index: true, element: withSuspense(HomeLazy)({}) },
      { path: 'settings', element: <div>settings</div> },
      { path: '*', element: withSuspense(NotFoundLazy)({}) },
    ],
  },
]);
