import type { Faq } from '@/lib/seo/types';

type Props = {
  faqs: Faq[];
  heading?: string;
};

export default function FaqList({ faqs, heading = 'Frequently asked questions' }: Props) {
  if (faqs.length === 0) return null;

  return (
    <section className="my-12">
      <h2
        className="text-deep-graphite mb-6"
        style={{
          fontSize: 'var(--text-heading)',
          lineHeight: 'var(--text-heading--line-height)',
          letterSpacing: 'var(--text-heading--letter-spacing)',
        }}
      >
        {heading}
      </h2>
      <ul className="space-y-6 border-t border-[rgba(0,0,0,0.06)] pt-6">
        {faqs.map((faq) => (
          <li key={faq.question}>
            <h3
              className="text-deep-graphite mb-2"
              style={{
                fontSize: 'var(--text-heading-sm)',
                lineHeight: 'var(--text-heading-sm--line-height)',
                letterSpacing: 'var(--text-heading-sm--letter-spacing)',
              }}
            >
              {faq.question}
            </h3>
            <p
              className="text-deep-slate"
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--text-body--line-height)',
                letterSpacing: 'var(--text-body--letter-spacing)',
              }}
            >
              {faq.answer}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
