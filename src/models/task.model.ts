import { IGetBoardByIdOptions, IGetColumnByIdOptions, IId } from 'models';

export interface ITaskBase {
  title: string;
  order: number;
  description: string;
  users: string[];
}

export interface INewTask extends ITaskBase {
  userId: string;
}

export interface IEditTask extends INewTask {
  columnId: string;
}

export interface ITask extends IId, IEditTask {
  boardId: string;
}

export type IGetTasksInColumnOptions = IGetColumnByIdOptions;

export interface ICreateTaskOptions extends IGetColumnByIdOptions {
  body: INewTask;
}

export interface IGetTaskByIdOptions extends IGetTasksInColumnOptions {
  taskId: string;
}

export interface IUpdateTaskByIdOptions extends IGetTaskByIdOptions {
  body: IEditTask;
}

export type IDeleteTaskByIdOptions = IGetTaskByIdOptions;

export interface IGetTasksSetParamOptions {
  params:
    | {
        ids: string[];
      }
    | {
        userId: string;
      }
    | {
        search: string;
      };
}

export interface IUpdateTasksSetOptions {
  body: {
    _id: string;
    order: number;
    columnId: string;
  }[];
}

export type IGetTaskSetByBoardIdOptions = IGetBoardByIdOptions;
