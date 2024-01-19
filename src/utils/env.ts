/**
 *
 *
 * @return {string}
 */
export const getApiBaseUrl = (): string => {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is undefined');
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL;
};
