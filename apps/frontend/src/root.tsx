import React, { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import RouterSuspense from './components/router-suspense.component';
import RequireUnauthorized from './components/require-unauthorized.component';
import 'reflect-metadata';

const LayoutArea: React.LazyExoticComponent<React.FC> = React.lazy(
  async () => import('./areas/authorized-area.component')
);
const UnauthorizedArea: React.LazyExoticComponent<React.FC> = React.lazy(
  async () => import('./areas/unauthorized-area.component')
);
const SignIn: React.LazyExoticComponent<React.FC> = React.lazy(
  async () => import('./pages/LoginPage')
);
const ArticlesPage: React.LazyExoticComponent<React.FC> = React.lazy(
  async () => import('./pages/ArticlesPage')
);

const Root: FC = () => {
  const routes = useRoutes([
    {
      element: (
        <RequireUnauthorized>
          <UnauthorizedArea />
        </RequireUnauthorized>
      ),
      children: [{ path: 'login', element: <SignIn /> }],
    },
    {
      path: '/',
      element: <LayoutArea />,
      children: [{ path: '', element: <ArticlesPage /> }],
    },
  ]);

  return <Suspense fallback={<RouterSuspense />}>{routes}</Suspense>;
};

export default Root;
