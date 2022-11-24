/**
 * Base models
 */
export interface IId {
  _id: string;
}

export interface IUser extends IId {
  name: string;
  login: string;
}

export interface IBoard extends IId {
  title: string;
  description: string;
  owner: string;
  users: string[];
}

export interface IColumn extends IId {
  title: string;
  order: number;
  boardId: string;
}

export interface ITaskBase {
  title: string;
  order: number;
  boardId: string;
  description: string;
  columnId: string;
  users: string[];
}

export interface INewTask extends ITaskBase {
  userId: string;
}

export type ITask = INewTask & IId;

export interface IFile extends IId {
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface IPoint extends IId {
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

/**
 * Responses and RequestOptions models
 */

export interface IErrorResponse {
  statusCode: number;
  message: string;
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

export type IGetTasksInColumnOptions = IGetColumnByIdOptions;

export interface ICreateTaskOptions extends IGetColumnByIdOptions {
  body: INewTask;
}

export interface IGetTaskByIdOptions extends IGetTasksInColumnOptions {
  taskId: string;
}

export interface IUpdateTaskByIdOptions extends ICreateTaskOptions, IGetTaskByIdOptions {}

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
