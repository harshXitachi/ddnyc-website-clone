import Navigation from '@/components/sections/navigation';
import HeroSection from '@/components/sections/hero';
import Marquee from '@/components/sections/marquee';
import FeaturedWorkCarousel from '@/components/sections/featured-work-carousel';
import AboutDescription from '@/components/sections/about-description';
import StatisticsSection from '@/components/sections/statistics';
import ServicesList from '@/components/sections/services-list';
import ShowreelVideo from '@/components/sections/showreel-video';
import ClientsGrid from '@/components/sections/clients-grid';
import ContactForm from '@/components/sections/contact-form';
import TestimonialQuote from '@/components/sections/testimonial-quote';
import RecognitionAwards from '@/components/sections/recognition-awards';
import PortfolioGrid from '@/components/sections/portfolio-grid';
import FaqAccordion from '@/components/sections/faq-accordion';
import Footer from '@/components/sections/footer';
import FabButton from '@/components/sections/fab-button';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <Marquee />
        <FeaturedWorkCarousel />
        <AboutDescription />
        <StatisticsSection />
        <ServicesList />
        <ShowreelVideo />
        <ClientsGrid />
        <ContactForm />
        <TestimonialQuote />
        <RecognitionAwards />
        <PortfolioGrid />
        <FaqAccordion />
      </main>
      <Footer />
      <FabButton />
    </>
  );
}