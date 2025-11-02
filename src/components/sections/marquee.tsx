import React from 'react';

const marqueeItems = [
  "Award-Winning Design Agency in New York",
  "User-Centered Design for Your Business",
  "50+ Design Awards",
  "Top-Rated Digital & Print Design",
  "5-Star Clutch Rating",
  "Top Systems - Figma, Adobe, Geometry, Texture",
  "AGILE Process",
  "M/WBE-Certified",
  "Digital Design Agency of the Year",
  "2024 & 2023 Webby Nominee",
];

const MarqueeContent = () => (
  <div className="flex flex-shrink-0 items-center">
    {marqueeItems.map((item, index) => (
      <div key={index} className="flex items-center">
        <span className="whitespace-nowrap text-base font-medium text-black">
          {item}
        </span>
        <span className="mx-6 text-base font-medium text-black" aria-hidden>
          ◆
        </span>
      </div>
    ))}
  </div>
);

const Marquee = () => {
  return (
    <section className="bg-white border-y border-[#DDDDDD] py-6 overflow-hidden">
      <div className="flex motion-safe:animate-marquee">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
};

export default Marquee;