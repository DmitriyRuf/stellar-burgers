import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const userData = useSelector(selectUser);
  return <AppHeaderUI userName={userData.name} />;
};
