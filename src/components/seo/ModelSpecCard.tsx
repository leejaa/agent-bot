import type { AIModel } from '@/lib/seo/models';

type Props = {
  model: AIModel;
};

const MULTIMODAL_LABEL: Record<AIModel['multimodal'], string> = {
  full: 'Full (image, audio, video)',
  partial: 'Partial (image only)',
  no: 'Text only',
};

export default function ModelSpecCard({ model }: Props) {
  return (
    <div className="rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] p-5 flex flex-col h-full">
      <div className="flex items-baseline gap-2 mb-1">
        <h3
          className="text-deep-graphite"
          style={{
            fontSize: 'var(--text-heading-sm)',
            lineHeight: 'var(--text-heading-sm--line-height)',
            letterSpacing: 'var(--text-heading-sm--letter-spacing)',
          }}
        >
          {model.name}
        </h3>
        <span
          className="text-deep-slate"
          style={{
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--text-caption--letter-spacing)',
          }}
        >
          by {model.vendor}
        </span>
      </div>
      <p
        className="text-deep-slate mb-4"
        style={{
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--text-body-sm--line-height)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }}
      >
        {model.highlight}
      </p>
      <dl className="grid grid-cols-2 gap-y-2 gap-x-4 mt-auto">
        <SpecRow label="Context window" value={model.contextWindow} />
        <SpecRow label="Multimodal" value={MULTIMODAL_LABEL[model.multimodal]} />
      </dl>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt
        className="text-deep-slate"
        style={{
          fontSize: 'var(--text-caption)',
          letterSpacing: 'var(--text-caption--letter-spacing)',
        }}
      >
        {label}
      </dt>
      <dd
        className="text-deep-graphite text-right"
        style={{
          fontSize: 'var(--text-caption)',
          letterSpacing: 'var(--text-caption--letter-spacing)',
        }}
      >
        {value}
      </dd>
    </>
  );
}
