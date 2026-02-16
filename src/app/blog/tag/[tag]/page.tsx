import { Metadata } from 'next';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { BlogList } from '@/components/blog';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags('es');
  return tags.map((tag) => ({ tag: encodeURIComponent(tag.toLowerCase()) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} - Blog Legasint`,
    description: `Artículos sobre ${decodedTag} en el blog de Legasint.`,
    alternates: {
      canonical: `https://legasint.com/blog/tag/${tag}`,
      languages: {
        'es': `https://legasint.com/blog/tag/${tag}`,
        'en': `https://legasint.com/blog/en/tag/${tag}`,
      },
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag, 'es');

  return <BlogList posts={posts} locale="es" />;
}
