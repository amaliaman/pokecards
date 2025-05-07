import HomeLink from '@/components/navigation/links/HomeLink';
import { Alert, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { type ErrorResponse, useRouteError } from 'react-router';
import type { ErrorAlertProps } from './types';

const ErrorAlert: FC<ErrorAlertProps> = ({ errorMessage, errorTitle }) => {
  const error = useRouteError() as Error & ErrorResponse;

  const message =
    errorMessage ??
    error?.data ??
    error?.message ??
    'An unknown error has occured';

  const title = errorTitle ?? error?.statusText ?? error?.name ?? 'Error';

  console.error(message);

  return (
    <Alert.Root status={'error'}>
      <Alert.Indicator />

      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>

        <Alert.Description>
          <VStack align="start">
            {message}
            <HomeLink />
          </VStack>
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
};

export default ErrorAlert;
