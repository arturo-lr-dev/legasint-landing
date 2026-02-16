import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://legasint.com';

export const dynamic = 'force-static';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const esPosts = getAllPosts('es');
  const enPosts = getAllPosts('en');

  const allItems = [
    ...esPosts.map((post) => ({
      ...post,
      url: `${BASE_URL}/blog/${post.slug}`,
      lang: 'es',
    })),
    ...enPosts.map((post) => ({
      ...post,
      url: `${BASE_URL}/blog/en/${post.slug}`,
      lang: 'en',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = allItems
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <dc:language>${item.lang}</dc:language>
      ${item.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Legasint Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Articles about technology, software development, and innovative solutions by Legasint.</description>
    <language>es</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
