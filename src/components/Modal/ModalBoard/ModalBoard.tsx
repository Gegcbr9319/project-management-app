import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogTitle } from '@mui/material';
import { Send, KeyboardArrowLeft } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AppState, useCreateBoardMutation, useUpdateBoardByIdMutation } from 'store';
import styles from '../Modal.module.scss';
import { AuthState } from 'models';
import { Loader } from 'components';

export interface ICreateBoardModalProps {
  type: 'create board';
  boardId?: never;
  owner?: never;
  users?: never;
  titleEdit?: string;
  descriptionEdit?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditBoardModalProps {
  type: 'edit board';
  boardId: string;
  owner: string;
  users: string[];
  titleEdit: string;
  descriptionEdit: string;
  setCallingForm: (item: boolean) => void;
}

interface IFormDataInput {
  title: string;
  description: string;
}

export type IModalBoardProps = ICreateBoardModalProps | IEditBoardModalProps;

const errorTitleMesage = 'More than 2 letters';

export const ModalBoard: FC<IModalBoardProps> = ({
  type,
  boardId,
  owner,
  users,
  titleEdit,
  descriptionEdit,
  setCallingForm,
}) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormDataInput>();

  const [createBoard, createBoardResults] = useCreateBoardMutation();
  const [updateBoard, updateBoardResults] = useUpdateBoardByIdMutation();

  const { token } = useSelector(({ auth }: AppState): AuthState => auth);

  const onSubmit = async ({ title, description }: IFormDataInput) => {
    if (type === 'create board') {
      await createBoard({
        body: {
          title: title,
          description: description,
          owner: token?.decoded?.id ? token.decoded.id : '',
          users: [],
        },
      });
    } else if (type === 'edit board') {
      await updateBoard({
        boardId: boardId,
        body: {
          title: title,
          description: description,
          owner: owner,
          users: users,
        },
      });
    }
    setCallingForm(false);
  };

  const resetForm = () => {
    setCallingForm(false);
    reset();
  };

  return (
    <>
      {(createBoardResults.isLoading || updateBoardResults.isLoading) && <Loader />}
      <div>
        <Dialog
          className={styles.divForm}
          open={Boolean(type)}
          onClose={resetForm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {type === 'create board' && (
              <DialogTitle id="alert-dialog-title" className={styles.formP}>
                Create new Board
              </DialogTitle>
            )}
            {type === 'edit board' && (
              <DialogTitle id="alert-dialog-title" className={styles.formP}>
                Edit Board
              </DialogTitle>
            )}
            <TextField
              id="standard-basic"
              label="Title"
              variant="outlined"
              autoFocus
              defaultValue={titleEdit}
              {...register('title', {
                required: true,
                minLength: 3,
              })}
            />
            {errors?.title && <p> {errorTitleMesage}</p>}
            <TextField
              id="standard-basic"
              label="Description"
              variant="outlined"
              multiline={true}
              minRows={3}
              maxRows={3}
              defaultValue={descriptionEdit}
              {...register('description')}
            />

            <div className={styles.formButtons}>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<KeyboardArrowLeft />}
                onClick={resetForm}
              >
                Close
              </Button>
              <Button variant="contained" type="submit" startIcon={<Send />}>
                Send
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </>
  );
};
