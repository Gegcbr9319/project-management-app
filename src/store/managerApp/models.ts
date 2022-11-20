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

export interface ITask extends IColumn {
  description: string;
  columnId: string;
  userId: number;
  users: string[];
}

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

export type ISingUpResponse = IUser;

export interface ISingInResponse {
  token: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
}

export interface ISingInBody {
  login: string;
  password: string;
}

export interface ISignUpOptions {
  body: ISingUpBody;
}

export interface ISingUpBody extends ISingInBody {
  name: string;
}

export interface ISignInOptions {
  body: ISingUpBody;
}

// export interface IAuth {
//   token: string;
// }

// export interface ISignInOptions {
//   body: ISingUpBody;
// }
