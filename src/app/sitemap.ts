import { FRONT_END_URL } from '@/api/settings';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const links = [
    {
      url: `${FRONT_END_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/fix/brands`,
      lastModified: new Date(),
    },

    {
      url: `${FRONT_END_URL}/fix/categories`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/privacy`,
      lastModified: new Date(),
    },
  ];

  return links;
}
