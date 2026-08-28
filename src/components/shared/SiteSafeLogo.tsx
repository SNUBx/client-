import React from 'react';

interface SiteSafeLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  theme?: 'dark' | 'light' | 'monochrome-white' | 'monochrome-black' | 'amber-glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const SiteSafeLogo: React.FC<SiteSafeLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  showTagline = false,
  className = ''
}) => {
  // Icon dimensions
  const dimensions = {
    sm: { icon: 28, textMain: 'text-base', textSub: 'text-[9px]', gap: 'gap-2.5' },
    md: { icon: 38, textMain: 'text-xl', textSub: 'text-[11px]', gap: 'gap-3' },
    lg: { icon: 52, textMain: 'text-2xl', textSub: 'text-xs', gap: 'gap-4' },
    xl: { icon: 72, textMain: 'text-4xl', textSub: 'text-sm', gap: 'gap-5' },
  }[size];

  // Theme color definitions
  const themeStyles = {
    dark: {
      shieldStroke: '#F59E0B',      // Safety Amber
      shieldFill: '#0F172A',        // Slate Navy
      rafterPrimary: '#F59E0B',     // Amber
      rafterSecondary: '#38BDF8',   // Sky Cyan accent
      rafterAccent: '#10B981',      // Signal Green dot
      textTitle: 'text-slate-100',
      textAccent: 'text-amber-400',
      textSub: 'text-slate-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    light: {
      shieldStroke: '#D97706',
      shieldFill: '#F8FAFC',
      rafterPrimary: '#D97706',
      rafterSecondary: '#0284C7',
      rafterAccent: '#059669',
      textTitle: 'text-slate-900',
      textAccent: 'text-amber-600',
      textSub: 'text-slate-600',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    'monochrome-white': {
      shieldStroke: '#FFFFFF',
      shieldFill: '#000000',
      rafterPrimary: '#FFFFFF',
      rafterSecondary: '#FFFFFF',
      rafterAccent: '#FFFFFF',
      textTitle: 'text-white',
      textAccent: 'text-white',
      textSub: 'text-slate-300',
      badgeBg: 'bg-white/10 text-white border-white/20',
    },
    'monochrome-black': {
      shieldStroke: '#0F172A',
      shieldFill: '#FFFFFF',
      rafterPrimary: '#0F172A',
      rafterSecondary: '#0F172A',
      rafterAccent: '#0F172A',
      textTitle: 'text-slate-950',
      textAccent: 'text-slate-950',
      textSub: 'text-slate-700',
      badgeBg: 'bg-slate-200 text-slate-900 border-slate-300',
    },
    'amber-glow': {
      shieldStroke: '#FBBF24',
      shieldFill: '#1E1B4B',
      rafterPrimary: '#F59E0B',
      rafterSecondary: '#FCD34D',
      rafterAccent: '#34D399',
      textTitle: 'text-amber-100',
      textAccent: 'text-amber-400',
      textSub: 'text-amber-200/70',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    }
  }[theme];

  const iconSvg = (
    <svg
      width={dimensions.icon}
      height={dimensions.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      id="ssa-logo-vector-mark"
    >
      {/* Outer Equilateral Hexagonal Shield */}
      <polygon
        points="50,4 92,26 92,74 50,96 8,74 8,26"
        fill={themeStyles.shieldFill}
        stroke={themeStyles.shieldStroke}
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Internal Geometry: Interlocking Structural Rafters forming S & A Monogram */}
      {/* Left Rafter / S-Curve Flow */}
      <path
        d="M 32 30 L 68 30 L 32 50 L 68 50 L 32 70 L 68 70"
        stroke={themeStyles.rafterPrimary}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Keystone / Apex Alliance Diamond */}
      <path
        d="M 50 16 L 62 26 L 50 36 L 38 26 Z"
        fill={themeStyles.rafterPrimary}
        opacity="0.9"
      />

      {/* Precision Structural Alignment Accent (Signal Verification Point) */}
      <circle
        cx="50"
        cy="50"
        r="4.5"
        fill={themeStyles.rafterAccent}
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{iconSvg}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${dimensions.gap} ${className}`}>
        {iconSvg}
        <div className="flex flex-col items-center">
          <div className={`font-display font-extrabold tracking-tight ${dimensions.textMain} leading-none ${themeStyles.textTitle}`}>
            SITE<span className={themeStyles.textAccent}>SAFE</span>
          </div>
          <div className={`font-sans font-semibold tracking-[0.22em] uppercase mt-1 ${dimensions.textSub} ${themeStyles.textSub}`}>
            ALLIANCE
          </div>
          {showTagline && (
            <div className={`mt-1.5 px-2 py-0.5 rounded text-[9px] font-medium border ${themeStyles.badgeBg}`}>
              UK ACCREDITED SAFETY HUB
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal Lockup
  return (
    <div className={`inline-flex items-center ${dimensions.gap} ${className} group`}>
      {iconSvg}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-extrabold tracking-tight ${dimensions.textMain} ${themeStyles.textTitle}`}>
            SITE<span className={themeStyles.textAccent}>SAFE</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`font-sans font-semibold tracking-[0.24em] uppercase ${dimensions.textSub} ${themeStyles.textSub} leading-none`}>
            ALLIANCE
          </span>
          {showTagline && (
            <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-semibold tracking-wider uppercase border ${themeStyles.badgeBg}`}>
              CITB ATO
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
