import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const links = [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/fix/brands`,
      lastModified: new Date(),
    },

    {
      url: `${process.env.BASE_URL}/fix/categories`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/privacy`,
      lastModified: new Date(),
    },
  ];

  return links;
}
