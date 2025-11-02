"use client";

import { useState } from 'react';

const servicesData = [
  {
    title: "Web Design",
    tags: ["Landing", "Brochure Site", "Corporate Website", "E-Commerce", "Web 3.0", "UI/UX Design"],
    description: "We create world-class websites using modern design practices. Mobile-first websites and web experiences are essential to the success of your web project. While maintaining bespoke originality, our team will focus on responsive design and optimize your website for any device and interface. Your new website will attract desirable target audiences, boost engagement, drive sales, and increase the brand value of your business.",
    link: "/services/web-design",
  },
  {
    title: "Branding",
    tags: [],
    description: "Our branding team will excel at presenting your business in its best light. Whether you’re looking to attract a new set of eyes, rekindle an old client base, or simply refine your business’s identity - our creatives will formulate the optimal corporate identity, collateral designs, and brand guidelines unique to your company’s needs. Armed with your new bespoke brand - you will now be able to captivate engaged new audiences and capitalize on your company’s full potential.",
    link: "/services/branding",
  },
  {
    title: "Graphic Design",
    tags: [],
    description: "Our innovative graphic design team will create the digital and print designs for your project. Having both startup and enterprise experience, our designers consider differing execution and audience demographics when designing a pixel-perfect graphic for each unique client challenge. Following an existing brand guideline or a specific reference in mind, our team will deliver a sleek, clean design within timeline and budget.",
    link: "/services/graphic-design",
  },
  {
    title: "Packaging Design",
    tags: [],
    description: "Experienced with top-grade packaging design for a wide range of products from consumer goods to startup ideas. Your packaging design will exceed all expectations with fresh yet pragmatic design ideas realistic to produce by the creatives at DD.NYC®. Packaging design is what makes us fall in love with some of our favorite products. Make yours a favorite.",
    link: "/services/packaging-design",
  },
  {
    title: "Video Production",
    tags: [],
    description: "DD.NYC® specializes in video production since 2015 in Manhattan, our talented team leverages over 30 years of combined experience working with advertising agencies and brands to create exceptional visual narratives. We are dedicated to video excellence, crafting impactful content that authentically engages audiences and elevates brands.",
    link: "/services/video-production",
  },
];

const ServicesList = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeService = servicesData[activeIndex];

    const opacities = [1, 0.4, 0.25, 0.15, 0.1];

    return (
        <section className="bg-background-primary py-24 sm:py-32">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                <div className="border-t border-divider-border pt-4">
                    <h2 className="font-body text-xs font-medium uppercase tracking-[0.05em] text-text-muted">
                        DD.NYC® Creative Services
                    </h2>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
                    <div>
                        <ol>
                            {servicesData.map((service, index) => {
                                const distance = Math.abs(index - activeIndex);
                                const opacity = opacities[Math.min(distance, opacities.length - 1)];

                                return (
                                    <li
                                        key={service.title}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        className="flex gap-x-8 py-5 cursor-pointer"
                                    >
                                        <span className="font-display text-lg text-[#CCCCCC] pt-3">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3
                                            className="font-display font-medium text-5xl xl:text-6xl text-text-primary transition-opacity duration-300 ease-in-out"
                                            style={{ opacity }}
                                        >
                                            {service.title}
                                        </h3>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    <div className="relative mt-12 lg:mt-[2.1rem] min-h-[300px] lg:min-h-[350px]">
                         <div
                            key={activeIndex}
                            className="flex flex-col animate-in fade-in duration-500"
                         >
                            {activeService.tags.length > 0 && (
                               <div className="flex flex-wrap gap-2 mb-8">
                                   {activeService.tags.map((tag) => (
                                       <span key={tag} className="bg-background-light-gray text-black text-sm font-medium px-4 py-[6px] rounded-full leading-tight">
                                           {tag}
                                       </span>
                                   ))}
                               </div>
                            )}
                            <p className="text-base text-text-secondary leading-[1.7]">
                               {activeService.description}
                            </p>
                            <a href={activeService.link} className="text-primary-accent font-semibold mt-8 text-base hover:underline">
                                Learn more &gt;
                            </a>
                            <div className="border-b border-divider-border mt-12 w-24"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesList;