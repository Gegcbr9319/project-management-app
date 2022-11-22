import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ISpecialRoutes } from 'specialRoutes';
import { IStore } from 'store';

export const PrivateRoute: FC<ISpecialRoutes> = ({ children }) => {
  const { token } = useSelector((store: IStore) => store);

  if (!token.isValid) {
    return <Navigate to="/main" replace />;
  }

  return children;
};
