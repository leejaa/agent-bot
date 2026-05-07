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
      description: 'Free during open beta',
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

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Polymind?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A multi-AI chat that sends one prompt to GPT, Claude, and Gemini at the same time. You see all three answers side by side and pick the one that fits — without juggling tabs or copy-pasting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why not just use ChatGPT, Claude, or Gemini directly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because no single AI is best at everything. If you already check answers across multiple models for important tasks, Polymind removes the friction — same workflow, but in one chat instead of three tabs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Polymind really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, completely free during open beta. New accounts get 200 credits (1 credit roughly equals 1 prompt to all 3 models). For more credits during beta, email ${BETA_FEEDBACK_EMAIL}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Will Polymind charge later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — paid plans launch when beta ends. Pricing will be pay-as-you-go credit packs, not subscription. Beta users keep their feedback-shaping influence on the v1 launch.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does my data go?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prompts and responses are stored in your account so you can revisit them. They are never used to train models — Polymind routes through Vercel AI Gateway, which has zero data retention by default. You can delete any conversation anytime.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I switch which AI models Polymind uses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — each of the three columns can be set to any chat-capable model on Vercel AI Gateway (100+ models). The default is the latest frontier GPT, Claude, and Gemini. Click any column header to swap.',
        },
      },
    ],
  };

  return [softwareApplication, organization, faqPage];
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
