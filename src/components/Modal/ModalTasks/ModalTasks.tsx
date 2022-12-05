import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  Box,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Send, KeyboardArrowLeft } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {
  AppState,
  useCreateTaskMutation,
  useGetTasksInColumnQuery,
  useGetUsersQuery,
  useUpdateTaskByIdMutation,
} from 'store';
import styles from '../Modal.module.scss';
import { AuthState } from 'models';
import { Loader } from 'components';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 'auto',
      width: 250,
    },
  },
};

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
  type: 'edit task' | 'view task';
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

  const { data } = useGetUsersQuery();

  const [createTask, createTaskResults] = useCreateTaskMutation();
  const [updateTask, updateTaskResults] = useUpdateTaskByIdMutation();

  const [personName, setPersonName] = useState<string[]>(users ? users : []);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const onSubmit = async ({ title, description }: IFormDataInput) => {
    if (type === 'create task') {
      await createTask({
        body: {
          title: title,
          description: description,
          users: personName,
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
          users: personName,
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
    setPersonName([]);
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
            {type === 'view task' && (
              <DialogTitle id="alert-dialog-title" className={styles.formP}>
                View Task
              </DialogTitle>
            )}
            <TextField
              id="standard-basic"
              autoFocus
              label="Title"
              variant="outlined"
              defaultValue={titleEdit}
              disabled={type === 'view task'}
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
              minRows={type === 'view task' ? 5 : 3}
              maxRows={type === 'view task' ? 5 : 3}
              disabled={type === 'view task'}
              defaultValue={descriptionEdit}
              {...register('description')}
            />
            <div>
              <InputLabel id="demo-multiple-chip-label">Users</InputLabel>
              <Select
                className={styles.selected}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                disabled={type === 'view task'}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Users" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {data?.map((index) => (
                  <MenuItem key={index._id} value={index.name}>
                    {index.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={styles.formButtons}>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<KeyboardArrowLeft />}
                onClick={resetForm}
              >
                Close
              </Button>
              {type !== 'view task' && (
                <Button variant="contained" type="submit" startIcon={<Send />}>
                  Send
                </Button>
              )}
            </div>
          </form>
        </Dialog>
      </div>
    </>
  );
};
