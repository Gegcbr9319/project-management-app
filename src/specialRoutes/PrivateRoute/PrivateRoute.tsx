import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ISpecialRoutes } from 'specialRoutes';
import { IStore } from 'store';

export const PrivateRoute: FC<ISpecialRoutes> = ({ children, isPublic }) => {
  const { token } = useSelector((store: IStore) => store);

  if (!token.isValid && !isPublic) {
    return <Navigate to="/main" replace />;
  }

  if (token.isValid && isPublic) {
    return <Navigate to="/boards" replace />;
  }

  return children;
};
