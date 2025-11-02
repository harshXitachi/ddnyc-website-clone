import { db } from '@/db';
import { employerProfiles } from '@/db/schema';

async function main() {
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = now - (90 * 24 * 60 * 60 * 1000);

    const sampleEmployerProfiles = [
        {
            userId: 11,
            companyName: 'TechFlow Solutions',
            companyDescription: 'TechFlow Solutions is a leading cloud infrastructure provider specializing in enterprise-grade solutions for businesses of all sizes. Founded in 2018, we have grown to serve over 500 companies worldwide, helping them modernize their IT infrastructure and accelerate their digital transformation journey. Our team of expert engineers and architects work closely with clients to design, implement, and manage scalable cloud solutions using cutting-edge technologies. We pride ourselves on our customer-centric approach, offering 24/7 support and custom solutions tailored to each organization\'s unique needs. Our core services include cloud migration, infrastructure automation, DevOps consulting, and managed cloud services across AWS, Azure, and Google Cloud platforms.',
            industry: 'Technology',
            website: 'https://techflowsolutions.com',
            location: 'San Francisco, CA',
            companyLogoUrl: 'https://example.com/logos/techflow.png',
            createdAt: thirtyDaysAgo,
            updatedAt: thirtyDaysAgo,
        },
        {
            userId: 12,
            companyName: 'FinanceHub Inc',
            companyDescription: 'FinanceHub Inc is a pioneering fintech company revolutionizing the way businesses and individuals manage their finances. Established in 2019, we provide innovative payment processing solutions, digital banking services, and financial analytics tools to over 10,000 clients across North America. Our platform combines traditional banking reliability with modern technology to offer seamless, secure, and efficient financial services. We specialize in B2B payment solutions, helping businesses streamline their accounts payable and receivable processes while reducing transaction costs. Our advanced fraud detection systems and compliance frameworks ensure the highest level of security for all transactions. With a team of financial experts and software engineers, we continue to push the boundaries of what\'s possible in digital finance.',
            industry: 'Finance',
            website: 'https://financehub.com',
            location: 'New York, NY',
            companyLogoUrl: null,
            createdAt: sixtyDaysAgo,
            updatedAt: sixtyDaysAgo,
        },
        {
            userId: 13,
            companyName: 'HealthBridge Medical',
            companyDescription: 'HealthBridge Medical is transforming healthcare delivery through innovative telemedicine solutions and digital health platforms. Since our founding in 2017, we have connected over 1 million patients with qualified healthcare providers, making quality medical care more accessible and convenient. Our HIPAA-compliant platform enables virtual consultations, remote patient monitoring, prescription management, and secure medical record sharing. We partner with healthcare systems, insurance providers, and individual practices to expand access to care, particularly in underserved communities. Our team includes experienced physicians, nurses, healthcare administrators, and software developers who are passionate about improving patient outcomes through technology. We offer specialized telehealth services in primary care, mental health, chronic disease management, and preventive medicine.',
            industry: 'Healthcare',
            website: 'https://healthbridge-medical.com',
            location: 'Boston, MA',
            companyLogoUrl: 'https://example.com/logos/healthbridge.png',
            createdAt: ninetyDaysAgo,
            updatedAt: ninetyDaysAgo,
        },
        {
            userId: 14,
            companyName: 'ShopSmart Commerce',
            companyDescription: 'ShopSmart Commerce is an all-in-one e-commerce platform designed specifically for small and medium-sized businesses looking to establish or expand their online presence. Founded in 2020, we have empowered over 5,000 merchants to build successful online stores with our user-friendly tools and comprehensive support. Our platform offers everything needed to run a successful e-commerce business: customizable storefronts, inventory management, payment processing, shipping integration, marketing automation, and detailed analytics. We understand the unique challenges faced by small business owners, which is why we provide personalized onboarding, responsive customer support, and educational resources to help our clients succeed. With competitive pricing and no hidden fees, we make professional e-commerce accessible to businesses of all sizes.',
            industry: 'E-commerce',
            website: 'https://shopsmartcommerce.com',
            location: 'Austin, TX',
            companyLogoUrl: 'https://example.com/logos/shopsmart.png',
            createdAt: now - (45 * 24 * 60 * 60 * 1000),
            updatedAt: now - (45 * 24 * 60 * 60 * 1000),
        },
        {
            userId: 15,
            companyName: 'MediaWave Studios',
            companyDescription: 'MediaWave Studios is a full-service digital media production company creating compelling content for brands, agencies, and entertainment companies. Established in 2016, we have produced thousands of videos, podcasts, and multimedia projects for clients ranging from Fortune 500 companies to innovative startups. Our talented team of directors, cinematographers, editors, animators, and sound engineers brings creative visions to life with technical excellence and artistic flair. We specialize in corporate video production, commercial advertising, branded content, documentary filmmaking, and podcast production. Our state-of-the-art facilities include soundstages, recording studios, and post-production suites equipped with the latest technology. We pride ourselves on our collaborative approach, working closely with clients from concept development through final delivery to ensure every project exceeds expectations.',
            industry: 'Media',
            website: 'https://mediawavestudios.com',
            location: 'Los Angeles, CA',
            companyLogoUrl: null,
            createdAt: now - (75 * 24 * 60 * 60 * 1000),
            updatedAt: now - (75 * 24 * 60 * 60 * 1000),
        },
    ];

    await db.insert(employerProfiles).values(sampleEmployerProfiles);
    
    console.log('✅ Employer profiles seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});