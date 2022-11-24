import { IGetBoardByIdOptions, IId } from 'models';

export interface IColumn extends IId {
  title: string;
  order: number;
  boardId: string;
}

export type IGetColumnsInBoardOptions = IGetBoardByIdOptions;

export interface IСreateColumnOptions extends IGetColumnsInBoardOptions {
  body: {
    title: string;
    order: number;
  };
}

export interface IGetColumnByIdOptions extends IGetBoardByIdOptions {
  columnId: string;
}

export interface IUpdateColumnByIdOptions extends IСreateColumnOptions, IGetColumnByIdOptions {}

export type IDeleteColumnByIdOptions = IGetColumnByIdOptions;

export interface IGetColumnsSetByParamOptions {
  params:
    | {
        ids: string[];
      }
    | {
        userId: string;
      };
}

export interface IUpdateColumnsSetOptions {
  body: {
    _id: string;
    order: number;
  }[];
}

export interface ICreateColumnsSetOptions {
  body: {
    title: string;
    order: number;
    boardId: string;
  }[];
}
