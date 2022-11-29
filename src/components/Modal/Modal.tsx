import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { Send, KeyboardArrowLeft } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {
  AppState,
  useCreateBoardMutation,
  useCreateColumnMutation,
  useCreateTaskMutation,
  useGetColumnsInBoardQuery,
  useGetTasksInColumnQuery,
  useUpdateBoardByIdMutation,
} from 'store';
import styles from './Modal.module.scss';
import { AuthState } from 'models';
import { Loader } from 'components';

export interface ICreateTaskModalProps {
  type: 'create task';
  _id: string;
  users?: string[];
  owner?: string;
  columnId: string;
  setCallingForm: (item: boolean) => void;
}

export interface ICreateBoardModalProps {
  type: 'create board';
  _id?: never;
  users?: string[];
  owner?: string;
  columnId?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditTaskModalProps {
  type: 'edit task';
  _id: string;
  users?: string[];
  owner?: string;
  columnId?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditBoardModalProps {
  type: 'edit board';
  _id: string;
  users: string[];
  owner: string;
  columnId?: string;
  setCallingForm: (item: boolean) => void;
}

export interface ICreateColumnProps {
  type: 'create column';
  _id: string;
  users?: string[];
  owner?: string;
  columnId?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditColumnProps {
  type: 'edit column';
  _id: string;
  columnId: string;
  users?: string[];
  owner?: string;
  setCallingForm: (item: boolean) => void;
}

export type IModalProps =
  | ICreateTaskModalProps
  | ICreateBoardModalProps
  | IEditTaskModalProps
  | IEditBoardModalProps
  | ICreateColumnProps
  | IEditColumnProps;

interface IFormDataInput {
  title: string;
  description: string;
}

const errorTitleMesage = 'More than 2 letters';

export const Modal: FC<IModalProps> = ({ type, _id, columnId, users, owner, setCallingForm }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormDataInput>();

  const { token } = useSelector(({ auth }: AppState): AuthState => auth);
  const columns = useGetColumnsInBoardQuery({ boardId: _id ? _id : '' });
  const tasks = useGetTasksInColumnQuery({
    boardId: _id ? _id : '',
    columnId: columnId ? columnId : '',
  });

  const [createBoard, createBoardResults] = useCreateBoardMutation();
  const [updateBoard, updateBoardResults] = useUpdateBoardByIdMutation();
  const [createColumn, createColumnResults] = useCreateColumnMutation();
  const [createTask, createTaskResults] = useCreateTaskMutation();

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
        boardId: _id,
        body: {
          title: title,
          description: description,
          owner: owner,
          users: users,
        },
      });
    } else if (type === 'create column') {
      await createColumn({
        boardId: _id,
        body: { title: title, order: columns && columns.data ? columns.data.length : 0 },
      });
    } else if (type === 'create task') {
      await createTask({
        body: {
          title: title,
          description: description,
          users: [],
          userId: token?.decoded?.id ? token.decoded.id : '',
          order: tasks && tasks.data ? tasks.data.length : 0,
        },
        columnId: columnId,
        boardId: _id,
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
          {type !== ('create column' || 'edit column') && (
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              {...register('description')}
            />
          )}

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
