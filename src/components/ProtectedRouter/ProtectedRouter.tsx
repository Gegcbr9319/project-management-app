import { ConfirmDeleteModal } from 'components';
import { AuthState, DeleteState } from 'models';
import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppState, removeToken, setTokenTimeout } from 'store';

export function ProtectedRouter({ children }: PropsWithChildren): JSX.Element {
  const isDeleteCallback = Boolean(
    useSelector((state: AppState): DeleteState => state.delete).callback
  );
  const { token } = useSelector(({ auth }: AppState): AuthState => auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (token?.isValid) {
      const tokenTimeout = setTimeout(() => dispatch(removeToken()), token.timeLeft);
      dispatch(setTokenTimeout(tokenTimeout));
    }
  }, [dispatch, location.pathname, token]);

  return (
    <>
      {children}
      {isDeleteCallback && <ConfirmDeleteModal />}
    </>
  );
}
