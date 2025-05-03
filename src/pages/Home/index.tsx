import { Alert } from '@chakra-ui/react';
import useGetVirtualCards from 'hooks/virtualizer/useGetVirtualCards';
import type { FC } from 'react';

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

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <Alert.Root status={'error'}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>{error.message}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  ) : (
    <div
      ref={parentRef}
      style={{
        height: 'calc(100dvh - 200px)',
        width: '100%',
        overflow: 'auto',
        border: '1px solid aqua',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          border: '1px solid hotpink',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;
          const card = allRows[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              // className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                border: '1px solid blue',
              }}
            >
              {isLoaderRow ? (
                hasNextPage ? (
                  'Loading more...'
                ) : (
                  'Nothing more to load'
                )
              ) : (
                <div
                  key={card.id}
                  style={{ display: 'inline', margin: '10px' }}
                >
                  <img
                    src={card.images.large}
                    alt={card.name}
                    style={{ maxHeight: '100px' }}
                  />
                  <b>{card.name}</b>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </div>
  );
};

export default Home;
