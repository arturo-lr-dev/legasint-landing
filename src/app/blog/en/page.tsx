import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogList } from '@/components/blog';

export const metadata: Metadata = {
  title: 'Blog - Legasint',
  description: 'Articles about technology, software development, and innovative solutions.',
  alternates: {
    canonical: 'https://legasint.com/blog/en',
    languages: {
      'en': 'https://legasint.com/blog/en',
      'es': 'https://legasint.com/blog',
    },
  },
};

export default function BlogPageEN() {
  const posts = getAllPosts('en');

  return <BlogList posts={posts} locale="en" />;
}
