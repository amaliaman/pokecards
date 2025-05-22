import useGetCards from '@/hooks/api/queries/useGetCards';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useRef } from 'react';
import useResponsiveValues from '../helpers/useResponsiveValues';

const useGetVirtualCards = () => {
  const { gridColumns } = useResponsiveValues();

  const getCards = useGetCards();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = getCards;

  const allItems = data?.pages.flatMap((page) => page.data) ?? [];

  const parentRef = useRef<HTMLDivElement>(null);

  const measureElement = useCallback(
    (element: HTMLElement) => element.getBoundingClientRect().height,
    [],
  );

  const itemVirtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: gridColumns,
    lanes: gridColumns,
    measureElement,
  });

  const virtualItems = itemVirtualizer.getVirtualItems();

  // biome-ignore lint/correctness/useExhaustiveDependencies: recalculate the row size when gridColumns changes
  useEffect(() => {
    itemVirtualizer.measure();
  }, [gridColumns, itemVirtualizer]);

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log('fetching next page');

      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allItems.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  return { ...getCards, itemVirtualizer, allItems, parentRef };
};

export default useGetVirtualCards;
