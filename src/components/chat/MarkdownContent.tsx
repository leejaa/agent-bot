'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  children: string;
};

export default function MarkdownContent({ children }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
          <code
            className="px-1 py-0.5 rounded bg-[rgba(0,0,0,0.06)] font-mono"
            style={{ fontSize: '0.875em' }}
          >
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="my-2 px-3 py-2.5 rounded-[var(--radius-button)] bg-[rgba(0,0,0,0.04)] overflow-x-auto font-mono text-[0.8em] leading-relaxed">
            {children}
          </pre>
        ),
        ul: ({ children }) => <ul className="my-1 ml-4 list-disc space-y-0.5">{children}</ul>,
        ol: ({ children }) => <ol className="my-1 ml-4 list-decimal space-y-0.5">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        h1: ({ children }) => <h1 className="text-base font-semibold mb-1">{children}</h1>,
        h2: ({ children }) => <h2 className="text-sm font-semibold mb-1">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-medium mb-1">{children}</h3>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-70 transition-opacity"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-2 pl-3 border-l-2 border-cool-gray/40 text-deep-slate italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-2 border-[rgba(0,0,0,0.08)]" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
