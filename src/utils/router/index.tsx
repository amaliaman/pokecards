import AppLayout from 'components/AppLayout';
import Home from 'pages/Home';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: 'settings', element: <div>settings</div> },
    ],
  },
]);
