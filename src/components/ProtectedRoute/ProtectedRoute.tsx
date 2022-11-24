import { AppState } from 'store';
import { AuthState } from 'models';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectIf: 'authenticated' | 'unauthenticated';
  redirectTo?: string;
}

export function ProtectedRoute({
  redirectIf,
  redirectTo,
  children,
}: PropsWithChildren<ProtectedRouteProps>): JSX.Element {
  const { isAuthenticated } = useSelector(({ auth }: AppState): AuthState => auth);

  const doRedirect =
    (!isAuthenticated && redirectIf === 'unauthenticated') ||
    (isAuthenticated && redirectIf === 'authenticated');

  const redirectTarget = redirectTo || redirectIf === 'unauthenticated' ? '/signin' : '/boards';

  if (doRedirect) {
    return <Navigate to={redirectTarget} />;
  }

  return <>{children}</>;
}
