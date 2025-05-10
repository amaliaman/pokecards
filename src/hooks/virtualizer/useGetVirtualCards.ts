import useGetCards from '@/hooks/api/queries/useGetCards';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useRef } from 'react';
import useResponsiveValues from '../helpers/useResponsiveValues';

const useGetVirtualCards = () => {
  const { gridColumns } = useResponsiveValues();

  const getCards = useGetCards();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = getCards;

  const allRows = data?.pages.flatMap((page) => page.data) ?? [];

  const parentRef = useRef<HTMLDivElement>(null);

  const measureElement = useCallback(
    (element: HTMLElement) => element.getBoundingClientRect().height,
    [],
  );

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: gridColumns,
    lanes: gridColumns,
    measureElement,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualRows].reverse();

    if (!lastItem) {
      return;
    }

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
