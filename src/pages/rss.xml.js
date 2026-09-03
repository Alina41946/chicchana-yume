import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';

export async function GET(context) {
  const posts = await getCollection(
    'blog',
    ({data}) => !data.draft && data.category !== 'works',
  );

  const sortedPosts = posts.sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
  );

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  const siteURL = new URL(base, context.site);

  return rss({
    title: 'ちっちゃな私には、ちっちゃな夢があります。',
    description: '語言學習、日本一年打工度假與台灣旅遊的個人網站。',

    site: siteURL,

    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,

      link: new URL(`${post.id.replace(/\.mdx?$/, '')}/`, siteURL).href,
    })),

    customData: `<language>zh-TW</language>`,
  });
}
