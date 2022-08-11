import sanityClient from '@sanity/client';

export const client: any =
  global.sanity ||
  sanityClient({
    projectId: process.env.SANITY_ID,
    dataset: 'production',
    apiVersion: 'v1',
    token: process.env.SANITY_KEY,
    useCdn: false,
  });

if (process.env.NODE_ENV !== 'production') {
  global.sanity = client;
}
