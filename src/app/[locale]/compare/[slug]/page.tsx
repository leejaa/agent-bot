import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getComparison, getComparisonSlugs } from '@/lib/seo/comparisons';
import ComparisonPage from '@/components/seo/ComparisonPage';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const LOCALES = ['en', 'ko'] as const;

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  const slugs = getComparisonSlugs();
  return slugs.flatMap((slug) => LOCALES.map((locale) => ({ slug, locale })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};

  const url = `${SITE_URL}/compare/${slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      siteName: 'Polymind',
      publishedTime: c.publishedAt,
      modifiedTime: c.updatedAt ?? c.publishedAt,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: c.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle,
      description: c.metaDescription,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function CompareSlugPage({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const url = `${SITE_URL}/compare/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.h1,
    description: comparison.metaDescription,
    datePublished: comparison.publishedAt,
    dateModified: comparison.updatedAt ?? comparison.publishedAt,
    author: { '@type': 'Organization', name: 'Polymind', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Polymind',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/polymind-logo-512.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: OG_IMAGE_URL,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ComparisonPage comparison={comparison} />
    </>
  );
}
