import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { setCookie, getCookie } from '../../utils/cookie';

import {
  loginUser,
  selectIsUserLoading,
  selectIsLogin,
  selectLoginError,
  getUser,
  clearUserData
} from '../../services/slices/user';
export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = getCookie('accessToken');
  const isLogin = useSelector(selectIsLogin);
  const errorLoginText = useSelector(selectLoginError);
  const isUserLoading = useSelector(selectIsUserLoading);

  useEffect(() => {
    if (!isLogin && token) dispatch(getUser());
    if (!isLogin && !token) dispatch(clearUserData());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((data) => {
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      });
  };

  if (isUserLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={errorLoginText?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
