import { MetadataRoute } from 'next';

export const fetchCache = 'default-no-store'

export default function robots(): MetadataRoute.Robots {
  const isDevServer = process.env.NEXT_PUBLIC_IS_DEV_SERVER;

  if (isDevServer === 'true') {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  } else if (isDevServer === 'false') {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      sitemap: `${process.env.NEXT_PUBLIC_METADATA_BASE_URL}/sitemap.xml`,
    };
  } else {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }
}