import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Token, useSignInMutation } from 'store';
import { setToken } from 'store';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export interface ISubmitData {
  login?: string;
  password?: string;
}

export function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { data, isLoading, isSuccess, isError }] = useSignInMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    resetField,
  } = useForm({ mode: 'onSubmit' });

  const customHandleError = (errors: object) => {
    Object.keys(errors).forEach((name: string) => resetField(name, { keepError: true }));
  };

  const customHandleSubmit = async (data: ISubmitData) => {
    const { login, password } = data;
    if (!login || !password) return;
    signIn({ body: { login, password } });
    reset();
  };

  useEffect(() => {
    if (!data?.token) return;
    const { value, time, decoded, isValid } = new Token(data.token);
    dispatch(setToken({ token: { value, time, decoded, isValid } }));
    navigate('/');
  }, [data, data?.token, dispatch, navigate]);

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(customHandleSubmit, customHandleError)}>
        <input type="text" {...register('login', { required: true })} placeholder="Enter login" />
        <p>{`${errors?.login ? 'Enter login' : ' '}`}</p>

        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Enter password"
        />
        <p>{`${errors?.password ? 'Enter password' : ' '}`}</p>

        <input type="submit" value="Submit" {...register('submit')} disabled={isLoading} />
      </form>
      <br />
      <p>{`isLoading: ${isLoading}`}</p>
      <p>{`isSuccess: ${isSuccess}`}</p>
      <p>{`isError:   ${isError}`}</p>
      <p>{`data: ${data}`}</p>
    </>
  );
}
