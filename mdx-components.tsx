import type { MDXComponents } from 'mdx/types';
import {
  MDXHeading,
  MDXCode,
  MDXPre,
  MDXLink,
  MDXBlockquote,
  MDXImage,
} from '@/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <MDXHeading level={1} {...props} />,
    h2: (props) => <MDXHeading level={2} {...props} />,
    h3: (props) => <MDXHeading level={3} {...props} />,
    h4: (props) => <MDXHeading level={4} {...props} />,
    h5: (props) => <MDXHeading level={5} {...props} />,
    h6: (props) => <MDXHeading level={6} {...props} />,
    code: MDXCode,
    pre: MDXPre,
    a: MDXLink,
    blockquote: MDXBlockquote,
    img: MDXImage,
    ...components,
  };
}
