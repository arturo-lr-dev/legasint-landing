import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs, getAdjacentPosts, getRelatedPosts, extractHeadings } from '@/lib/blog';
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
  const slugs = getPostSlugs('en');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');

  if (!post) {
    return {
      title: 'Post not found - Legasint',
    };
  }

  const canonicalUrl = `${BASE_URL}/blog/en/${slug}`;
  const alternateEsSlug = getAlternateSlug(slug, 'en');

  return {
    title: `${post.title} - Legasint Blog`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': canonicalUrl,
        ...(alternateEsSlug && { 'es': `${BASE_URL}/blog/${alternateEsSlug}` }),
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      locale: 'en_US',
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

export default async function BlogPostPageEN({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');

  if (!post) {
    notFound();
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeSlug],
    },
  });

  const { previous, next } = getAdjacentPosts(slug, 'en');
  const related = getRelatedPosts(slug, 'en');
  const tocItems = extractHeadings(post.content);

  return (
    <>
      <ArticleJsonLd post={post} locale="en" />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Blog', url: `${BASE_URL}/blog/en` },
          { name: post.title, url: `${BASE_URL}/blog/en/${slug}` },
        ]}
      />
      <BlogPostView post={post} previousPost={previous} nextPost={next} relatedPosts={related} tocItems={tocItems}>
        <MDXContent source={mdxSource} />
      </BlogPostView>
    </>
  );
}
