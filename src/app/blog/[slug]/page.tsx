import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs, getAdjacentPosts } from '@/lib/blog';
import { getAlternateSlug } from '@/lib/slug-mapping';
import { BlogPostView } from '@/components/blog';
import MDXContent from '@/components/blog/MDXContent';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

const BASE_URL = 'https://legasint.com';

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

  const canonicalUrl = `${BASE_URL}/blog/${slug}`;
  const alternateEnSlug = getAlternateSlug(slug, 'es');

  return {
    title: `${post.title} - Legasint Blog`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es': canonicalUrl,
        ...(alternateEnSlug && { 'en': `${BASE_URL}/blog/en/${alternateEnSlug}` }),
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      locale: 'es_ES',
      url: canonicalUrl,
      siteName: 'Legasint',
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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
    <>
      <ArticleJsonLd post={post} locale="es" />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', url: BASE_URL },
          { name: 'Blog', url: `${BASE_URL}/blog` },
          { name: post.title, url: `${BASE_URL}/blog/${slug}` },
        ]}
      />
      <BlogPostView post={post} previousPost={previous} nextPost={next}>
        <MDXContent source={mdxSource} />
      </BlogPostView>
    </>
  );
}
