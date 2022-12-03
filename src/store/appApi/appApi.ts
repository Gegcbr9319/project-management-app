import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { AppState, setError } from 'store';
import {
  TokenDto,
  UserDto,
  NewUserDto,
  UserAuthDto,
  IBoard,
  IСreateBoardOptions,
  IGetBoardByIdOptions,
  IUpdateBoardByIdOptions,
  IDeleteBoardByIdOptions,
  IGetBoardSetByIdsListOptions,
  IColumn,
  IGetColumnsInBoardOptions,
  IСreateColumnOptions,
  IGetColumnByIdOptions,
  IUpdateColumnByIdOptions,
  IDeleteColumnByIdOptions,
  IGetColumnsSetByParamOptions,
  IUpdateColumnsSetOptions,
  ICreateColumnsSetOptions,
  ITask,
  IGetTasksInColumnOptions,
  ICreateTaskOptions,
  IGetTaskByIdOptions,
  IUpdateTaskByIdOptions,
  IDeleteTaskByIdOptions,
  IGetTasksSetParamOptions,
  IUpdateTasksSetOptions,
  IGetTaskSetByBoardIdOptions,
  IFile,
  IGetFilesBygetFilesByParamOptions,
  IUploadFileOptions,
  IGetFilesByBoardIdOptions,
  IDeleteFileByIdOptions,
  IPoint,
  IGetPointsByParamOptions,
  ICreatePointOptions,
  IUpdateSetOfPointsOptions,
  IGetPointsByTaskIdOptions,
  IUpdatePointByIdOptions,
  IDeletePointByIdOptions,
  User,
  ErrorResponse,
} from 'models';

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE || 'https://rss-pm-app.onrender.com',
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (['signUp', 'signIn'].includes(endpoint)) {
      return headers;
    }

    const { token } = (getState() as AppState).auth;

    if (token?.isValid) {
      headers.set('authorization', `Bearer ${token.encoded}`);
    }

    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const error = result.error as FetchBaseQueryError | undefined;

  if (error) {
    const errorPayload: ErrorResponse = Number.isInteger(error.status)
      ? (error.data as ErrorResponse)
      : {
          statusCode: error.status,
          message: (error as { error: string }).error,
        };

    api.dispatch(setError(errorPayload));

    // implicit catch by returning 'normal' data shape
    return { data: undefined };
  }

  return result;
};

