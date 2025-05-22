import ErrorAlert from '@/components/ErrorAlert';
import useGetVirtualCards from '@/hooks/virtualizer/useGetVirtualCards';
import { Box, Image, Spinner, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useMemo } from 'react';

const ITEM_PADDING = 4;

const Home: FC = () => {
  const {
    status,
    error,
    isFetching,
    parentRef,
    hasNextPage,
    isFetchingNextPage,
    itemVirtualizer,
    allItems,
  } = useGetVirtualCards();

  const memoizedVirtualItems = useMemo(
    () =>
      itemVirtualizer.getVirtualItems().map((virtualItem) => {
        const isLoaderItem = virtualItem.index > allItems.length - 1;
        const card = allItems[virtualItem.index];
        const { lanes } = itemVirtualizer.options;

        return (
          <Box
            key={virtualItem.index}
            position="absolute"
            top={0}
            left={`${virtualItem.lane * (100 / lanes)}%`}
            w={`${100 / lanes}%`}
            h={`${virtualItem.size}px`}
            data-index={virtualItem.index}
            ref={itemVirtualizer.measureElement}
            transform={`translateY(${virtualItem.start}px)`}
            pb={
              Math.floor(virtualItem.index / lanes) ===
              Math.floor(allItems.length / lanes)
                ? 0
                : ITEM_PADDING
            }
            pr={ITEM_PADDING}
          >
            {isLoaderItem ? (
              hasNextPage ? (
                <Spinner />
              ) : (
                'Nothing more to load'
              )
            ) : (
              <VStack
                key={card.id}
                p={4}
                border="1px solid"
                borderColor="border"
                borderRadius="md"
                bgColor="bg.subtle"
                h="100%"
              >
                <Image src={card.images.large} alt={card.name} h="80%" />
                <b>{card.name}</b>
              </VStack>
            )}
          </Box>
        );
      }),
    [itemVirtualizer, allItems, hasNextPage],
  );

  if (status === 'pending') return <p>Loading...</p>;

  if (status === 'error')
    return <ErrorAlert errorTitle="Error" errorMessage={error?.message} />;

  return (
    <Box
      ref={parentRef}
      h="calc(100dvh - 200px)"
      w="100%"
      overflowY="auto"
      overflowX="hidden"
    >
      <Box
        h={`${itemVirtualizer.getTotalSize()}px`}
        w={`calc(100% + {spacing.${ITEM_PADDING}})`}
        position="relative"
      >
        {memoizedVirtualItems}
      </Box>

      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </Box>
  );
};

export default Home;
