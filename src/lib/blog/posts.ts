import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string; // ISO date (YYYY-MM-DD)
  updatedAt?: string;
  tags?: string[];
  /** Author name. Optional — defaults to "Polymind". */
  author?: string;
  /** Override hero image (defaults to OG image). */
  heroImage?: string;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export type Post = PostSummary & {
  /** Raw MDX source — render via next-mdx-remote/rsc on the page. */
  source: string;
  /** Reading time in whole minutes (based on ~220 wpm). */
  readingMinutes: number;
};

/** List every published post, newest first. */
export async function getAllPosts(): Promise<PostSummary[]> {
  const files = await safeReaddir(CONTENT_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx?$/, '');
        const post = await readPost(slug);
        return post;
      })
  );
  return posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Read a single post by slug. Returns null if not found. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return readPost(slug);
}

/** Slug list for `generateStaticParams`. */
export async function getAllSlugs(): Promise<string[]> {
  const files = await safeReaddir(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

// ---------- internals ----------

async function readPost(slug: string): Promise<Post | null> {
  const candidates = [
    path.join(CONTENT_DIR, `${slug}.mdx`),
    path.join(CONTENT_DIR, `${slug}.md`),
  ];
  for (const filepath of candidates) {
    try {
      const raw = await fs.readFile(filepath, 'utf8');
      const { data, content } = matter(raw);
      const fm = parseFrontmatter(data);
      return {
        slug,
        ...fm,
        source: content,
        readingMinutes: estimateReadingMinutes(content),
      };
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') continue;
      throw err;
    }
  }
  return null;
}

async function safeReaddir(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

function parseFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const required = ['title', 'description', 'publishedAt'] as const;
  for (const key of required) {
    if (typeof data[key] !== 'string' || data[key] === '') {
      throw new Error(`Blog post missing required frontmatter field: ${key}`);
    }
  }
  return {
    title: data.title as string,
    description: data.description as string,
    publishedAt: data.publishedAt as string,
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    author: typeof data.author === 'string' ? data.author : undefined,
    heroImage: typeof data.heroImage === 'string' ? data.heroImage : undefined,
  };
}

function estimateReadingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
