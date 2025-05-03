import type {
  DefinedInitialDataInfiniteOptions,
  InfiniteData,
} from '@tanstack/react-query';

export interface ApiResponse<TData> {
  data: TData;
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export type CreateInfiniteQueryOptions<T> =
  DefinedInitialDataInfiniteOptions<
    ApiResponse<T>,
    Error,
    InfiniteData<ApiResponse<T>, number>,
    readonly unknown[],
    number
  >;
