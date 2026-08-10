export function WebGLFallback() {
  return (
    <div className="webgl-fallback" aria-hidden="true">
      <div className="fallback-glow fallback-glow-a" />
      <div className="fallback-glow fallback-glow-b" />
      <svg viewBox="0 0 700 620" className="fallback-pipes" role="presentation">
        <defs>
          <linearGradient id="pipeMetal" x1="0" x2="1">
            <stop offset="0" stopColor="#45515f" />
            <stop offset="0.28" stopColor="#dce1e4" />
            <stop offset="0.55" stopColor="#647181" />
            <stop offset="0.78" stopColor="#f0f1ef" />
            <stop offset="1" stopColor="#394554" />
          </linearGradient>
          <linearGradient id="brass" x1="0" x2="1">
            <stop offset="0" stopColor="#7f673e" />
            <stop offset="0.45" stopColor="#d6bf8e" />
            <stop offset="1" stopColor="#8e7445" />
          </linearGradient>
          <filter id="softShadow"><feDropShadow dx="0" dy="20" stdDeviation="18" floodOpacity=".36" /></filter>
        </defs>
        <g fill="none" strokeLinecap="round" filter="url(#softShadow)">
          <path d="M92 450 V218 Q92 164 146 164 H324 Q378 164 378 218 V292 Q378 346 432 346 H606" stroke="#111b26" strokeWidth="48" opacity=".7" />
          <path d="M92 450 V218 Q92 164 146 164 H324 Q378 164 378 218 V292 Q378 346 432 346 H606" stroke="url(#pipeMetal)" strokeWidth="30" />
          <path d="M214 514 V398 Q214 360 252 360 H324" stroke="#111b26" strokeWidth="42" opacity=".75" />
          <path d="M214 514 V398 Q214 360 252 360 H324" stroke="url(#pipeMetal)" strokeWidth="26" />
          <path d="M470 150 V256" stroke="#111b26" strokeWidth="42" opacity=".75" />
          <path d="M470 150 V256" stroke="url(#pipeMetal)" strokeWidth="26" />
        </g>
        <g transform="translate(470 254)">
          <circle r="54" fill="#111923" stroke="url(#brass)" strokeWidth="15" />
          <circle r="20" fill="url(#brass)" />
          <path d="M-41 0 H41 M0-41 V41" stroke="#d4bd8e" strokeWidth="10" strokeLinecap="round" />
        </g>
        <g transform="translate(376 348)">
          <rect x="-29" y="-28" width="58" height="56" rx="8" fill="url(#brass)" />
          <circle r="10" fill="#17212c" />
        </g>
        <g transform="translate(342 120)">
          <circle r="72" fill="#09131e" stroke="#a58a58" strokeWidth="2" />
          <circle r="62" fill="#0d1824" stroke="#d5dadd" strokeOpacity=".3" />
          <text textAnchor="middle" dominantBaseline="central" fill="#d4bd8e" fontFamily="Barlow Condensed, sans-serif" fontSize="42" fontWeight="700" letterSpacing="4">JDC</text>
        </g>
      </svg>
      <div className="fallback-caption">PLUMBING • DRAINAGE • GAS</div>
    </div>
  );
}
