import { CircularProgress } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userSignedOut } from 'store/auth/authSlice';

export function SignOut(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.resolve(dispatch(userSignedOut())).then(() => {
      navigate('/');
    });
  }, []);

  return <CircularProgress />;
}
