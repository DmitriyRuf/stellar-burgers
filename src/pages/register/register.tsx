import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { setCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';
import {
  registerUser,
  getUser,
  selectIsUserLoading,
  selectLoginError
} from '../../services/slices/user';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoading = useSelector(selectIsUserLoading);
  const errorLoginText = useSelector(selectLoginError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email: email, password: password }))
      .unwrap()
      .then((data) => {
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(getUser());
        navigate('/', { replace: true });
      });
  };

  if (isUserLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={errorLoginText?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
