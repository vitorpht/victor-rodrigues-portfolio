export function HeroAvatarPlaceholder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className="aspect-square w-full"
    >
      <defs>
        <linearGradient id="avatar-bg" x1="0" y1="0" x2="400" y2="400">
          <stop offset="0%" stopColor="#0B1120" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <radialGradient id="avatar-glow" cx="50%" cy="32%" r="60%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="avatar-circle" x1="120" y1="90" x2="280" y2="310">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#avatar-bg)" />
      <rect width="400" height="400" fill="url(#avatar-glow)" />
      <rect
        x="10"
        y="10"
        width="380"
        height="380"
        rx="18"
        stroke="var(--primary)"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="200" cy="158" r="70" fill="url(#avatar-circle)" stroke="var(--primary)" strokeWidth="1.25" />
      <text
        x="200"
        y="176"
        textAnchor="middle"
        fill="#F8FAFC"
        fontFamily="system-ui,sans-serif"
        fontSize="46"
        fontWeight="700"
        letterSpacing="-1"
      >
        VR
      </text>
      <rect x="118" y="258" width="164" height="10" rx="5" fill="var(--primary)" opacity="0.45" />
      <rect x="138" y="280" width="124" height="7" rx="3.5" fill="#64748B" opacity="0.35" />
      <rect x="152" y="298" width="96" height="7" rx="3.5" fill="#475569" opacity="0.25" />
    </svg>
  );
}
