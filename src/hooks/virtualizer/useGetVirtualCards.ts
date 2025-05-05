import { useVirtualizer } from '@tanstack/react-virtual';
import useGetCards from 'hooks/api/queries/useGetCards';
import { useEffect, useRef } from 'react';

const useGetVirtualCards = () => {
  const getCards = useGetCards();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = getCards;

  const allRows = data ? data.pages.flatMap((page) => page.data) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 130,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualRows].reverse();
console.log(111);

    if (!lastItem) {
      return;
    }
console.log(222);

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log('fetching next page');
    
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    virtualRows,
  ]);

  return { ...getCards, rowVirtualizer, allRows, parentRef };
};

export default useGetVirtualCards;
