import ErrorAlert from '@/components/ErrorAlert';
import useGetVirtualCards from '@/hooks/virtualizer/useGetVirtualCards';
import { Box, Image, Spinner, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useMemo } from 'react';

const ITEM_PADDING = 3;

const Home: FC = () => {
  const {
    status,
    error,
    isFetching,
    parentRef,
    hasNextPage,
    isFetchingNextPage,
    rowVirtualizer,
    allRows,
  } = useGetVirtualCards();

  const memoizedVirtualRows = useMemo(
    () =>
      rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const isLoaderRow = virtualRow.index > allRows.length - 1;
        const card = allRows[virtualRow.index];

        return (
          <Box
            key={virtualRow.index}
            position="absolute"
            top={0}
            left={`${virtualRow.lane * (100 / 3)}%`}
            w={`${100 / 3}%`}
            h={`${virtualRow.size}px`}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            transform={`translateY(${virtualRow.start}px)`}
            pb={
              Math.floor(virtualRow.index / 3) ===
              Math.floor(allRows.length / 3)
                ? 0
                : ITEM_PADDING * 1.5
            }
            pl={
              virtualRow.lane === 0
                ? 0
                : virtualRow.lane === 2
                  ? ITEM_PADDING
                  : ITEM_PADDING / 2
            }
            pr={
              virtualRow.lane === 0
                ? ITEM_PADDING
                : virtualRow.lane === 2
                  ? 0
                  : ITEM_PADDING / 2
            }
          >
            {isLoaderRow ? (
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
    [rowVirtualizer, allRows, hasNextPage],
  );

  if (status === 'pending') return <p>Loading...</p>;

  if (status === 'error')
    return <ErrorAlert errorTitle="Error" errorMessage={error?.message} />;

  return (
    <Box
      ref={parentRef}
      h="calc(100dvh - 200px)"
      w="100%"
      overflow="auto"
      border="1px solid aqua"
      p={ITEM_PADDING * 1.5}
    >
      <Box
        h={`${rowVirtualizer.getTotalSize()}px`}
        w="100%"
        position="relative"
      >
        {memoizedVirtualRows}
      </Box>

      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </Box>
  );
};

export default Home;
