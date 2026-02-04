import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('writing'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/writing/${post.id}/`,
    })),
  });
}
