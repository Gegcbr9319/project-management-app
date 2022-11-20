import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISignInOptions, ISingInResponse, ISignUpOptions, ISingUpResponse } from './models';

export const managerAppApi = createApi({
  reducerPath: 'managerAppApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rss-pm-app.onrender.com/',
  }),
  endpoints: (build) => ({
    // Auth
    signUp: build.mutation<ISingUpResponse, ISignUpOptions>({
      query: (options) => ({
        url: 'auth/signup',
        method: 'POST',
        body: options.body,
      }),
    }),
    signIn: build.mutation<ISingInResponse, ISignInOptions>({
      query: (options) => ({
        url: 'auth/signup',
        method: 'POST',
        body: options.body,
      }),
    }),

    // // Users
    // getAllUsers: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getUserById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updateUserById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // deleteUserById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    // // Boards
    // getAllBoards: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // createBoard: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getBoardById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updateBoardById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // deleteBoardById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getBoardsByIdsList: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getBoardsByUserId: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    // // Columns
    // getColumnsInBoard: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // createColumn: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getColumnById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updateColumnById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // deleteColumnById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getColumnsByIdsListOrUserId: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updateSetOfColumns: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // createSetOfColumns: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    // // Tasks
    // getTasksInColumn: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // createTask: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getTaskById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updateTaskById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // deleteTaskById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getTasksByIdsListOrUserIdOrSearchRequest: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updateSetOfTasks: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getTaskByBoardId: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    // // Files
    // getFilesByIdsListOrUserIdOrTaskId: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // UploadFile: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getFilesByBoardId: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // deleteFileById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    // // Points
    // getPointsByIdsListOrUserId: build.mutation<ISingUpResponse, ISingUpBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // createPoint: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updateSetOfPoints: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getPointsByTaskId: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // updatePointById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // deletePointById: build.mutation<ISingInResponse, ISingInBody>({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = managerAppApi;
