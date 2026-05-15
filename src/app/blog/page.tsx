import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogList } from '@/components/blog';

export const metadata: Metadata = {
  title: 'Blog - Legasint',
  description: 'Artículos sobre tecnología, desarrollo de software y soluciones innovadoras.',
  alternates: {
    canonical: 'https://legasint.com/blog',
    languages: {
      'es': 'https://legasint.com/blog',
      'en': 'https://legasint.com/blog/en',
    },
  },
};

export default function BlogPage() {
  const posts = getAllPosts('es');

  return <BlogList posts={posts} locale="es" />;
}
