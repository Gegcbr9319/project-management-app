import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAuth,
  ISignInOptions,
  ISingInResponse,
  ISignUpOptions,
  ISingUpResponse,
  IUser,
  IGetUserByIdOptions,
  IUpdateUserByIdOptions,
  IDeleteUserByIdOptions,
  IBoard,
  IСreateBoardOptions,
  IGetBoardByIdOptions,
  IUpdateBoardByIdOptions,
  IDeleteBoardByIdOptions,
  IGetBoardSetByIdsListOptions,
  IGetBoardsSetByUserIdOptions,
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
} from './models';

export const managerAppApi = createApi({
  reducerPath: 'managerAppApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rss-pm-app.onrender.com/',
  }),
  endpoints: (build) => ({
    /**
     * Auth endpoints
     */
    // Create new User
    signUp: build.mutation<ISingUpResponse, ISignUpOptions>({
      query: (options) => ({
        url: 'auth/signup',
        method: 'POST',
        body: options.body,
      }),
    }),
    // Get token
    signIn: build.mutation<ISingInResponse, ISignInOptions>({
      query: (options) => ({
        url: 'auth/signin',
        method: 'POST',
        body: options.body,
      }),
    }),

    /**
     * Users endpoinst
     */
    // Get all Users on server
    getAllUsers: build.query<IUser[], IAuth>({
      query: (options) => ({
        url: 'users',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Find User
    getUserById: build.query<IUser, IGetUserByIdOptions>({
      query: (options) => ({
        url: 'users/' + options.userId,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Update User
    updateUserById: build.mutation<IUser, IUpdateUserByIdOptions>({
      query: (options) => ({
        url: 'users/' + options.userId,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Delete User
    deleteUserById: build.mutation<IUser, IDeleteUserByIdOptions>({
      query: (options) => ({
        url: 'users/' + options.userId,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),

    /**
     * Boards endpoints
     */
    //Get all Boards on server
    getAllBoards: build.query<IBoard[], IAuth>({
      query: (options) => ({
        url: 'boards',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Create Board
    createBoard: build.mutation<IBoard, IСreateBoardOptions>({
      query: (options) => ({
        url: 'boards',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Find Board
    getBoardById: build.query<IBoard, IGetBoardByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Update Board
    updateBoardById: build.mutation<IBoard, IUpdateBoardByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Delete Board
    deleteBoardById: build.mutation<IBoard, IDeleteBoardByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Get Boards by list of boardId
    getBoardsSetByIdsList: build.query<IBoard[], IGetBoardSetByIdsListOptions>({
      query: (options) => ({
        url: 'boardsSet',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        params: options.params,
      }),
    }),
    // Get Boards where user is owner or one of invited
    getBoardsSetByUserId: build.query<IBoard[], IGetBoardsSetByUserIdOptions>({
      query: (options) => ({
        url: 'boardsSet/' + options.userId,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),

    /**
     * Columns endpoints
     */
    // Get Columns in board
    getColumnsInBoard: build.query<IColumn[], IGetColumnsInBoardOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Create Column in board
    createColumn: build.mutation<IColumn, IСreateColumnOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Find Column
    getColumnById: build.query<IColumn, IGetColumnByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Update Column
    updateColumnById: build.mutation<IColumn, IUpdateColumnByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Delete Column
    deleteColumnById: build.mutation<IColumn, IDeleteColumnByIdOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Get Columns by list of columnId or in Boards where user is owner or one of invited
    getColumnsSetByIdsListOrUserId: build.query<IColumn[], IGetColumnsSetByParamOptions>({
      query: (options) => ({
        url: 'columnSet',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        params: options.params,
      }),
    }),
    // Change oreder of list of columns
    updateColumnsSet: build.mutation<IColumn[], IUpdateColumnsSetOptions>({
      query: (options) => ({
        url: 'columnSet',
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Create set of Columns
    createColumnsSet: build.mutation<IColumn[], ICreateColumnsSetOptions>({
      query: (options) => ({
        url: 'columnSet',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),

    /**
     * Tasks endpoints
     */
    // Get Tasks in columns
    getTasksInColumn: build.query<ITask, IGetTasksInColumnOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Create Task in column
    createTask: build.mutation<ITask, ICreateTaskOptions>({
      query: (options) => ({
        url: 'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Find Task
    getTaskById: build.query<ITask, IGetTaskByIdOptions>({
      query: (options) => ({
        url:
          'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks/' + options.taskId,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Update Task
    updateTaskById: build.mutation<ITask, IUpdateTaskByIdOptions>({
      query: (options) => ({
        url:
          'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks/' + options.taskId,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Delete Task
    deleteTaskById: build.mutation<ITask, IDeleteTaskByIdOptions>({
      query: (options) => ({
        url:
          'boards/' + options.boardId + '/columns/' + options.columnId + '/tasks/' + options.taskId,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Get Tasks by list of taskId or in Boards where user is owner or one of invited, or by search request
    getTasksSet: build.query<ITask[], IGetTasksSetParamOptions>({
      query: (options) => ({
        url: 'tasksSet',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Change oreder and column of list of tasks
    updateTasksSet: build.mutation<ITask[], IUpdateTasksSetOptions>({
      query: (options) => ({
        url: 'tasksSet',
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Get Tasks in selected Board
    getTaskSetByBoardId: build.query<ITask[], IGetTaskSetByBoardIdOptions>({
      query: (options) => ({
        url: 'tasksSet/' + options.boardId,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
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
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
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
            Authorization: 'Bearer ' + options.token.value,
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
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Delete File by Id
    deleteFileById: build.mutation<IFile, IDeleteFileByIdOptions>({
      query: (options) => ({
        url: 'file/' + options.fileId,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
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
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        params: options.params,
      }),
    }),
    // Create a new point
    createPoint: build.mutation<IPoint, ICreatePointOptions>({
      query: (options) => ({
        url: 'points',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Change done filed in set of points
    updateSetOfPoints: build.mutation<IPoint, IUpdateSetOfPointsOptions>({
      query: (options) => ({
        url: 'points',
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Get Points by TaskId
    getPointsByTaskId: build.query<IPoint[], IGetPointsByTaskIdOptions>({
      query: (options) => ({
        url: 'points/' + options.taskId,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
    // Change title and done
    updatePointById: build.mutation<IPoint, IUpdatePointByIdOptions>({
      query: (options) => ({
        url: 'points/' + options.pointId,
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
        body: options.body,
      }),
    }),
    // Delete Point by Id
    deletePointById: build.mutation<IPoint, IDeletePointByIdOptions>({
      query: (options) => ({
        url: 'points/' + options.pointId,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + options.token.value,
        },
      }),
    }),
  }),
});

export const {
  /* Auth Hooks */
  useSignInMutation,
  useSignUpMutation,
  /* Users Hooks */
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
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
} = managerAppApi;
