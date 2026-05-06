import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Polymind — Compare top AI models';

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
        <div style={{ display: 'flex', position: 'relative', width: 200, height: 200 }}>
          <svg width="200" height="200" viewBox="0 0 32 32" fill="none">
            <g stroke="#ff8a33" strokeWidth="1.1" strokeLinecap="round">
              <line x1="16" y1="16" x2="16" y2="5" />
              <line x1="16" y1="16" x2="27" y2="10" />
              <line x1="16" y1="16" x2="24.5" y2="25.5" />
              <line x1="16" y1="16" x2="8" y2="26" />
              <line x1="16" y1="16" x2="5" y2="13" />
            </g>
            <circle cx="16" cy="16" r="3" fill="#ff8a33" />
            <circle cx="16" cy="5" r="1.9" fill="#ff8a33" />
            <circle cx="27" cy="10" r="1.9" fill="#ff8a33" />
            <circle cx="24.5" cy="25.5" r="1.9" fill="#ff8a33" />
            <circle cx="8" cy="26" r="1.9" fill="#ff8a33" />
            <circle cx="5" cy="13" r="1.9" fill="#ff8a33" />
          </svg>
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
          <div style={{ display: 'flex' }}>Polymind</div>
        </div>

        <div
          style={{
            marginTop: 16,
            display: 'flex',
            fontSize: 36,
            color: '#0b0b0b',
            letterSpacing: '-0.024em',
          }}
        >
          Compare top AI models
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
          GPT · Claude · Gemini, side by side
        </div>
      </div>
    ),
    { ...size }
  );
}
