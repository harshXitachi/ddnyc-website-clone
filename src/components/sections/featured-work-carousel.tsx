"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Project = {
  title: string;
  href: string;
  imageSrc: string;
  tags: string[];
  alt: string;
};

const projects: Project[] = [
  {
    title: "Antidote – Luxury Candle Branding & Packaging Design",
    href: "https://dd.nyc/work/antidote-luxury-candle-branding-packaging-design/",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/AD-800x423-1-1.webp",
    tags: ["Packaging Design", "Branding", "Luxury", "CPG"],
    alt: "DD.NYC® Luxury Candles Branding and Packaging Design"
  },
  {
    title: "SJP Properties Real Estate Web Design",
    href: "https://dd.nyc/work/sjp-properties/",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/DD_NYC-SJP-800-x-423-1-2.jpg",
    tags: ["Web Design", "UI/UX", "Luxury", "Real Estate"],
    alt: ""
  },
  {
    title: "New York City FC Etihad Park Stadium – Website Design & Development",
    href: "https://dd.nyc/work/new-york-city-football-club-stadium/",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/Stadium_800_423-3.gif",
    tags: ["Web Design", "Web Development", "UI/UX", "3D Design", "Custom Animations"],
    alt: "NYCFC New York City Stadium by DD.NYC®"
  },
  {
    title: "FIFA World Cup 2026™ NYNJ Website Design",
    href: "https://dd.nyc/work/fifa-world-cup-2026-website-design/",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/2FIFA-800-x-423-4.webp",
    tags: ["Web Design", "Web Development", "Event Design"],
    alt: "FIFA World Cup 2026™ NYNJ Website Design by DD.NYC"
  },
  {
    title: "IvyWise Education Consultancy",
    href: "https://dd.nyc/work/ivywise-education-consultancy/",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/IW-800x423-1-5.webp",
    tags: ["Branding", "Brand Collateral", "Web Design", "Video Production"],
    alt: "IvyWise Education Consultancy Branding & Website Design by DD.NYC®"
  },
  {
    title: "WillowWood Global Medical Branding",
    href: "https://dd.nyc/work/willowwood-global-medical-branding/",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/800_x_423-6.webp",
    tags: ["Branding", "Brand Collateral", "3D Design", "Motion Graphics", "Web Design"],
    alt: ""
  },
  {
    title: "BAS Stone",
    href: "https://dd.nyc/work/bas-stone/",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/dd_nyc_bas_800_x_423-7.webp",
    tags: ["Web Design", "UI/UX", "Luxury"],
    alt: ""
  },
];

const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
  <button
    className={`h-0.5 w-10 transition-colors duration-300 ${selected ? 'bg-black' : 'bg-[#d9d9d9]'}`}
    type="button"
    onClick={onClick}
    aria-label={`Go to slide ${selected ? ' (current)' : ''}`}
  />
);

const FeaturedWorkCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-background-primary overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto pt-4 pb-24 md:pb-40 px-5 md:px-20">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {projects.map((project, index) => (
              <div className="flex-[0_0_100%] min-w-0 pl-4" key={index}>
                <div className="relative group overflow-hidden aspect-[800/423]">
                  <a href={project.href} className="block w-full h-full" target="_blank" rel="noopener noreferrer">
                    <Image
                      src={project.imageSrc}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </a>
                  <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 text-right pointer-events-none">
                    <div className="pointer-events-auto">
                      <h3 className="font-display text-xl md:text-2xl font-medium text-text-primary mb-3 max-w-md ml-auto">
                        <a href={project.href} className="hover:underline" target="_blank" rel="noopener noreferrer">
                          {project.title}
                        </a>
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="bg-[#ECECEC] text-black text-xs font-medium px-3 py-1.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center mt-6 gap-x-8">
            <div className="hidden md:flex items-center gap-2">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
            <div className="flex items-center gap-4 text-text-secondary">
                <span className="text-base text-black">
                    {String(selectedIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(scrollSnaps.length).padStart(2, '0')}
                </span>
                <div className="flex gap-1">
                    <button onClick={scrollPrev} aria-label="Previous slide" className="text-text-primary hover:text-primary-accent transition-colors p-1">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={scrollNext} aria-label="Next slide" className="text-text-primary hover:text-primary-accent transition-colors p-1">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkCarousel;