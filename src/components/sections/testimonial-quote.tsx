import React from 'react';

const TestimonialQuote = () => {
  return (
    <section className="bg-background-primary py-20 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-8 md:px-6">
        <div className="text-center">
          <blockquote className="relative inline-block font-display text-[36px] leading-[1.2] text-text-secondary md:text-6xl md:leading-[1.15]">
            <span
              className="absolute top-0 left-0 -translate-y-[20%] -translate-x-3/4 text-primary-accent font-display text-[80px] leading-none md:text-[120px] lg:text-[160px]"
              aria-hidden="true"
            >
              “
            </span>
            <span className="text-text-primary">DD.NYC®</span> – Crafting
            Unforgettable Brands with Strategic Design, Innovation, and
            Impact.
            <span
              className="absolute bottom-0 right-0 translate-y-[20%] translate-x-3/4 text-primary-accent font-display text-[80px] leading-none md:text-[120px] lg:text-[160px]"
              aria-hidden="true"
            >
              ”
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;