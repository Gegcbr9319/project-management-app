import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { Send, KeyboardArrowLeft } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AppState, useCreateBoardMutation, useUpdateBoardByIdMutation } from 'store';
import styles from './Modal.module.scss';
import { AuthState } from 'models';
import { Loader } from 'components';

export interface ICreateTaskModalProps {
  type: 'create task';
  _id?: never;
  users?: string[];
  owner?: string;
  setCallingForm: (item: boolean) => void;
}

export interface ICreateBoardModalProps {
  type: 'create board';
  _id?: never;
  users?: string[];
  owner?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditTaskModalProps {
  type: 'edit task';
  _id: string;
  users?: string[];
  owner?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditBoardModalProps {
  type: 'edit board';
  _id: string;
  users: string[];
  owner: string;
  setCallingForm: (item: boolean) => void;
}

export type IModalProps =
  | ICreateTaskModalProps
  | ICreateBoardModalProps
  | IEditTaskModalProps
  | IEditBoardModalProps;

interface IFormDataInput {
  title: string;
  description: string;
}

const errorTitleMesage = 'More than 2 letters';

export const Modal: FC<IModalProps> = ({ type, _id, users, owner, setCallingForm }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormDataInput>();

  const { token } = useSelector(({ auth }: AppState): AuthState => auth);

  const [createBoard, createBoardResults] = useCreateBoardMutation();
  const [updateBoard, updateBoardResults] = useUpdateBoardByIdMutation();

  const onSubmit = async ({ title, description }: IFormDataInput) => {
    if (type === 'create board') {
      await createBoard({
        body: {
          title: title,
          description: description?.length === 0 ? '' : description,
          owner: token?.decoded?.id ? token.decoded.id : '',
          users: [],
        },
      });
    } else if (type === 'edit board') {
      await updateBoard({
        boardId: _id,
        body: {
          title: title,
          description: description.length === 0 ? '' : description,
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
