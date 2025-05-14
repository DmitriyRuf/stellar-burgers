import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrderRequest,
  selectOrderModalData,
  addOrder,
  clearOrderRequest
} from '../../services/slices/orders';
import {
  selectIngredients,
  selectBun,
  clearIngredients
} from '../../services/slices/burger-builder';
import { selectIsLogin } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isLogin = useSelector(selectIsLogin);
  const constructorItems = {
    bun: useSelector(selectBun),
    ingredients: useSelector(selectIngredients)
  };

  const onOrderClick = () => {
    if (!isLogin) {
      return navigate('/login', { replace: true });
    }

    if (constructorItems.bun && constructorItems.ingredients.length) {
      const itemsId = constructorItems.ingredients.map((item) => item._id);
      const order = [
        constructorItems.bun._id,
        ...itemsId,
        constructorItems.bun._id
      ];

      dispatch(addOrder(order));
    }

    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    dispatch(clearOrderRequest());
    dispatch(clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
