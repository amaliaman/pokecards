import ErrorAlert from '@/components/ErrorAlert';
import useResponsiveValues from '@/hooks/helpers/useResponsiveValues';
import useGetVirtualCards from '@/hooks/virtualizer/useGetVirtualCards';
import { Box, Image, Spinner, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useMemo } from 'react';

const ITEM_PADDING = 4;

const Home: FC = () => {
  const { gridColumns } = useResponsiveValues();

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
            left={`${virtualRow.lane * (100 / gridColumns)}%`}
            w={`${100 / gridColumns}%`}
            h={`${virtualRow.size}px`}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            transform={`translateY(${virtualRow.start}px)`}
            pb={
              Math.floor(virtualRow.index / gridColumns) ===
              Math.floor(allRows.length / gridColumns)
                ? 0
                : ITEM_PADDING
            }
            pr={ITEM_PADDING}
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
    [rowVirtualizer, allRows, hasNextPage, gridColumns],
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
        h={`${rowVirtualizer.getTotalSize()}px`}
        w={`calc(100% + {spacing.${ITEM_PADDING}})`}
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
