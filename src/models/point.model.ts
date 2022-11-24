import { IGetColumnsSetByParamOptions, IId } from 'models';

export interface IPoint extends IId {
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export type IGetPointsByParamOptions = IGetColumnsSetByParamOptions;

export interface ICreatePointOptions {
  body: {
    title: string;
    taskId: string;
    boardId: string;
    done: boolean;
  };
}

export interface IUpdateSetOfPointsOptions {
  body: {
    _id: string;
    done: boolean;
  };
}

export interface IGetPointsByTaskIdOptions {
  taskId: string;
}

export interface IUpdatePointByIdOptions {
  pointId: string;
  body: {
    title: string;
    done: boolean;
  };
}

export interface IDeletePointByIdOptions {
  pointId: string;
}
