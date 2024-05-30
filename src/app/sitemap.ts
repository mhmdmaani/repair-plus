import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const links = [
    {
      url: `${process.env.BASE_URL}`, // Replace with your homepage
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/about`, // Replace with your homepage
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/contact`, // Replace with your homepage
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/terms`, // Replace with your homepage
      lastModified: new Date(),
    },

    {
      url: `${process.env.BASE_URL}/quote`, // Replace with your homepage
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/fleets`, // Replace with your homepage
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/confirm-quote`, // Replace with your homepage
      lastModified: new Date(),
    },

    {
      url: `${process.env.BASE_URL}/privacy`, // Replace with your homepage
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/privacy`, // Replace with your homepage
      lastModified: new Date(),
    },
  ];

  return links;
}
