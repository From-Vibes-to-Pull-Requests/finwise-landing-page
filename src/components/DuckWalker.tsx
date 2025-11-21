const DuckIllustration = () => (
  <svg
    viewBox="0 0 140 90"
    role="img"
    aria-label="Animated duck"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="duck-body" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id="duck-wing" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <ellipse cx="45" cy="70" rx="18" ry="8" fill="rgba(0,0,0,0.08)" />
    <path
      d="M58 68c5 7 20 7 27 0"
      stroke="#f87171"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M20 40c-6 6-10 14-10 24 0 15 15 24 38 24 34 0 52-15 52-38 0-16-10-28-28-32"
      fill="url(#duck-body)"
    />
    <path
      d="M86 21c13 0 24 10 24 22 0 6-3 12-8 16-5 4-12 6-20 6l-7-40c3-3 7-4 11-4z"
      fill="url(#duck-wing)"
    />
    <circle cx="98" cy="24" r="15" fill="#fde68a" />
    <circle cx="106" cy="21" r="5" fill="#fff" />
    <circle cx="108" cy="19" r="2" fill="#111827" />
    <path
      d="M123 30c7 0 12-4 14-9-4-2-11-4-18-3l-6 2c0 6 4 10 10 10z"
      fill="#f97316"
    />
    <path
      d="M28 80c2-5 7-8 12-8"
      stroke="#f87171"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M54 80c2-5 7-8 12-8"
      stroke="#f87171"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const DuckWalker: React.FC = () => {
  return (
    <div className="duck-walker" aria-hidden="true">
      <div className="duck-walker__track">
        <div className="duck-walker__cross">
          <div className="duck-walker__duck">
            <DuckIllustration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuckWalker;

