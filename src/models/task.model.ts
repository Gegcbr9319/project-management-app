import { IGetBoardByIdOptions, IGetColumnByIdOptions, IId } from 'models';

export interface ITaskBase {
  title: string;
  order: number;
  //boardId: string;
  description: string;
  //columnId: string;
  users: string[];
}

export interface INewTask extends Omit<Omit<ITaskBase, 'boardId'>, 'columnId'> {
  userId: string;
}

export interface IEditTask extends Omit<ITaskBase, 'boardId'> {
  userId: string;
  columnId: string;
}

export type ITask = INewTask & IId;

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
