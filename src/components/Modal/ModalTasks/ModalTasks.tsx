import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogTitle } from '@mui/material';
import { Send, KeyboardArrowLeft } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {
  AppState,
  useCreateTaskMutation,
  useGetTasksInColumnQuery,
  useUpdateTaskByIdMutation,
} from 'store';
import styles from '../Modal.module.scss';
import { AuthState } from 'models';
import { Loader } from 'components';

export interface ICreateTaskModalProps {
  type: 'create task';
  boardId: string;
  users?: string[];
  owner?: string;
  columnId: string;
  taskId?: string;
  titleEdit?: string;
  descriptionEdit?: string;
  setCallingForm: (item: boolean) => void;
}

export interface IEditTaskModalProps {
  type: 'edit task';
  boardId: string;
  users?: string[];
  owner?: string;
  columnId: string;
  taskId: string;
  titleEdit: string;
  descriptionEdit: string;
  setCallingForm: (item: boolean) => void;
}

interface IFormDataInput {
  title: string;
  description: string;
}

export type IModalTasksProps = ICreateTaskModalProps | IEditTaskModalProps;

const errorTitleMesage = 'More than 2 letters';

export const ModalTasks: FC<IModalTasksProps> = ({
  type,
  boardId,
  users,
  owner,
  columnId,
  taskId,
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

  const { token } = useSelector(({ auth }: AppState): AuthState => auth);

  const tasks = useGetTasksInColumnQuery({
    boardId,
    columnId,
  });

  const [createTask, createTaskResults] = useCreateTaskMutation();
  const [updateTask, updateTaskResults] = useUpdateTaskByIdMutation();

  const onSubmit = async ({ title, description }: IFormDataInput) => {
    if (type === 'create task') {
      await createTask({
        body: {
          title: title,
          description: description,
          users: [],
          userId: token?.decoded?.id ? token.decoded.id : '',
          order: tasks && tasks.data ? tasks.data.length : 0,
        },
        columnId: columnId,
        boardId: boardId,
      });
    } else if (type === 'edit task') {
      await updateTask({
        body: {
          title: title,
          description: description,
          users: [],
          userId: token?.decoded?.id ? token.decoded.id : '',
          order:
            tasks && tasks.data ? tasks.data.filter((tasks) => tasks._id === taskId)[0].order : 0,
          columnId: columnId ? columnId : '',
        },
        taskId: taskId ? taskId : '',
        columnId: columnId ? columnId : '',
        boardId: boardId,
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
      {(createTaskResults.isLoading || updateTaskResults.isLoading) && <Loader />}
      <div>
        <Dialog
          className={styles.divForm}
          open={Boolean(type)}
          onClose={resetForm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {type === 'create task' && (
              <DialogTitle id="alert-dialog-title" className={styles.formP}>
                Create new Task
              </DialogTitle>
            )}
            {type === 'edit task' && (
              <DialogTitle id="alert-dialog-title" className={styles.formP}>
                Edit Task
              </DialogTitle>
            )}
            <TextField
              id="standard-basic"
              autoFocus
              label="Title"
              variant="outlined"
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
