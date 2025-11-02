"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

type Award = {
  value: string;
  title: string;
  category: string;
  description: string;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
};

const awardsData: Award[] = [
  {
    value: "item-0",
    title: "Top Firm & Best in Industry - Summer 2025",
    category: "Awards",
    description: "DD.NYC® has been honored by 50PROS as a Top Firm and Best in Industry for Summer 2025. This recognition acknowledges the agency's consistent delivery of high-quality services and outstanding performance within its industry.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/DD_NYC_C2_AE_50PROS-Awards-14.webp",
        alt: "50PROS Award",
        width: 170,
        height: 170,
      },
    ],
  },
  {
    value: "item-1",
    title: "Annual Anthem Awards X5",
    category: "Impact Awards",
    description: "Bronze & Silver & Gold X5 Winner at the Annual Anthem Awards for the Ms. Foundation - Woman of Vision Awards Gala '23 & '24 in Diversity, Equity & Inclusion - Event category; Chelsea Film Festival in Education, Art & Culture - Event category; Airatae Branding and Website - Nonprofit category; WillowWood - Health & Wellness.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/220224_AnthemAwards_079-1-15.webp",
        alt: "Anthem Awards Trophy",
        width: 170,
        height: 113,
      },
    ],
  },
  {
    value: "item-2",
    title: "2024 Clutch Global & Champion",
    category: "Recognition",
    description: "DD.NYC® has been honored as one of the top-performing B2B companies and named a Clutch Champion. This highlights our outstanding ability to deliver high-quality services and go above and beyond for our clients.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/27fae82b-drop-shadow-badge-clutch-1000-2024_10mo0h-16.webp",
        alt: "Clutch Global 2024 Badge",
        width: 170,
        height: 170
      },
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/Champion-Badge-2023-Fall-3-2-46.svg",
        alt: "Clutch Champion Badge",
        width: 170,
        height: 170
      }
    ],
  },
  {
    value: "item-3",
    title: "Pentawards X3",
    category: "Design Awards",
    description: "DD.NYC® was awarded for Excellence in Brand Packaging Design for Symphony Sleep Mattress Bed Packaging and Antidote Luxury Candle Packaging.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/image-111-1-17.webp",
        alt: "Pentawards Logo",
        width: 170,
        height: 105
      },
    ],
  },
  {
    value: "item-4",
    title: "2024’s Dieline 1st Place Award",
    category: "Design Awards",
    description: "Antidote by DD.NYC®️ - a Capsule Collection of Luxury Candles Inspired by Poisonous Reptiles",
    images: [],
  },
  {
    value: "item-5",
    title: "Clutch Global Award Winner X3",
    category: "Awards",
    description: "DD.NYC® was honored as one of the top-performing B2B companies, acknowledged within their industry and location. This recognition reflects our outstanding ability to deliver high-quality services to our clients.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/64954025-0-Clutch-Global-Badge--43.svg",
        alt: "Clutch Global Award Winner Badge",
        width: 170,
        height: 170
      },
    ],
  },
  {
    value: "item-6",
    title: "Webby Nominations X2",
    category: "Design Awards",
    description: "2024: Hawkridge Austin Luxury Land Development in Austin, Texas website\n2023: Ms. Foundation 50th Anniversary WOV Awards website",
    images: [],
  },
  {
    value: "item-7",
    title: "Behance Honors X11",
    category: "Design Awards",
    description: "DD.NYC® was awarded for excellence in various spheres of design for Branding, UI/UX, Illustrator, Stock, and Top of Behance awards.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/trophies-group-20.jpg",
        alt: "Behance Honors Trophies",
        width: 360,
        height: 240
      }
    ],
  },
  {
    value: "item-8",
    title: "Clutch Champion X3",
    category: "Recognition",
    description: "DD.NYC® has been named a Clutch Champion! This award highlights our team's dedication to going above and beyond for our clients and consistently delivering exceptional results.",
    images: [
       {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/Champion-Badge-2023-Fall-3-2-46.svg",
        alt: "Clutch Champion Badge",
        width: 170,
        height: 170
      }
    ],
  },
  {
    value: "item-9",
    title: "IMH Top 32 Web Development Agencies",
    category: "Recognition",
    description: "DD.NYC® was recognized as a top 32 leading web development agencies known for our cutting-edge technical proficiency. From custom solutions to complex integrations, the selected agencies excel in turning innovative ideas into high-performing digital platforms.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/im-08-22.png",
        alt: "IMH Top 32 Web Development Agencies Badge",
        width: 170,
        height: 170
      }
    ],
  },
  {
    value: "item-10",
    title: "UpCity Excellence & Top Web Designers Awards",
    category: "Awards",
    description: "To celebrate outstanding B2B service providers",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/UpCity-Excellence-Award-18.png",
        alt: "UpCity Excellence Award Badge",
        width: 170,
        height: 170
      }
    ],
  },
  {
    value: "item-11",
    title: "New York State Women-Owned Business Enterprise (“MWBE”)",
    category: "Certifications",
    description: "Empire State Development's Divison of Minority and Women's Business Development grants a Women Business Enterprise (WBE) pursuant to New York State Executive Law, Article 15-A to: DigitalDesign.NYC LLC d/b/a/ DD.NYC® on March 2, 2023",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/20944339_01255736_20230302122947_pdf-19.jpg",
        alt: "MWBE Certificate",
        width: 170,
        height: 120,
      }
    ],
  },
  {
    value: "item-12",
    title: "World Brand Design Society (WBDS) Commended",
    category: "Awards",
    description: "World Brand Design Society COMMENDED Award\nProject: CO2 Neutral Website Builder\nCategory: Digital\nSub Category: ACDG401 – Digital Design Creation\nAwards: WBDS Agency Design Awards 2022/23",
    images: [],
  },
  {
    value: "item-13",
    title: "Best Innovation & UI/UX Awards X2",
    category: "Awards",
    description: "CSSDA selected DD.NYC® as a winner of the \"Best Innovation\" award.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/cssda-inn-DD-NYC-21.jpg",
        alt: "CSSDA Best Innovation Award",
        width: 360,
        height: 202
      }
    ],
  },
  {
    value: "item-14",
    title: "NYC SBS Minority Women-Owned Business Enterprise",
    category: "Certifications",
    description: "Certified by Small Business Services of NYC as a Minority Women-Owned Business Enterprise, which recognizes women-owned businesses in good standing in the New York City metro area. Our Manhattan-based agency has been certified and recognized by the SBS since 2020.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/41a4c6a9c720c98f005b81f071aac206-23.png",
        alt: "NYC MWBE Certification Seal",
        width: 170,
        height: 170
      }
    ]
  },
  {
    value: "item-15",
    title: "Women Owned Businesses by Clutch",
    category: "Certifications",
    description: "Certified by Clutch as a Women-Owned Business with a stellar 5-star Clutch Top 40 Design Agency (Gold Certified) status attained with 50+ verified customer reviews and counting.",
    images: [],
  },
  {
    value: "item-16",
    title: "Awwwards Honorable Mention X11",
    category: "Awards",
    description: "Awwwards gives an Honorable Mention award to www.dd.nyc.",
    images: [
      {
        src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/certificate-dd-nyc-hm-1-24.jpg",
        alt: "Awwwards Honorable Mention certificate",
        width: 170,
        height: 120
      }
    ],
  },
];

