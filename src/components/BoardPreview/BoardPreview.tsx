import React, { FC, useState } from 'react';
import { Button } from '@mui/material';
import { Delete, Update } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteBoardByIdMutation } from 'store';
import { Loader, Modal } from 'components';
import styles from './BoardPreview.module.scss';

interface IBoardPreview {
  title: string;
  description: string;
  _id: string;
  users: string[];
  owner: string;
}

export const BoardPreview: FC<IBoardPreview> = ({ title, description, _id, users, owner }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [callingForm, setCallingForm] = useState(false);
  const [deleteBoard, { isLoading }] = useDeleteBoardByIdMutation();

  const buttonClickHandler = () => {
    navigate(location.pathname + '/' + _id);
  };

  const buttonEditHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCallingForm(true);
  };

  const buttonDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await deleteBoard({ boardId: _id });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.button} onClick={buttonClickHandler}>
        <h2 className={styles.h2}> {title}</h2>
        <h3 className={styles.h3}> {description}</h3>
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            startIcon={<Update />}
            onClick={buttonEditHandler}
            size="small"
            color="info"
            className={styles.buttonsButton}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            startIcon={<Delete />}
            onClick={buttonDeleteHandler}
            disabled={isLoading}
            size="small"
            color="warning"
            className={styles.buttonsButton}
          >
            Delete
          </Button>
        </div>
      </div>
      {callingForm && (
        <Modal
          type="edit board"
          setCallingForm={setCallingForm}
          _id={_id}
          users={users}
          owner={owner}
        />
      )}
    </>
  );
};
