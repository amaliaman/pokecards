import type { Card } from 'models/card';
import { createInfiniteQuery } from 'utils/api';

const useGetCards = () => {
  const queryKey = 'cards';
  const requestConfig = { url: 'cards' };

  return createInfiniteQuery<Card[]>(queryKey, requestConfig);
};

export default useGetCards;
