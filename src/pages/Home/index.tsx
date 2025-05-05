import { Grid, GridItem } from '@chakra-ui/react';
import ErrorAlert from 'components/ErrorAlert';
import AppGrid from 'components/shared/AppGrid';
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

  if (status === 'pending') return <p>Loading...</p>;

  if (status === 'error')
    return <ErrorAlert errorTitle="Error" errorMessage={error.message} />;

  return (
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
        <AppGrid
          items={rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const card = allRows[virtualRow.index];

            return (
              <GridItem
                key={virtualRow.index}
                borderRadius={'8px'}
                padding={2}
                bgColor={'whitesmoke'}
                maxH="100%"
                // className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                // style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                // width: '100%',
                // height: `${virtualRow.size}px`,
                // transform: `translateY(${virtualRow.start}px)`,
                // border: '1px solid blue',
                // borderRadius: '8px',
                // padding: '8px',
                // backgroundColor: 'whitesmoke',
                // }}
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    'Loading more...'
                  ) : (
                    'Nothing more to load'
                  )
                ) : (
                  // <div
                  //   key={card.id}
                  //   style={{ display: 'inline', margin: '10px' }}
                  // >
                  <>
                    <img
                      src={card.images.large}
                      alt={card.name}
                      style={{ maxHeight: '80%' }}
                    />
                    <b>{card.name}</b>
                  </>
                  // </div>
                )}
              </GridItem>
            );
          })}
        />

        {/* {rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
        })} */}
      </div>

      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </div>
  );
};

export default Home;
