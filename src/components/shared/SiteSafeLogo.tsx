import React from 'react';

interface SiteSafeLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  theme?: 'dark' | 'light' | 'monochrome-white' | 'monochrome-black' | 'powder-blue';
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

  // Refined Color definitions using Deep Navy (#263B52) and Powder Blue (#78A6B8)
  const themeStyles = {
    dark: {
      shieldStroke: '#78A6B8',       // Powder Blue
      shieldFill: '#1B2A3B',         // Deep Navy Shade
      shieldBase: '#263B52',         // Deep Navy Core
      connectionPrimary: '#78A6B8',  // Powder Blue
      connectionSecondary: '#9BC1CF',// Powder Blue Light Tint for contrast
      connectionTertiary: '#263B52', // Deep Navy
      nodeCore: '#FFFFFF',          // Crisp White Node
      textTitle: 'text-slate-100',
      textAccent: 'text-[#78A6B8]',
      textSub: 'text-slate-400',
      badgeBg: 'bg-[#78A6B8]/15 text-[#9BC1CF] border-[#78A6B8]/30',
      pulseDot: '#78A6B8'
    },
    light: {
      shieldStroke: '#263B52',       // Deep Navy
      shieldFill: '#F4F8FA',         // Light Powder Canvas
      shieldBase: '#E3ECF1',         // Soft Powder Slate
      connectionPrimary: '#263B52',  // Deep Navy Core
      connectionSecondary: '#78A6B8',// Powder Blue
      connectionTertiary: '#4F7788', // Mid Powder Blue for high contrast
      nodeCore: '#263B52',          // Deep Navy Node
      textTitle: 'text-[#263B52]',
      textAccent: 'text-[#78A6B8]',
      textSub: 'text-slate-600',
      badgeBg: 'bg-[#263B52]/10 text-[#263B52] border-[#263B52]/20',
      pulseDot: '#78A6B8'
    },
    'monochrome-white': {
      shieldStroke: '#FFFFFF',
      shieldFill: 'transparent',
      shieldBase: '#FFFFFF',
      connectionPrimary: '#FFFFFF',
      connectionSecondary: '#FFFFFF',
      connectionTertiary: '#FFFFFF',
      nodeCore: '#FFFFFF',
      textTitle: 'text-white',
      textAccent: 'text-white',
      textSub: 'text-slate-300',
      badgeBg: 'bg-white/10 text-white border-white/20',
      pulseDot: '#FFFFFF'
    },
    'monochrome-black': {
      shieldStroke: '#263B52',
      shieldFill: 'transparent',
      shieldBase: '#263B52',
      connectionPrimary: '#263B52',
      connectionSecondary: '#263B52',
      connectionTertiary: '#263B52',
      nodeCore: '#263B52',
      textTitle: 'text-[#263B52]',
      textAccent: 'text-[#263B52]',
      textSub: 'text-slate-700',
      badgeBg: 'bg-slate-200 text-slate-900 border-slate-300',
      pulseDot: '#263B52'
    },
    'powder-blue': {
      shieldStroke: '#9BC1CF',
      shieldFill: '#263B52',
      shieldBase: '#1B2A3B',
      connectionPrimary: '#78A6B8',
      connectionSecondary: '#FFFFFF',
      connectionTertiary: '#9BC1CF',
      nodeCore: '#FFFFFF',
      textTitle: 'text-white',
      textAccent: 'text-[#9BC1CF]',
      textSub: 'text-[#A1C4D4]',
      badgeBg: 'bg-[#78A6B8]/20 text-[#9BC1CF] border-[#78A6B8]/40',
      pulseDot: '#9BC1CF'
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
      id="ssa-abstract-connection-logo"
    >
      {/* Outer Hexagonal Foundation Shield */}
      <polygon
        points="50,6 89,27 89,73 50,94 11,73 11,27"
        fill={themeStyles.shieldFill}
        stroke={themeStyles.shieldStroke}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Abstract Interlocking Connection Network (Deep Navy & Powder Blue) */}
      
      {/* Structural Deep Navy Connection Arch: Apex down to Right Base */}
      <path
        d="M 50 24 C 67 24, 76 39, 72 66"
        stroke={themeStyles.connectionPrimary}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Fluid Powder Blue Connection Ribbon: Left Base around through Apex */}
      <path
        d="M 28 66 C 24 39, 33 24, 50 24"
        stroke={themeStyles.connectionSecondary}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Cross-Alliance Foundation Link: Left Base to Right Base */}
      <path
        d="M 28 66 C 36 78, 64 78, 72 66"
        stroke={themeStyles.connectionTertiary}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Central Infinity Interlock / Nexus Hub */}
      <path
        d="M 38 46 C 44 38, 56 38, 62 46 C 68 54, 56 64, 50 64 C 44 64, 32 54, 38 46 Z"
        stroke={themeStyles.connectionSecondary}
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />

      {/* Three Primary Connection Nodes (Candidate, Employer, Training Authority) */}
      {/* Top Node (Accreditation Authority) */}
      <circle cx="50" cy="24" r="5.5" fill={themeStyles.connectionPrimary} stroke={themeStyles.nodeCore} strokeWidth="2" />
      
      {/* Left Node (Site Operative / Candidate) */}
      <circle cx="28" cy="66" r="5.5" fill={themeStyles.connectionSecondary} stroke={themeStyles.nodeCore} strokeWidth="2" />
      
      {/* Right Node (Corporate Employer / Site) */}
      <circle cx="72" cy="66" r="5.5" fill={themeStyles.connectionPrimary} stroke={themeStyles.nodeCore} strokeWidth="2" />

      {/* Central Harmonic Nexus Point */}
      <circle cx="50" cy="51" r="3.5" fill={themeStyles.nodeCore} />
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
          <div className={`font-sans font-semibold tracking-[0.24em] uppercase mt-1 ${dimensions.textSub} ${themeStyles.textSub}`}>
            ALLIANCE
          </div>
          {showTagline && (
            <div className={`mt-1.5 px-2.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase border ${themeStyles.badgeBg}`}>
              CITB ATO #9841
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
          <span 
            className="inline-block w-2 h-2 rounded-full animate-pulse" 
            style={{ backgroundColor: themeStyles.pulseDot }}
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`font-sans font-semibold tracking-[0.26em] uppercase ${dimensions.textSub} ${themeStyles.textSub} leading-none`}>
            ALLIANCE
          </span>
          {showTagline && (
            <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase border ${themeStyles.badgeBg}`}>
              CITB ATO
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

