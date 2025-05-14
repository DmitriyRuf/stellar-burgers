import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeeds,
  getFeeds,
  selectIsFeedsLoading
} from '../../services/slices/feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(selectFeeds);
  const isFeedsLoading: boolean = useSelector(selectIsFeedsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (isFeedsLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={feeds.orders} handleGetFeeds={handleGetFeeds} />;
};