const RecognitionAwards = () => {
  return (
    <section className="bg-background-primary py-20 lg:py-[160px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-8">
        <p className="mb-10 font-body text-xs font-medium uppercase tracking-[0.05em] text-text-muted">
          DD.NYC® Recognition
        </p>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="w-full border-b border-divider-border"
        >
          {awardsData.map((award) => (
            <AccordionItem value={award.value} key={award.value} className="border-t-divider-border">
              <AccordionTrigger className="group py-8 text-left hover:no-underline">
                <div className="flex w-full items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-text-primary">
                    {award.title}
                  </h3>
                  <div className="flex shrink-0 items-center gap-4 pt-1 md:gap-14">
                    <span className="hidden font-body text-sm font-medium text-text-muted md:block">
                      {award.category}
                    </span>
                    <ChevronDown className="size-6 shrink-0 text-text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-8 pb-8 pt-2 lg:grid-cols-[360px_1fr] lg:gap-[60px] lg:pt-10">
                  <div className="flex flex-wrap items-start gap-5">
                    {award.images.map((img, index) => (
                      <Image
                        key={index}
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="h-auto w-auto max-w-[170px] object-contain lg:max-w-none"
                      />
                    ))}
                  </div>
                  <p className="whitespace-pre-line font-body text-base leading-relaxed text-text-secondary">
                    {award.description}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default RecognitionAwards;