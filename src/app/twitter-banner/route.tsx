import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#02093a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse 60% 120% at 80% 50%, rgba(255, 138, 51, 0.14) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse 40% 80% at 20% 50%, rgba(255, 138, 51, 0.07) 0%, transparent 60%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 120,
            marginRight: 80,
            flexShrink: 0,
          }}
        >
          <svg width="130" height="130" viewBox="0 0 32 32" fill="none">
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

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            width: 1,
            height: 160,
            background: 'rgba(255, 255, 255, 0.1)',
            marginRight: 80,
            flexShrink: 0,
          }}
        />

        {/* Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.035em',
              lineHeight: 1,
            }}
          >
            Polymind
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 34,
              color: 'rgba(255, 255, 255, 0.75)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            One prompt. Every top AI. Pick the best.
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 24,
              gap: 12,
              alignItems: 'center',
            }}
          >
            {['GPT', 'Claude', 'Gemini'].map((model, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {i > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      width: 3,
                      height: 3,
                      borderRadius: 9999,
                      background: 'rgba(255, 138, 51, 0.5)',
                    }}
                  />
                )}
                <div
                  style={{
                    display: 'flex',
                    fontSize: 22,
                    color: 'rgba(255, 138, 51, 0.8)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {model}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* URL bottom-right */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            bottom: 48,
            right: 80,
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.01em',
          }}
        >
          usepolymind.app
        </div>
      </div>
    ),
    {
      width: 1500,
      height: 500,
    }
  );
}
