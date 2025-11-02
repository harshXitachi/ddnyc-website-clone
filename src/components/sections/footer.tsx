import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const companyLinks = [
  { name: 'Work', href: '/featured-work' },
  { name: 'Agency', href: '/agency' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Client Testimonials', href: '/client-testimonials' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
  { name: 'Website Accessibility', href: '/website-accessibility-statement' },
];

const servicesLinks = [
  { name: 'Web Design', href: '/services/web-design' },
  { name: 'WordPress Websites', href: '/services/wordpress-websites' },
  { name: 'Branding', href: '/services/branding' },
  { name: 'Packaging Design', href: '/services/packaging-design' },
  { name: 'Graphic Design', href: '/services/graphic-design' },
  { name: 'Real Estate Design', href: '/services/real-estate' },
  { name: 'Trade Show Booth Design', href: '/services/trade-show-booth-design' },
];

const connectLinks = [
  { name: 'Behance', href: '#' },
  { name: 'Dribbble', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'Careers', href: '/agency/careers' },
  { name: 'Email', href: 'mailto:hello@dd.nyc' },
  { name: 'Contact', href: '/contact' },
];

const badges = [
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/black-2-42.svg', alt: 'Digital Design Logo', width: 96, height: 16 },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/brown-3-41.svg', alt: 'NY State Certified Women-Owned Business', width: 40, height: 40 },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/brown-2-44.svg', alt: 'Certified Minority Business', width: 40, height: 46 },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/brown-1-45.svg', alt: 'Clutch Sector Leader Women-Owned Business', width: 92, height: 48 },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white font-body">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-10">
        
        {/* Top Part: CTA */}
        <div className="pt-8 pb-16 lg:pb-24">
          <h2 className="font-display text-4xl lg:text-[52px] font-medium !leading-tight text-white mb-6">
            Starting a new project or want to<br />
            collaborate with us?{' '}
            <Link href="/contact" className="text-primary-accent hover:underline">
              Let's talk &gt;
            </Link>
          </h2>
          <a href="mailto:hello@dd.nyc" className="font-display text-4xl lg:text-[52px] font-medium !leading-tight text-gray-600 hover:text-primary-accent transition-colors duration-300">
            hello@dd.nyc
          </a>
        </div>

        {/* Separator */}
        <div className="border-b border-gray-800"></div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 lg:pb-16">
          
          <div>
            <h3 className="font-bold text-white text-base mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-base mb-6">Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-6">Address</h3>
            <div className="text-sm text-gray-400 leading-relaxed space-y-4">
              <p>
                85 Broad Street,<br/>
                17th Floor - Suite 17.005,<br/>
                New York, NY 10004
              </p>
              <p>
                <a href="tel:+12123801761" className="hover:text-white transition-colors duration-300">+1 212 380 1761</a>
              </p>
              <p>
                <a href="mailto:hello@dd.nyc" className="hover:text-white transition-colors duration-300">hello@dd.nyc</a>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-base mb-6">Connect</h3>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-t border-gray-800 pt-8 mt-8">
            <div className="text-xs text-gray-500 text-center lg:text-left order-3 lg:order-1">
                <span>Copyright © 2025 DigitalDesign.NYC LLC</span> • <span>Headquartered in New York & Beyond.</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 order-2">
                <div className="flex items-center gap-x-6">
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/logo-white-48.svg" alt="Digital Design Logo" width={96} height={16} />
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/brown-3-41.svg" alt="NY State Certified Women-Owned Business" width={40} height={40} className="brightness-0 invert" />
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/brown-2-44.svg" alt="Certified Minority Business" width={40} height={46} className="brightness-0 invert" />
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/brown-1-45.svg" alt="Clutch Sector Leader Women-Owned Business" width={92} height={48} className="brightness-0 invert"/>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>All rights reserved</span>
                    <Heart className="w-3.5 h-3.5 text-primary-accent" fill="currentColor" />
                </div>
            </div>

            <a href="/contact" className="text-base font-semibold text-white hover:text-primary-accent transition-colors order-1 lg:order-3">
                New Project?
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;