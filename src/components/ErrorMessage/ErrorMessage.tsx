import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, clearError } from 'store';
import { ErrorState } from 'models';
import { Alert, Snackbar } from '@mui/material';

export function ErrorMessage(): JSX.Element {
  const { error } = useSelector(({ error }: AppState): ErrorState => error);
  const dispatch = useDispatch();

  const [show, setShow] = useState(!!error);

  useEffect(() => {
    setShow(!!error);
  }, [error]);

  const handleInitClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setShow(false);
  };

  const handleExited = (): void => {
    dispatch(clearError());
  };

  const alertStyle = useMemo((): 'info' | 'success' | 'warning' | 'error' => {
    if (!error) {
      return 'info';
    }

    const { statusCode } = error;

    // information status codes
    if (statusCode >= 100 && statusCode <= 199) {
      return 'info';
    }

    // success status codes
    if (statusCode >= 200 && statusCode <= 299) {
      return 'success';
    }

    // redirect status codes
    if (statusCode >= 300 && statusCode <= 399) {
      return 'warning';
    }

    // clien- and server-side error codes
    if (statusCode >= 400 && statusCode <= 599) {
      return 'error';
    }

    return 'info';
  }, [error]);

  const messageText = useMemo((): string => {
    return `Error ${error?.statusCode}: ${error?.message}`;
  }, [error]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={show}
      autoHideDuration={5000}
      onClose={handleInitClose}
      TransitionProps={{
        onExited: handleExited,
      }}
    >
      <Alert
        onClose={handleInitClose}
        variant="filled"
        severity={alertStyle}
        sx={{ width: '100%' }}
      >
        {messageText}
      </Alert>
    </Snackbar>
  );
}
