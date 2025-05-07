import { lazy } from 'react';

// lazy load pages
export const HomeLazy = lazy(() => import('@/pages/Home'));
export const NotFoundLazy = lazy(() => import('@/components/NotFound'));
