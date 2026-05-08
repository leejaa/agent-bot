import type { Comparison } from '@/lib/seo/types';
import { getModel } from '@/lib/seo/models';

type Props = {
  comparison: Comparison;
};

export default function ComparisonVerdict({ comparison }: Props) {
  const a = getModel(comparison.modelA);
  const b = getModel(comparison.modelB);

  return (
    <aside className="rounded-[var(--radius-card)] border border-[rgba(0,0,0,0.08)] bg-ghost-white p-5 my-8">
      <p
        className="text-deep-slate uppercase mb-3"
        style={{
          fontSize: 'var(--text-caption)',
          letterSpacing: 'var(--text-caption--letter-spacing)',
          fontWeight: 500,
        }}
      >
        Quick verdict
      </p>
      <ul className="space-y-2">
        <VerdictRow modelName={a.shortName} sentence={comparison.verdict.pickA} />
        <VerdictRow modelName={b.shortName} sentence={comparison.verdict.pickB} />
      </ul>
    </aside>
  );
}

function VerdictRow({ modelName, sentence }: { modelName: string; sentence: string }) {
  return (
    <li
      className="text-deep-graphite"
      style={{
        fontSize: 'var(--text-body)',
        lineHeight: 'var(--text-body--line-height)',
        letterSpacing: 'var(--text-body--letter-spacing)',
      }}
    >
      <span className="font-medium">Pick {modelName}</span> for {sentence}
    </li>
  );
}
