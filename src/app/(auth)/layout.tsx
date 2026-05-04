export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ghost-white px-6">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(255, 138, 51, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
