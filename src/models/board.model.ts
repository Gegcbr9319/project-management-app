import { IId } from 'models';

export interface IBoard extends IId {
  title: string;
  description: string;
  owner: string;
  users: string[];
}

export interface IСreateBoardOptions {
  body: Omit<IBoard, '_id'>;
}

export interface IGetBoardByIdOptions {
  boardId: string;
}

export interface IUpdateBoardByIdOptions extends IGetBoardByIdOptions {
  body: Omit<IBoard, '_id'>;
}

export type IDeleteBoardByIdOptions = IGetBoardByIdOptions;

export interface IGetBoardSetByIdsListOptions {
  params: {
    ids: string[];
  };
}
