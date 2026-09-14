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
  theme = 'light',
  size = 'md',
  showTagline = false,
  className = ''
}) => {
  // Icon dimensions
  const dimensions = {
    sm: { icon: 30, textMain: 'text-xs sm:text-sm tracking-[0.16em]', textLtd: 'text-[9px] tracking-[0.2em]', ruleWidth: 'w-4', gap: 'gap-2.5' },
    md: { icon: 40, textMain: 'text-sm sm:text-base tracking-[0.18em]', textLtd: 'text-[10px] tracking-[0.24em]', ruleWidth: 'w-6 sm:w-8', gap: 'gap-3' },
    lg: { icon: 54, textMain: 'text-lg sm:text-xl tracking-[0.2em]', textLtd: 'text-xs tracking-[0.26em]', ruleWidth: 'w-8 sm:w-12', gap: 'gap-3.5' },
    xl: { icon: 76, textMain: 'text-2xl sm:text-3xl tracking-[0.22em]', textLtd: 'text-sm tracking-[0.28em]', ruleWidth: 'w-12 sm:w-16', gap: 'gap-4' },
  }[size];

  // Colors based on user image ("OPTION 3 ABSTRACT CONNECTION"):
  // Navy bracket: #0A192F
  // Slate/steel blue bracket: #4A7C9F
  // Central diagonal accent bar: #7289A0
  const themeColors = {
    light: {
      navy: '#0A192F',
      blue: '#4A7C9F',
      accent: '#7289A0',
      textMain: 'text-[#0A192F]',
      textLtd: 'text-[#0A192F]',
      ruleColor: 'bg-[#0A192F]/50',
      taglineBadge: 'bg-[#0A192F]/5 text-[#0A192F] border-[#0A192F]/20',
    },
    dark: {
      navy: '#78A6B8',
      blue: '#4A7C9F',
      accent: '#E2E8F0',
      textMain: 'text-white',
      textLtd: 'text-slate-300',
      ruleColor: 'bg-slate-400/50',
      taglineBadge: 'bg-white/10 text-white border-white/20',
    },
    'monochrome-white': {
      navy: '#FFFFFF',
      blue: '#FFFFFF',
      accent: '#FFFFFF',
      textMain: 'text-white',
      textLtd: 'text-white',
      ruleColor: 'bg-white/60',
      taglineBadge: 'bg-white/10 text-white border-white/20',
    },
    'monochrome-black': {
      navy: '#0A192F',
      blue: '#0A192F',
      accent: '#0A192F',
      textMain: 'text-[#0A192F]',
      textLtd: 'text-[#0A192F]',
      ruleColor: 'bg-[#0A192F]/60',
      taglineBadge: 'bg-[#0A192F]/10 text-[#0A192F] border-[#0A192F]/30',
    },
    'powder-blue': {
      navy: '#FFFFFF',
      blue: '#9BC1CF',
      accent: '#78A6B8',
      textMain: 'text-white',
      textLtd: 'text-[#9BC1CF]',
      ruleColor: 'bg-[#9BC1CF]/50',
      taglineBadge: 'bg-[#78A6B8]/20 text-[#9BC1CF] border-[#78A6B8]/40',
    },
  }[theme];

  // SVG Mark matching user's Option 3 "Abstract Connection"
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
      <g transform="translate(50, 50) rotate(45)">
        {/* Top-Left Dark Navy Bracket */}
        <path
          d="M -32 -32 L -6 -32 L -6 -20 L -20 -20 L -20 20 L -6 20 L -6 32 L -32 32 Z"
          fill={themeColors.navy}
        />

        {/* Bottom-Right Steel Blue Bracket */}
        <path
          d="M 32 32 L 6 32 L 6 20 L 20 20 L 20 -20 L 6 -20 L 6 -32 L 32 -32 Z"
          fill={themeColors.blue}
        />

        {/* Central Diagonal Connection Bar */}
        <rect
          x="-4.5"
          y="-11"
          width="9"
          height="22"
          rx="1.5"
          fill={themeColors.accent}
        />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {iconSvg}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${dimensions.gap} ${className} group`}>
        {iconSvg}
        <div className="flex flex-col items-center space-y-1">
          <div className={`font-display font-extrabold uppercase ${dimensions.textMain} leading-tight ${themeColors.textMain}`}>
            SITE SAFE ALLIANCE
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className={`h-[1px] ${dimensions.ruleWidth} ${themeColors.ruleColor}`} />
            <span className={`font-sans font-bold uppercase ${dimensions.textLtd} ${themeColors.textLtd}`}>
              LTD
            </span>
            <span className={`h-[1px] ${dimensions.ruleWidth} ${themeColors.ruleColor}`} />
          </div>
          {showTagline && (
            <div className={`mt-1 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase border ${themeColors.taglineBadge}`}>
              CITB ATO #9841
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal Lockup
  return (
    <div className={`inline-flex items-center ${dimensions.gap} ${className} group cursor-pointer`}>
      {iconSvg}
      <div className="flex flex-col justify-center">
        <div className={`font-display font-extrabold uppercase ${dimensions.textMain} leading-none ${themeColors.textMain}`}>
          SITE SAFE ALLIANCE
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`h-[1px] ${dimensions.ruleWidth} ${themeColors.ruleColor}`} />
          <span className={`font-sans font-bold uppercase ${dimensions.textLtd} ${themeColors.textLtd} leading-none`}>
            LTD
          </span>
          <span className={`h-[1px] ${dimensions.ruleWidth} ${themeColors.ruleColor}`} />
          {showTagline && (
            <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase border ${themeColors.taglineBadge}`}>
              CITB ATO
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

