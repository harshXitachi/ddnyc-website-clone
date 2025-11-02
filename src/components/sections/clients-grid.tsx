import React from 'react';

const clientLogos = [
  { name: "FIFA", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/fifa_logo-12.png" },
  { name: "Match Group", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/matchgroup_logo-13.png" },
  { name: "Havas Group", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/havas-group_-4.svg" },
  { name: "NYCFC", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/nyc-fc-1-6.svg" },
  { name: "Patricia Nash", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/patricia-vash_-7.svg" },
  { name: "SJP Properties", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/sjp-properties-1-8.svg" },
  { name: "Clutch", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/clutch_-9.svg" },
  { name: "The North Face", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/the-north-face_-10.svg" },
  { name: "Dro5a", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/dro5a_-11.svg" },
  { name: "Enthuse", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/enthuse_-12.svg" },
  { name: "Forbes", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/Forbes_-13.svg" },
  { name: "VTS", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/vts_-14.svg" },
  { name: "Vans", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/vans_-15.svg" },
  { name: "Compass", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/compass_-16.svg" },
  { name: "Chelsea Film Festival", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/chelsea-film-festival_-17.svg" },
  { name: "DuPont Tyvek", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/dupont-tyvek_-18.svg" },
  { name: "MS Foundation", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/ms-foundation_-19.svg" },
  { name: "Scholastic", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/scholastic_-20.svg" },
  { name: "Global New Yorker", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/global-new-yorker-21.svg" },
  { name: "Walmart", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/walmart_-22.svg" },
  { name: "Airatae", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/airatae_-23.svg" },
  { name: "Groupon", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/groupon_-24.svg" },
  { name: "Karnak", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/karnak_-25.svg" },
  { name: "Lowe's", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/lowes_-26.svg" },
  { name: "BKCM", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/bkcm_1-27.svg" },
  { name: "Gett", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/gett_1-28.svg" },
  { name: "Innovative Sleep Technologies", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/innovative-sleep-technologies_-29.svg" },
  { name: "Road Star Beds", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/road-star-beds_-30.svg" },
  { name: "Symphony Sleep", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/symphony-sleep_-31.svg" },
  { name: "Ultramed", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/ultramed_-32.svg" },
  { name: "WillowWood", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/willow-wood_-33.svg" },
  { name: "BA", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/ba_-34.svg" },
  { name: "Modern Dose", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/modern-dose-1-35.svg" },
  { name: "Avia", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/avia-1-36.svg" },
  { name: "PlumBuddy", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/plumbuddy-1-37.svg" },
  { name: "SGS", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/sgs-1-38.svg" },
  { name: "IvyWise", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/ivywise-39.svg" },
  { name: "Juniper Square", src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/juniper-square-40.svg" },
];

const ClientsGrid = () => {
  return (
    <section className="bg-[#f5f5f5] py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-20">
        <div className="flex items-center mb-16">
          <div className="w-10 h-px bg-border mr-4"></div>
          <h2 className="text-small-caps text-muted-foreground">
            DD.NYC® Clients
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 sm:gap-x-16 gap-y-12">
          {clientLogos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center h-24">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="filter grayscale hover:grayscale-0 transition-all duration-300 ease-in-out object-contain max-h-[50px] w-auto max-w-[150px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;