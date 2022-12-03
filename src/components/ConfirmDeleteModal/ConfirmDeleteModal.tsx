import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setDeleteCallback } from 'store';
import { DeleteState } from 'models';
import styles from './ConfirmDeleteModal.module.scss';

export const ConfirmDeleteModal = () => {
  const { callback } = useSelector((state: AppState): DeleteState => state.delete);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setDeleteCallback(null));
  };

  const handleDelete = () => {
    callback && callback();
    dispatch(setDeleteCallback(null));
  };

  return (
    <>
      <Dialog
        className={styles.content}
        open={Boolean(callback)}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be canceled later.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">Confirm deletion?</DialogContentText>
        </DialogContent>
        <DialogActions className={styles.actions}>
          <Button onClick={handleCancel} color="inherit" variant="contained" size="small" autoFocus>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            startIcon={<Delete />}
            size="small"
            color="warning"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
