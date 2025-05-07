import { PAGE_SIZE } from '@/hooks/api/constants';
import {
  type DefinedInitialDataOptions,
  type InfiniteData,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiResponse, CreateInfiniteQueryOptions } from './types';

// Define a default instance if none is provided
const defaultAxiosInstance = axios.create({
  baseURL: process.env.PUBLIC_BASE_URL,
  headers: { 'X-Api-Key': process.env.PUBLIC_API_KEY },
  timeout: 10000,
});

export const createQuery = <TData>(
  queryKey: string | unknown[],
  requestConfig: AxiosRequestConfig<TData>,
  options?:
    | DefinedInitialDataOptions<TData, Error, TData, readonly unknown[]>
    | undefined,
  axiosInstance = defaultAxiosInstance,
) => {
  const key: unknown[] = Array.isArray(queryKey) ? queryKey : [queryKey];

  return useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const response = await axiosInstance.request<
        TData,
        AxiosResponse<TData, Error>
      >({
        ...requestConfig,
      });
      return response.data;
    },
    ...options,
  });
};

/**
 * Creates an infinite query for paginated API requests.
 *
 * @template TData - The type of data to be returned from the API.
 * @param {string | unknown[]} queryKey - The key used to identify this query in the cache.
 * @param {AxiosRequestConfig<TData>} requestConfig - The Axios request configuration object (must include a URL).
 * @param {CreateInfiniteQueryOptions<TData>} [options] - Optional configuration options for the infinite query.
 * @returns {UseInfiniteQueryResult<InfiniteData<ApiResponse<TData>, number>, Defa>} - The result of the infinite query with pagination handling.
 * @throws {Error} - Throws an error if URL is not provided in the requestConfig.
 *
 * @example
 * const { data, fetchNextPage, hasNextPage, isLoading, error } = createInfiniteQuery(
 *   ["pokemons"],
 *   { url: "/api/pokemons" }
 * );
 */
export const createInfiniteQuery = <TData>(
  queryKey: string | unknown[],
  requestConfig: AxiosRequestConfig<TData>,
  options?: CreateInfiniteQueryOptions<TData>,
  axiosInstance = defaultAxiosInstance,
): UseInfiniteQueryResult<InfiniteData<ApiResponse<TData>, number>, Error> => {
  const key: unknown[] = Array.isArray(queryKey) ? queryKey : [queryKey];

  return useInfiniteQuery<
    ApiResponse<TData>,
    Error,
    InfiniteData<ApiResponse<TData>, number>,
    readonly unknown[],
    number
  >({
    queryKey: key,
    queryFn: async ({ pageParam }) => {
      const { url, ...config } = requestConfig;
      if (!url) {
        throw new Error(`URL is required for queryKey: ${JSON.stringify(key)}`);
      }

      const response = await axiosInstance.request({
        url,
        params: {
          pageSize: PAGE_SIZE,
          page: pageParam,
          ...(config.params || {}),
        },
        ...config,
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.count === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    ...options,
  });
};
