import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { Send, KeyboardArrowLeft } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {
  AppState,
  useCreateColumnMutation,
  useGetColumnsInBoardQuery,
  useUpdateColumnByIdMutation,
} from 'store';
import styles from '../Modal.module.scss';
import { AuthState } from 'models';
import { Loader } from 'components';

export interface ICreateColumnProps {
  type: 'create column';
  boardId: string;
  columnId?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditColumnProps {
  type: 'edit column';
  boardId: string;
  columnId: string;
  setCallingForm: (item: boolean) => void;
}

interface IFormDataInput {
  title: string;
}

export type IModalColumnsProps = ICreateColumnProps | IEditColumnProps;

const errorTitleMesage = 'More than 2 letters';

export const ModalColumns: FC<IModalColumnsProps> = ({
  type,
  boardId,
  columnId,

  setCallingForm,
}) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormDataInput>();

  const { token } = useSelector(({ auth }: AppState): AuthState => auth);
  const columns = useGetColumnsInBoardQuery({ boardId });

  const [createColumn, createColumnResults] = useCreateColumnMutation();
  const [updateColumn, updateColumnResults] = useUpdateColumnByIdMutation();

  const onSubmit = async ({ title }: IFormDataInput) => {
    if (type === 'create column') {
      await createColumn({
        boardId: boardId,
        body: {
          title: title,
          order: columns && columns.data ? columns.data.length : 0,
        },
      });
    } else if (type === 'edit column') {
      await updateColumn({
        boardId: boardId,
        columnId: columnId,
        body: {
          title: title,
          order:
            columns && columns.data
              ? columns.data.filter((column) => column._id === columnId)[0].order
              : 0,
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
      {(createColumnResults.isLoading || updateColumnResults.isLoading) && <Loader />}
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
