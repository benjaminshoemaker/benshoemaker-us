import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage, extractFirstImage } from '../../utils/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('writing');
  return posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      params: { slug: post.id },
      props: { post },
    }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as {
    data: { title: string; type: string; date: Date };
    body?: string;
  };

  const firstImage = post.body ? extractFirstImage(post.body) : null;

  const png = await generateOgImage({
    title: post.data.title,
    type: post.data.type,
    date: post.data.date,
    articleImagePath: firstImage,
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
