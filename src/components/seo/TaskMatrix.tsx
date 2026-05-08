import type { Comparison, TaskWinner } from '@/lib/seo/types';
import { getModel } from '@/lib/seo/models';
import type { AIModelId } from '@/lib/seo/models';

type Props = {
  comparison: Comparison;
};

export default function TaskMatrix({ comparison }: Props) {
  const a = getModel(comparison.modelA);
  const b = getModel(comparison.modelB);

  return (
    <section className="my-10">
      <h2
        className="text-deep-graphite mb-4"
        style={{
          fontSize: 'var(--text-heading)',
          lineHeight: 'var(--text-heading--line-height)',
          letterSpacing: 'var(--text-heading--letter-spacing)',
        }}
      >
        Task-by-task: which model wins, and why
      </h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[rgba(0,0,0,0.12)]">
              <Th className="w-1/3">Task</Th>
              <Th className="w-32 text-center">Winner</Th>
              <Th>Why</Th>
            </tr>
          </thead>
          <tbody>
            {comparison.taskMatrix.map((row) => (
              <tr key={row.task} className="border-b border-[rgba(0,0,0,0.06)] align-top">
                <Td>
                  <span className="font-medium text-deep-graphite">{row.task}</span>
                </Td>
                <Td className="text-center">
                  <WinnerBadge
                    winner={row.winner}
                    aId={comparison.modelA}
                    aLabel={a.shortName}
                    bLabel={b.shortName}
                  />
                </Td>
                <Td>
                  <span className="text-deep-slate">{row.reasoning}</span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-3 sm:px-4 py-3 text-deep-graphite font-medium ${className}`}
      style={{
        fontSize: 'var(--text-body-sm)',
        letterSpacing: 'var(--text-body-sm--letter-spacing)',
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <td
      className={`px-3 sm:px-4 py-4 ${className}`}
      style={{
        fontSize: 'var(--text-body-sm)',
        lineHeight: 'var(--text-body-sm--line-height)',
        letterSpacing: 'var(--text-body-sm--letter-spacing)',
      }}
    >
      {children}
    </td>
  );
}

function WinnerBadge({
  winner,
  aId,
  aLabel,
  bLabel,
}: {
  winner: TaskWinner;
  aId: AIModelId;
  aLabel: string;
  bLabel: string;
}) {
  if (winner === 'tie') {
    return (
      <span
        className="inline-block px-2.5 py-1 rounded-[var(--radius-pill)] bg-ghost-white text-deep-slate border border-[rgba(0,0,0,0.08)]"
        style={{
          fontSize: 'var(--text-caption)',
          letterSpacing: 'var(--text-caption--letter-spacing)',
          fontWeight: 500,
        }}
      >
        Tie
      </span>
    );
  }
  const label = winner === aId ? aLabel : bLabel;
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-[var(--radius-pill)] bg-primary/10 text-primary"
      style={{
        fontSize: 'var(--text-caption)',
        letterSpacing: 'var(--text-caption--letter-spacing)',
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}
