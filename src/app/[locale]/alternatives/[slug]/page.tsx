import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAlternative, getAlternativeSlugs } from '@/lib/seo/alternatives';
import AlternativePage from '@/components/seo/AlternativePage';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const LOCALES = ['en', 'ko'] as const;

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  const slugs = getAlternativeSlugs();
  return slugs.flatMap((slug) => LOCALES.map((locale) => ({ slug, locale })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getAlternative(slug);
  if (!a) return {};

  const url = `${SITE_URL}/alternatives/${slug}`;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: a.metaTitle,
      description: a.metaDescription,
      url,
      siteName: 'Polymind',
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: a.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.metaTitle,
      description: a.metaDescription,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function AlternativeSlugPage({ params }: Props) {
  const { slug } = await params;
  const alternative = getAlternative(slug);
  if (!alternative) notFound();

  const url = `${SITE_URL}/alternatives/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: alternative.h1,
    description: alternative.metaDescription,
    datePublished: alternative.publishedAt,
    dateModified: alternative.updatedAt ?? alternative.publishedAt,
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
    mainEntity: alternative.faqs.map((f) => ({
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
      <AlternativePage alternative={alternative} />
    </>
  );
}
