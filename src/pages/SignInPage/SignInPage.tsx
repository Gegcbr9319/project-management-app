import React from 'react';
import { IErrorResponse, ISingInResponse, Token, useSignInMutation } from 'store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToken } from 'store';

export interface ISubmitData {
  login?: string;
  password?: string;
}

export interface IResponse {
  data?: ISingInResponse;
  error?: IErrorResponse;
}

export function SignInPage() {
  const [signIn, { data, isLoading, isSuccess, isError, error }] = useSignInMutation();
  const { register, formState, handleSubmit, reset, resetField } = useForm();
  const dispatch = useDispatch();

  const formErrorsHandler = (errors: object) => {
    Object.keys(errors).forEach((name: string) => resetField(name, { keepError: true }));
  };

  const formSubmitHandler = (submitedData: ISubmitData) => {
    const { login, password } = submitedData;
    if (!login || !password) return;
    signIn({ body: { login, password } }).then((resp) => {
      const { data } = resp as IResponse;
      if (!data) return;
      const { value, time, decoded, isValid } = new Token(data.token);
      dispatch(setToken({ token: { value, time, decoded, isValid } }));
    });
    reset();
  };

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(formSubmitHandler, formErrorsHandler)}>
        <input type="text" {...register('login', { required: true })} placeholder="Enter login" />
        <p style={{ color: 'red' }}>{`${formState.errors?.login ? 'Enter login' : ' '}`}</p>

        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Enter password"
        />
        <p style={{ color: 'red' }}>{`${formState.errors?.password ? 'Enter password' : ' '}`}</p>

        <input type="submit" value="Submit" {...register('submit')} disabled={isLoading} />
      </form>
      <br />
      <p style={{ color: 'red' }}>
        {error && !formState.isDirty
          ? ((error as unknown as FetchBaseQueryError).data as IErrorResponse).message
          : ' '}
      </p>
      <br />
      <p>{`isLoading: ${isLoading}`}</p>
      <p>{`isSuccess: ${isSuccess}`}</p>
      <p>{`isError:   ${isError}`}</p>
      <p>{`data: ${data?.token}`}</p>
      <p>{`error: ${error}`}</p>
    </>
  );
}
