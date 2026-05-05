import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Agent Bot — Compare 3 AI models';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(255, 138, 51, 0.18) 0%, #f6f5f4 70%)',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div style={{ width: 16, height: 64, borderRadius: 8, background: '#ff8a33' }} />
          <div style={{ width: 16, height: 110, borderRadius: 8, background: '#ff8a33' }} />
          <div style={{ width: 16, height: 84, borderRadius: 8, background: '#ff8a33' }} />
        </div>

        <div
          style={{
            marginTop: 56,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: '-0.035em',
            color: '#0b0b0b',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          <div style={{ display: 'flex' }}>Compare 3 AI models</div>
          <div style={{ display: 'flex' }}>with one question</div>
        </div>

        <div
          style={{
            marginTop: 32,
            display: 'flex',
            fontSize: 28,
            color: '#615d59',
            letterSpacing: '-0.011em',
          }}
        >
          GPT-4o · Claude Sonnet · Gemini 2.5 Pro
        </div>
      </div>
    ),
    { ...size }
  );
}
