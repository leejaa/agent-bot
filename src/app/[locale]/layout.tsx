import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { BETA_FEEDBACK_EMAIL } from '@/lib/beta';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const title = t('title');
  const description = t('description');
  const path = locale === routing.defaultLocale ? '' : `/${locale}`;
  const url = `${SITE_URL}${path}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}${l === routing.defaultLocale ? '' : `/${l}`}`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Polymind',
      title,
      description,
      url,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      alternateLocale: locale === 'ko' ? ['en_US'] : ['ko_KR'],
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Polymind — One prompt to every top AI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_URL],
    },
    verification: {
      // Bing Webmaster Tools — emitted as <meta name="msvalidate.01" content="...">
      other: {
        'msvalidate.01': 'E433F7571B215BFD6DF88924238BF409',
      },
    },
  };
}

/**
 * Polymind structured data — emitted on every locale page so search engines
 * and AI search crawlers (ChatGPT, Perplexity, Claude search) can identify
 * the product, the brand entity, and the FAQ answers verbatim.
 */
function buildJsonLd(siteUrl: string) {
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Polymind',
    url: siteUrl,
    description:
      'Send one prompt to GPT, Claude, and Gemini at once and compare their answers side by side. Built for power users who already compare AI outputs.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '25 free credits to start — no card required.',
    },
    creator: {
      '@type': 'Organization',
      name: 'Polymind',
      url: siteUrl,
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Polymind',
    url: siteUrl,
    logo: `${siteUrl}/brand/polymind-logo-512.png`,
    sameAs: [],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: BETA_FEEDBACK_EMAIL,
      },
    ],
  };

  return [softwareApplication, organization];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const jsonLd = buildJsonLd(SITE_URL);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // structured data must be inlined as a string
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </NextIntlClientProvider>
  );
}
