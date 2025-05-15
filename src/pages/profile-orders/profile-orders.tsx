import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  selectIsOrdersLoading,
  selectOrders
} from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  const IsOrdersLoading = useSelector(selectIsOrdersLoading);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (IsOrdersLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
