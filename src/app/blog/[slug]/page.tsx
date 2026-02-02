import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs, getAdjacentPosts } from '@/lib/blog';
import { BlogPostView } from '@/components/blog';
import MDXContent from '@/components/blog/MDXContent';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs('es');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'es');

  if (!post) {
    return {
      title: 'Post no encontrado - Legasint',
    };
  }

  return {
    title: `${post.title} - Legasint Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'es');

  if (!post) {
    notFound();
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeSlug],
    },
  });

  const { previous, next } = getAdjacentPosts(slug, 'es');

  return (
    <BlogPostView post={post} previousPost={previous} nextPost={next}>
      <MDXContent source={mdxSource} />
    </BlogPostView>
  );
}
