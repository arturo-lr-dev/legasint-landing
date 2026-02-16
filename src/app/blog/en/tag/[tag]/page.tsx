import { Metadata } from 'next';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { BlogList } from '@/components/blog';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags('en');
  return tags.map((tag) => ({ tag: encodeURIComponent(tag.toLowerCase()) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} - Legasint Blog`,
    description: `Articles about ${decodedTag} on the Legasint blog.`,
    alternates: {
      canonical: `https://legasint.com/blog/en/tag/${tag}`,
      languages: {
        'en': `https://legasint.com/blog/en/tag/${tag}`,
        'es': `https://legasint.com/blog/tag/${tag}`,
      },
    },
  };
}

export default async function TagPageEN({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag, 'en');

  return <BlogList posts={posts} locale="en" />;
}
