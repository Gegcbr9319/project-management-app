import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISpecialRoutes } from 'specialRoutes';
import { IStore, setToken, Token } from 'store';

export const ProtectedRouter: FC<ISpecialRoutes> = ({ children }) => {
  const { token } = useSelector((store: IStore) => store);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout(token.timeout);
    const { time } = new Token(token.value);
    if (time) {
      const timeout = setTimeout(() => {
        localStorage.removeItem('token');
        const { value, time, decoded, isValid } = new Token();
        const token = { value, time, decoded, isValid, timeout };
        dispatch(setToken({ token }));
        clearTimeout(timeout);
        navigate(location.pathname);
      }, time);
    }
    navigate(location.pathname);
  }, [
    dispatch,
    location.pathname,
    navigate,
    token.isValid,
    token.time,
    token.timeout,
    token.value,
  ]);

  return children;
};