export const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['User', 'Boards', 'Board', 'Columns', 'Column', 'Tasks', 'Task'],
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (build) => ({
    /**
     * Auth endpoints
     */
    // Create new user
    signUp: build.mutation<UserDto, NewUserDto>({
      query: (newUserData) => ({
        url: 'auth/signup',
        method: 'POST',
        body: newUserData,
      }),
    }),
    // Authenticate and receive JWT token
    signIn: build.mutation<TokenDto, UserAuthDto>({
      query: (userAuthData) => ({
        url: 'auth/signin',
        method: 'POST',
        body: userAuthData,
      }),
    }),

    /**
     * Users endpoints
     */
    // Get all users
    getUsers: build.query<UserDto[], void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'User' as const, id: _id })), 'User']
          : ['User'],
    }),
    // Find user by id
    getUser: build.query<UserDto, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result ? [{ type: 'User' as const, id: result._id }, 'User'] : ['User'],
    }),
    // Update user
    updateUser: build.mutation<UserDto, User>({
      query: (newUserData) => {
        const { _id: userId, name, login, password } = newUserData;
        return {
          url: `users/${userId}`,
          method: 'PUT',
          body: {
            name,
            login,
            password,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'User' as const, id: arg._id }],
    }),
    // Delete user
    deleteUser: build.mutation<UserDto, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User' as const, id: arg }],
    }),

    /**
     * Boards endpoints
     */
    //Get all Boards on server
    getAllBoards: build.query<IBoard[], void>({
      query: () => ({
        url: 'boards',
        method: 'GET',
      }),
    }),
    // Create Board
    createBoard: build.mutation<IBoard, IСreateBoardOptions>({
      query: (options) => ({
        url: 'boards',
        method: 'POST',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    // Find Board
    getBoardById: build.query<IBoard, IGetBoardByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId,
        method: 'GET',
      }),
      providesTags: (_result, _err, arg) => [{ type: 'Board', id: arg.boardId }],
    }),
    // Update Board
    updateBoardById: build.mutation<IBoard, IUpdateBoardByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId,
        method: 'PUT',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }, 'Board'],
    }),
    // Delete Board
    deleteBoardById: build.mutation<IBoard, IDeleteBoardByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }, 'Board'],
    }),
    // Get Boards by list of boardId
    getBoardsSetByIdsList: build.query<IBoard[], IGetBoardSetByIdsListOptions>({
      query: (options) => ({
        url: 'boardsSet',
        method: 'GET',
        params: options.params,
      }),
    }),
    // Get Boards where user is owner or one of invited
    getBoardsSetByUserId: build.query<IBoard[], string>({
      query: (userId) => ({
        url: `boardsSet/${userId}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Boards' as const, _id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),

    /**
     * Columns endpoints
     */
    // Get Columns in board
    getColumnsInBoard: build.query<IColumn[], IGetColumnsInBoardOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Columns' as const, _id })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),
    // Create Column in board
    createColumn: build.mutation<IColumn, IСreateColumnOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns',
        method: 'POST',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    // Find Column
    getColumnById: build.query<IColumn, IGetColumnByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId,
        method: 'GET',
      }),
    }),
    // Update Column
    updateColumnById: build.mutation<IColumn, IUpdateColumnByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId,
        method: 'PUT',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    // Delete Column
    deleteColumnById: build.mutation<IColumn, IDeleteColumnByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    // Get Columns by list of columnId or in Boards where user is owner or one of invited
    getColumnsSetByIdsListOrUserId: build.query<IColumn[], IGetColumnsSetByParamOptions>({
      query: (options) => ({
        url: 'columnSet',
        method: 'GET',
        params: options.params,
      }),
    }),
    // Change oreder of list of columns
    updateColumnsSet: build.mutation<IColumn[], IUpdateColumnsSetOptions>({
      query: (options) => ({
        url: 'columnSet',
        method: 'PATCH',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    // Create set of Columns
    createColumnsSet: build.mutation<IColumn[], ICreateColumnsSetOptions>({
      query: (options) => ({
        url: 'columnSet',
        method: 'POST',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    /**
     * Tasks endpoints
     */
    // Get Tasks in columns
    getTasksInColumn: build.query<ITask[], IGetTasksInColumnOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    // Create Task in column
    createTask: build.mutation<ITask, ICreateTaskOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks',
        method: 'POST',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    // Find Task
    getTaskById: build.query<ITask, IGetTaskByIdOptions>({
      query: (options) => ({
        url:
          'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks/' + options.taskId,
        method: 'GET',
      }),
    }),
    // Update Task
    updateTaskById: build.mutation<ITask, IUpdateTaskByIdOptions>({
      query: (options) => ({
        url:
          'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks/' + options.taskId,
        method: 'PUT',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    // Delete Task
    deleteTaskById: build.mutation<ITask, IDeleteTaskByIdOptions>({
      query: (options) => ({
        url:
          'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks/' + options.taskId,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    // Get Tasks by list of taskId or in Boards where user is owner or one of invited, or by search request
    getTasksSet: build.query<ITask[], IGetTasksSetParamOptions>({
      query: (options) => ({
        url: 'tasksSet',
        method: 'GET',
        params: options.params,
      }),
    }),
    // Change oreder and column of list of tasks
    updateTasksSet: build.mutation<ITask[], IUpdateTasksSetOptions>({
      query: (options) => ({
        url: 'tasksSet',
        method: 'PATCH',
        body: options.body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    // Get Tasks in selected Board
    getTaskSetByBoardId: build.query<ITask[], IGetTaskSetByBoardIdOptions>({
      query: (options) => ({
        url: 'tasksSet/' + options.boardId,
        method: 'GET',
      }),
    }),

    /**
     * Files endpoints
     */
    // Get Files by list of taskId or in Boards where user is owner or one of invited, or by TaskId
    getFilesByParam: build.query<IFile[], IGetFilesBygetFilesByParamOptions>({
      query: (options) => ({
        url: 'file',
        method: 'GET',
        params: options.params,
      }),
    }),
    // Upload file to deployUrl/files/
    uploadFile: build.mutation<IFile[], IUploadFileOptions>({
      query: (options) => {
        const body = new FormData();
        body.append('boardId', options.body.boardId);
        body.append('taskId', options.body.taskId);
        body.append('file', options.body.fileList[0]);
        return {
          url: 'file',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body,
        };
      },
    }),
    // Get files by BoardId
    getFilesByBoardId: build.query<IFile[], IGetFilesByBoardIdOptions>({
      query: (options) => ({
        url: 'file/' + options.boardId,
        method: 'GET',
      }),
    }),
    // Delete File by Id
    deleteFileById: build.mutation<IFile, IDeleteFileByIdOptions>({
      query: (options) => ({
        url: 'file/' + options.fileId,
        method: 'DELETE',
      }),
    }),

    /**
     * Points endpoints
     */
    // Get Points by list of pointId or in Boards where user is owner or one of invited
    getPointsByParam: build.query<IPoint[], IGetPointsByParamOptions>({
      query: (options) => ({
        url: 'points',
        method: 'GET',
        params: options.params,
      }),
    }),
    // Create a new point
    createPoint: build.mutation<IPoint, ICreatePointOptions>({
      query: (options) => ({
        url: 'points',
        method: 'POST',
        body: options.body,
      }),
    }),
    // Change done filed in set of points
    updateSetOfPoints: build.mutation<IPoint, IUpdateSetOfPointsOptions>({
      query: (options) => ({
        url: 'points',
        method: 'PATCH',
        body: options.body,
      }),
    }),
    // Get Points by TaskId
    getPointsByTaskId: build.query<IPoint[], IGetPointsByTaskIdOptions>({
      query: (options) => ({
        url: 'points/' + options.taskId,
        method: 'GET',
      }),
    }),
    // Change title and done
    updatePointById: build.mutation<IPoint, IUpdatePointByIdOptions>({
      query: (options) => ({
        url: 'points/' + options.pointId,
        method: 'PATCH',
        body: options.body,
      }),
    }),
    // Delete Point by Id
    deletePointById: build.mutation<IPoint, IDeletePointByIdOptions>({
      query: (options) => ({
        url: 'points/' + options.pointId,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  /* Auth Hooks */
  useSignInMutation,
  useSignUpMutation,
  /* Users Hooks */
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  /* Boards Hooks */
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardByIdMutation,
  useDeleteBoardByIdMutation,
  useGetBoardsSetByIdsListQuery,
  useGetBoardsSetByUserIdQuery,
  /* Columns Hooks */
  useGetColumnsInBoardQuery,
  useCreateColumnMutation,
  useGetColumnByIdQuery,
  useUpdateColumnByIdMutation,
  useDeleteColumnByIdMutation,
  useGetColumnsSetByIdsListOrUserIdQuery,
  useUpdateColumnsSetMutation,
  useCreateColumnsSetMutation,
  /* Tasks Hooks */
  useGetTasksInColumnQuery,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
  useGetTasksSetQuery,
  useUpdateTasksSetMutation,
  useGetTaskSetByBoardIdQuery,
  /* Files Hooks */
  useGetFilesByParamQuery,
  useUploadFileMutation,
  useGetFilesByBoardIdQuery,
  useDeleteFileByIdMutation,
  /* Points Hooks */
  useGetPointsByParamQuery,
  useCreatePointMutation,
  useUpdateSetOfPointsMutation,
  useGetPointsByTaskIdQuery,
  useUpdatePointByIdMutation,
  useDeletePointByIdMutation,
} = appApi;
