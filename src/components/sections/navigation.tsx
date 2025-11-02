"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const servicesLinks = [
  { title: 'Web Design', href: '/services/web-design' },
  { title: 'Branding', href: '/services/branding' },
  { title: 'Trade Shows', href: '/services/trade-show-booth-design' },
  { title: 'Packaging Design', href: '/services/packaging-design' },
  { title: 'Video Production', href: '/services/best-video-production-services' },
];

const industriesLinks = [
  { title: 'Real Estate', href: '/services/real-estate' },
  { title: 'Healthcare', href: '/services/healthcare-industry' },
  { title: 'Finance & Tech', href: '/services/financial-industry' },
  { title: 'Industrial', href: '/services/industrial-sector' },
  { title: 'Manufacturing', href: '/services/manufacturing-industry' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    if (isMenuOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  const navTextColor = hasScrolled || isMenuOpen ? 'text-black' : 'text-white';
  const logoFilter = hasScrolled || isMenuOpen ? 'invert' : '';

  const navLinkClasses = 'text-navigation group relative bg-transparent hover:bg-transparent hover:text-primary-accent focus:bg-transparent focus:text-primary-accent';
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        hasScrolled || isMenuOpen ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-20">
        <div className="flex-shrink-0">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/svgs/digitaldesignlogo_full_white-47.svg"
              alt="DD.NYC Logo"
              width={130}
              height={26}
              className={cn('transition-all duration-300', logoFilter)}
              priority
            />
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <NavigationMenu>
            <NavigationMenuList className={cn('gap-x-4', navTextColor)}>
              <NavigationMenuItem>
                <Link href="/featured-work" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navLinkClasses)}>Work</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/agency" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navLinkClasses)}>Agency</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navLinkClasses)}>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1 p-2">
                    {servicesLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <Link href={link.href} className="block select-none rounded-sm px-3 py-2 text-base font-normal leading-none text-black no-underline outline-none transition-colors hover:bg-zinc-100/80">
                            {link.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navLinkClasses)}>Industries</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1 p-2">
                    {industriesLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <Link href={link.href} className="block select-none rounded-sm px-3 py-2 text-base font-normal leading-none text-black no-underline outline-none transition-colors hover:bg-zinc-100/80">
                            {link.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/agency/careers" className={cn('text-navigation transition-colors hover:text-primary-accent', navTextColor)}>
            Careers
          </Link>
          <Button asChild className="rounded-lg bg-primary-accent px-8 py-6 text-button text-white hover:bg-primary-accent/90">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className={cn(navTextColor)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-full overflow-y-auto bg-white lg:hidden">
          <div className="flex flex-col space-y-1 p-6 font-medium text-black">
            <Link href="/featured-work" className="py-3 text-2xl" onClick={closeMenu}>Work</Link>
            <Link href="/agency" className="py-3 text-2xl" onClick={closeMenu}>Agency</Link>
            <Accordion type="multiple" className="w-full text-2xl">
              <AccordionItem value="services" className="border-b">
                <AccordionTrigger className="py-3 font-medium">Services</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1 pt-2 pl-4">
                    {servicesLinks.map((link) => (
                      <Link href={link.href} key={link.href} className="block py-2 text-xl font-normal text-gray-700" onClick={closeMenu}>{link.title}</Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="industries" className="border-b">
                <AccordionTrigger className="py-3 font-medium">Industries</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1 pt-2 pl-4">
                    {industriesLinks.map((link) => (
                      <Link href={link.href} key={link.href} className="block py-2 text-xl font-normal text-gray-700" onClick={closeMenu}>{link.title}</Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
             <Link href="/agency/careers" className="py-3 text-2xl" onClick={closeMenu}>Careers</Link>
          </div>
          <div className="p-6">
            <Button asChild size="lg" className="w-full rounded-lg bg-primary-accent py-7 text-button text-white" onClick={closeMenu}>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;