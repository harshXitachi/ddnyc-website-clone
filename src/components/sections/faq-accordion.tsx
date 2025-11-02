"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    id: "item-1",
    question: "What services does DD.NYC® offer?",
    answer: "DD.NYC® is an award-winning, full-service creative agency based in Manhattan and recognized as one of the top design agencies globally. We specialize in branding, web design, packaging, video production, 3D, and experiential design. Our services include brand strategy and identity, custom UI/UX and responsive websites, consumer packaging, corporate collateral, and visual storytelling. With deep expertise across healthcare, real estate, tech, and consumer sectors, we deliver high-impact design with a focus on clarity, creativity, and measurable results.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/ChefAntoineLours_Designed_DD_NYC_C2_AE_Opening-10.webp",
    imageAlt: "DD.NYC® agency team during a video production shoot.",
  },
  {
    id: "item-2",
    question: "How does DD.NYC® approach a new project?",
    answer: "DD.NYC® approaches every new project with a defined, collaborative, and results-driven process designed to deliver high-impact creative work. Here’s a concise breakdown of our approach:",
    details: [
        { title: 'Discovery & Strategy', text: 'We begin with a deep dive into your brand, goals, audience, and competitive landscape. This phase includes stakeholder interviews, audits, and research to uncover opportunities and inform strategy.' },
        { title: 'Art Direction', text: 'Based on insights gathered, we develop creative concepts and a strategic direction. This includes moodboards, visual directions, and in-depth creative brand exploration using your existing assets and needs that align with your objectives and brand voice.' },
        { title: 'Design & Iteration', text: 'Our team crafts refined visual solutions—whether it’s a brand identity, website, packaging, or video—through a collaborative design process that incorporates feedback and iteration at key milestones.' },
        { title: 'Development & Implementation', text: 'We translate designs into high-performance digital products or physical assets, building custom websites, print-ready packaging, and motion graphics with precision, speed, and attention to detail.' },
        { title: 'Launch & Optimization', text: 'Once delivered, we support launch planning, implementation, and post-launch tutorials. We also offer ongoing optimization, analytics review, and updates to ensure long-term success.' },
        { title: 'Partnership Mindset', text: 'We treat every project as a long-term partnership, prioritizing transparency, responsiveness, and measurable ROI from start to finish.' },
    ]
  },
  {
    id: "item-3",
    question: "What industries does DD.NYC® specialize in?",
    answer: "DD.NYC® specializes in high-impact design across industries including:\n\nOur deep industry expertise enables us to create tailored branding, digital, and experiential solutions that resonate across sectors—whether launching a biotech product, branding a luxury development, or designing the official website for the FIFA World Cup 2026™ NYNJ Host City.",
  }
];

const FaqAccordion = () => {
  return (
    <section className="bg-[#f7f7f7] font-body py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <hr className="w-16 border-t border-neutral-300" />
          <h2 className="text-xs font-medium uppercase tracking-[0.05em] text-neutral-500">
            DD.NYC® Design Agency FAQ
          </h2>
        </div>
        
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={item.id} value={item.id} className="border-t border-neutral-300 last-of-type:border-b last-of-type:border-neutral-300">
              <AccordionTrigger className="group flex items-start justify-between w-full gap-4 md:gap-8 py-8 text-left hover:no-underline">
                <span className="font-body text-base text-neutral-400 pt-2 w-12 text-left tabular-nums">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <h3 className="flex-1 font-display text-2xl md:text-[28px] leading-tight text-black">
                  {item.question}
                </h3>
                <ChevronDown className="h-8 w-8 flex-shrink-0 text-black transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#F45D2F]" />
              </AccordionTrigger>
              <AccordionContent>
                {item.id === 'item-1' && item.image ? (
                  <div className="bg-white p-6 md:p-10 mb-8 -mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-1">
                        <div className="relative aspect-[4/3] w-full">
                          <Image src={item.image} alt={item.imageAlt || "FAQ Image"} layout="fill" className="object-cover" />
                        </div>
                      </div>
                      <div className="lg:col-span-2">
                        <p className="text-lg text-neutral-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : item.details ? (
                  <div className="pb-8 pl-16 md:pl-20 pr-12 text-lg text-neutral-600 leading-relaxed">
                    <p className="mb-6">{item.answer}</p>
                    <ol className="flex flex-col gap-4">
                      {item.details.map((detail, i) => (
                        <li key={i}>
                          <strong className="font-semibold text-black">{i + 1}. {detail.title}</strong>
                          <p className="mt-1 text-neutral-600">{detail.text}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div className="pb-8 pl-16 md:pl-20 pr-12">
                    <p className="text-lg text-neutral-600 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqAccordion;