"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const InterestTag = ({
  label,
  isSelected,
  onToggle,
}: {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={cn(
      "rounded-full px-5 py-2 text-tags font-medium transition-colors duration-200",
      isSelected
        ? "bg-text-primary text-background-primary"
        : "bg-background-light-gray text-text-primary hover:bg-neutral-300"
    )}
  >
    {label}
  </button>
);

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestOptions = [
    "Branding",
    "Web Design",
    "Packaging",
    "Graphic Design",
    "UI/UX",
    "Video Production",
    "Experiential",
    "Brand Assets",
    "Decks",
    "Other",
  ];
  
  const handleToggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      name,
      email,
      projectDetails,
      interests: selectedInterests,
    });
  };

  return (
    <section id="contact" className="bg-background-primary py-24 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="font-display text-center font-bold text-[36px] md:text-[56px] leading-[1.15] -tracking-[0.01em] text-text-primary">
          Get in Touch with DD.NYC®
        </h2>
        <form onSubmit={handleSubmit} className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-24 gap-y-12 lg:gap-y-0">
            <div className="flex flex-col gap-y-10">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name*"
                required
                className="w-full bg-transparent border-0 border-b border-divider-border py-4 text-body-small text-text-primary placeholder:text-text-muted focus:ring-0 focus:outline-none focus:border-primary-accent transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your e-mail*"
                required
                className="w-full bg-transparent border-0 border-b border-divider-border py-4 text-body-small text-text-primary placeholder:text-text-muted focus:ring-0 focus:outline-none focus:border-primary-accent transition-colors"
              />
              <textarea
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Tell us about your project"
                rows={5}
                className="w-full bg-transparent border-0 border-b border-divider-border py-4 text-body-small text-text-primary placeholder:text-text-muted focus:ring-0 focus:outline-none focus:border-primary-accent transition-colors resize-none"
              />
            </div>
            <div>
              <p className="text-body-small text-text-muted mb-4">
                I'm interested in...
              </p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <InterestTag
                    key={interest}
                    label={interest}
                    isSelected={selectedInterests.includes(interest)}
                    onToggle={() => handleToggleInterest(interest)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-16 md:mt-24">
            <button
              type="submit"
              className="relative flex items-center justify-center w-[116px] h-[116px] bg-primary-accent text-white text-button font-semibold transition-transform duration-300 ease-in-out hover:scale-105"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;