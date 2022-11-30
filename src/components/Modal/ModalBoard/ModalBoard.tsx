import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
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
  setCallingForm: (item: boolean) => void;
}

export interface IEditBoardModalProps {
  type: 'edit board';
  boardId: string;
  owner: string;
  users: string[];
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
      <div className={styles.divForm}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            {...register('title', {
              required: true,
              minLength: 3,
            })}
          />
          {errors?.title && <p> {errorTitleMesage}</p>}
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            {...register('description')}
          />

          <div className={styles.formButtons}>
            <Button variant="outlined" startIcon={<KeyboardArrowLeft />} onClick={resetForm}>
              Back
            </Button>
            <Button variant="outlined" type="submit" startIcon={<Send />}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
