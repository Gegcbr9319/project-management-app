import { IGetBoardByIdOptions, IId } from 'models';

export interface IFile extends IId {
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface IGetFilesBygetFilesByParamOptions {
  params:
    | {
        ids: string[];
      }
    | {
        userId: string;
      }
    | {
        taskId: string;
      };
}

export interface IUploadFileOptions {
  body: {
    boardId: string;
    taskId: string;
    fileList: FileList;
  };
}

export type IGetFilesByBoardIdOptions = IGetBoardByIdOptions;

export interface IDeleteFileByIdOptions {
  fileId: string;
}
