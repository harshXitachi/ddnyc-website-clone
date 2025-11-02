import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const HeartIcon = () => (
  <a
    href="#"
    aria-label="Heart icon"
    className="absolute z-10 group"
    style={{
      top: '50%',
      left: 'calc(50% + 140px)',
      transform: 'translate(-50%, -50%) scale(0.7) md:scale(0.9) lg:scale(1)',
    }}
  >
    <div className="relative w-[140px] h-[140px]">
      <div
        className="absolute w-[90px] h-[90px] bg-primary-accent transform rotate-45 top-[4px] left-[22px] transition-transform duration-300 group-hover:scale-105"
      />
      <div
        className="absolute w-[90px] h-[90px] bg-primary-accent transform rotate-45 top-[22px] left-[4px] transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className="absolute text-white text-[10px] uppercase font-medium tracking-widest whitespace-nowrap"
        style={{
          bottom: '42px',
          left: '-20px',
          transform: 'rotate(-45deg)',
        }}
      >
        Don't press this heart
      </span>
    </div>
  </a>
);

const ClutchReview = () => (
  <div className="absolute top-12 right-12 z-20 hidden lg:flex items-center space-x-4 bg-white p-3 border border-neutral-200">
    <div className="pr-4 border-r border-neutral-200">
      <p className="text-[10px] text-neutral-500 uppercase font-semibold tracking-wider mb-1">Reviewed on</p>
      <Image
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/clutch-1.svg"
        alt="Clutch logo"
        width={66}
        height={18}
      />
    </div>
    <div className="text-left">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={15} className="text-[#00B26F] fill-current" />
        ))}
      </div>
      <p className="text-xs text-neutral-600 mt-1">54 reviews</p>
    </div>
  </div>
);

const Plus = ({ className }: { className?: string }) => (
  <div className={`absolute text-neutral-400 text-2xl font-thin hidden lg:block z-0 ${className}`}>
    +
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative bg-secondary overflow-hidden">
      {/* Diagonal background lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute h-px bg-neutral-200/70"
          style={{ width: '150vmax', top: '25%', left: '-25vmax', transform: 'rotate(-30deg)' }}
        />
        <div
          className="absolute h-px bg-neutral-200/70 flex items-center justify-end"
          style={{ width: '150vmax', top: '65%', left: '-25vmax', transform: 'rotate(-30deg)' }}
        >
          <span className="text-neutral-500 text-sm tracking-[0.2em] uppercase" style={{ paddingRight: '60vmax' }}>
            Innovating in your industry
          </span>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex items-center justify-center min-h-screen text-center py-24">
          <Plus className="top-24 left-24" />
          <ClutchReview />

          <div className="relative max-w-5xl mx-auto">
            <h1 className="font-display font-bold text-black text-[3rem] md:text-5xl lg:text-[5.25rem] leading-[1.1] -tracking-[0.03em]">
              Creative design agency,
              <br />
              located in the heart of NYC.
            </h1>
            <HeartIcon />
          </div>

          <Plus className="bottom-24 right-24" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;