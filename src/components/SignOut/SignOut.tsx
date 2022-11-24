import { CircularProgress } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeToken } from 'store';

export function SignOut(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.resolve(dispatch(removeToken())).then(() => {
      navigate('/');
    });
  }, []);

  return <CircularProgress />;
}
