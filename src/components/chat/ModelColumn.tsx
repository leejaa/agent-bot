'use client';

type Props = {
  name: string;
  modelId: string;
  text: string;
  streaming: boolean;
  error?: string;
};

export default function ModelColumn({ name, modelId, text, streaming, error }: Props) {
  return (
    <div className="flex flex-col h-full min-w-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2 shrink-0">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs text-zinc-500">{modelId}</span>
        {streaming && (
          <span className="ml-auto flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-bounce [animation-delay:300ms]" />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : text ? (
          text
        ) : streaming ? null : (
          <span className="text-zinc-600 italic">대기 중...</span>
        )}
      </div>
    </div>
  );
}
