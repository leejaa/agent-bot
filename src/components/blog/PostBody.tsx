import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';

/**
 * MDX renderer for blog posts. Restricted to a small palette of components so
 * posts stay on-brand and accessible. All elements use Polymind design
 * tokens and reasonable typographic defaults — no global prose plugin needed.
 */
const components = {
  h1: (props: { children?: ReactNode }) => (
    <h1
      className="text-deep-graphite mt-12 mb-4"
      style={{
        fontSize: 'var(--text-heading-lg)',
        lineHeight: 'var(--text-heading-lg--line-height)',
        letterSpacing: 'var(--text-heading-lg--letter-spacing)',
      }}
      {...props}
    />
  ),
  h2: (props: { children?: ReactNode }) => (
    <h2
      className="text-deep-graphite mt-12 mb-4"
      style={{
        fontSize: 'var(--text-heading)',
        lineHeight: 'var(--text-heading--line-height)',
        letterSpacing: 'var(--text-heading--letter-spacing)',
      }}
      {...props}
    />
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3
      className="text-deep-graphite mt-8 mb-3"
      style={{
        fontSize: 'var(--text-heading-sm)',
        lineHeight: 'var(--text-heading-sm--line-height)',
        letterSpacing: 'var(--text-heading-sm--letter-spacing)',
      }}
      {...props}
    />
  ),
  p: (props: { children?: ReactNode }) => (
    <p
      className="text-deep-graphite my-4"
      style={{
        fontSize: 'var(--text-body)',
        lineHeight: 'var(--text-body--line-height)',
        letterSpacing: 'var(--text-body--letter-spacing)',
      }}
      {...props}
    />
  ),
  a: (props: { href?: string; children?: ReactNode }) => (
    <a
      className="text-primary underline underline-offset-2 hover:opacity-80"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: { children?: ReactNode }) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-deep-graphite" {...props} />
  ),
  ol: (props: { children?: ReactNode }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-deep-graphite" {...props} />
  ),
  li: (props: { children?: ReactNode }) => (
    <li
      style={{
        fontSize: 'var(--text-body)',
        lineHeight: 'var(--text-body--line-height)',
        letterSpacing: 'var(--text-body--letter-spacing)',
      }}
      {...props}
    />
  ),
  blockquote: (props: { children?: ReactNode }) => (
    <blockquote
      className="border-l-4 border-primary/40 pl-4 my-6 text-deep-slate italic"
      style={{
        fontSize: 'var(--text-body)',
        lineHeight: 'var(--text-body--line-height)',
      }}
      {...props}
    />
  ),
  code: (props: { children?: ReactNode }) => (
    <code
      className="px-1.5 py-0.5 rounded bg-ghost-white text-deep-graphite font-mono"
      style={{ fontSize: '0.92em' }}
      {...props}
    />
  ),
  pre: (props: { children?: ReactNode }) => (
    <pre
      className="my-6 p-4 rounded-[var(--radius-card)] bg-ghost-white border border-[rgba(0,0,0,0.06)] overflow-x-auto"
      style={{ fontSize: 'var(--text-body-sm)' }}
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-[rgba(0,0,0,0.08)]" />,
  table: (props: { children?: ReactNode }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: { children?: ReactNode }) => (
    <th
      className="text-left px-3 py-2 border-b-2 border-[rgba(0,0,0,0.12)] text-deep-graphite font-medium"
      style={{ fontSize: 'var(--text-body-sm)' }}
      {...props}
    />
  ),
  td: (props: { children?: ReactNode }) => (
    <td
      className="px-3 py-2 border-b border-[rgba(0,0,0,0.06)] text-deep-graphite align-top"
      style={{ fontSize: 'var(--text-body-sm)' }}
      {...props}
    />
  ),
  strong: (props: { children?: ReactNode }) => (
    <strong className="font-medium text-deep-graphite" {...props} />
  ),
};

const mdxOptions = {
  remarkPlugins: [remarkGfm],
};

export function PostBody({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={{ mdxOptions }} />;
}
