import Link from 'next/link';

const AboutDescription = () => {
  return (
    <section className="bg-background-primary py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="font-normal text-[#666] text-2xl md:text-[34px] leading-[1.5]">
          DD.NYC® is an award-winning Manhattan-based creative agency founded in 2015, specializing in
          branding, web design, packaging, and video storytelling. With over a decade of teamwork and a
          combined 50+ years of expertise, the agency delivers innovative and impactful solutions tailored
          to a wide range of industries, including real estate, healthcare, and lifestyle.{' '}
          <Link
            href="/featured-work"
            className="text-primary-accent hover:underline whitespace-nowrap"
          >
            See our work &gt;
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AboutDescription;