import AppLayout from 'components/AppLayout';
import ErrorAlert from 'components/ErrorAlert';
import NotFound from 'components/NotFound';
import Home from 'pages/Home';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    errorElement: <ErrorAlert />,
    children: [
      { index: true, Component: Home },
      { path: 'settings', element: <div>settings</div> },
      { path: '*', Component: NotFound },
    ],
  },
]);
