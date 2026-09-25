import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  variant = 'auto'
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-13 h-13 sm:w-14 sm:h-14',
    xl: 'w-20 h-20 sm:w-22 sm:h-22'
  }[size];

  const textSizes = {
    sm: 'text-base sm:text-lg tracking-normal',
    md: 'text-xl sm:text-2xl tracking-normal',
    lg: 'text-2xl sm:text-3xl tracking-normal',
    xl: 'text-4xl sm:text-5xl tracking-tight'
  }[size];

  const farmTextColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-slate-900 dark:text-white'
      : 'text-slate-900 dark:text-white';

  const officialMascotPath = '/src/assets/images/farmzen_official_mascot_logo_1790308866984.jpg';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none shrink-0 whitespace-nowrap overflow-visible ${className}`}>
      {/* Official Cartoon Farmer Emblem Badge */}
      <div className={`relative ${iconDimensions} rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 via-emerald-400 to-amber-300 shadow-md flex items-center justify-center shrink-0 overflow-visible`}>
        <img
          src={officialMascotPath}
          alt="FARMZEN Mascot Farmer Emblem"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Subtle breathing aura */}
        <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-sm pointer-events-none" />
      </div>

      {/* Brand Text - Unbreakable, unclipped full brand name */}
      <div className="flex flex-col justify-center leading-none shrink-0 whitespace-nowrap overflow-visible">
        <div className="flex items-center shrink-0 whitespace-nowrap font-brand font-black">
          <span className={`${textSizes} ${farmTextColor} font-black drop-shadow-sm`}>
            FARM
          </span>
          <span className={`${textSizes} text-emerald-500 dark:text-emerald-400 font-black ml-0.5 drop-shadow-sm`}>
            ZEN
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-wider text-emerald-600 dark:text-emerald-300 font-semibold uppercase mt-0.5 whitespace-nowrap">
            Decide Better · Farm Smarter · Sell Better
          </span>
        )}
      </div>
    </div>
  );
};
