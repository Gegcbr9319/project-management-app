import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store';
import { userSignedOut } from 'store/auth/authSlice';

export function ProtectedRouter({ children }: PropsWithChildren): JSX.Element {
  const { auth } = useSelector((state: AppState): AppState => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = auth.isAuthenticated ? auth.token : undefined;
    if (token) {
      token.timeout = setTimeout(() => dispatch(userSignedOut()), token.timeLeft);
    }
  }, []);

  return <>{children}</>;
}
