import { AuthState } from 'model/auth';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppState } from 'store';

interface PrivateRouteProps {
  redirectTo?: string;
}

export function PrivateRoute({
  redirectTo = '/signin',
  children,
}: PropsWithChildren<PrivateRouteProps>): JSX.Element {
  const { isAuthenticated } = useSelector(({ auth }: AppState): AuthState => auth);

  if (!isAuthenticated) {
    // redirect to welcome page by default
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}
