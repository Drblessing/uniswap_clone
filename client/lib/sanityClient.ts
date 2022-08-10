import sanityClient from '@sanity/client';
const SANITY_ID: string = process.env.SANITY_ID ?? 'default';
const SANITY_KEY: string = process.env.SANITY_KEY ?? 'default';
export const client = sanityClient({
  projectId: SANITY_ID,
  dataset: 'production',
  apiVersion: 'v1',
  token: SANITY_KEY,
  useCdn: false,
});
