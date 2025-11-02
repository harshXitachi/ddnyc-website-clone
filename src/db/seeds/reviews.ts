import { db } from '@/db';
import { reviews } from '@/db/schema';

async function main() {
    const now = Date.now();
    const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);

    const sampleReviews = [
        {
            reviewerId: 3,
            revieweeId: 8,
            jobId: 2,
            rating: 5,
            comment: "Excellent work! The developer delivered high-quality code that exceeded our expectations. Communication was outstanding throughout the project - they provided regular updates and were always available to discuss any concerns. The final product was delivered two days ahead of schedule, which was fantastic. Their attention to detail and problem-solving skills were impressive. The code was well-documented and easy to maintain. I would definitely hire them again for future projects and highly recommend them to other employers looking for reliable, skilled developers.",
            createdAt: sixtyDaysAgo + (5 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 5,
            revieweeId: 12,
            jobId: 5,
            rating: 5,
            comment: "Outstanding experience working with this designer! Their creativity and technical skills brought our vision to life perfectly. They took the time to understand our brand identity and delivered designs that were both beautiful and functional. The revision process was smooth, and they incorporated our feedback efficiently. What impressed me most was their proactive approach - they suggested improvements we hadn't even considered. The final deliverables were pixel-perfect and ready for implementation. Professional, talented, and a pleasure to work with.",
            createdAt: sixtyDaysAgo + (12 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 7,
            revieweeId: 14,
            jobId: 8,
            rating: 5,
            comment: "Absolutely phenomenal work! This content writer transformed our marketing materials with engaging, SEO-optimized content that resonated perfectly with our target audience. Their research was thorough, and they captured our brand voice from the first draft. They met every deadline without compromising quality and were incredibly responsive to our feedback. The content they produced not only met our requirements but significantly improved our website's engagement metrics. Their professionalism and expertise make them an invaluable asset to any project.",
            createdAt: sixtyDaysAgo + (20 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 11,
            revieweeId: 6,
            jobId: 11,
            rating: 5,
            comment: "Exceptional quality and service! The graphic designer we hired demonstrated remarkable skill and creativity throughout the project. They delivered stunning visuals that perfectly aligned with our brand guidelines and exceeded our initial expectations. Their ability to interpret abstract concepts and translate them into compelling designs was impressive. Communication was prompt and professional, and they were patient with our revision requests. The files were organized, properly formatted, and delivered with comprehensive documentation. Highly recommended for any design work!",
            createdAt: sixtyDaysAgo + (35 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 8,
            revieweeId: 3,
            jobId: 3,
            rating: 4,
            comment: "Great experience overall working with this employer. The job description was clear and accurate, which made it easy to understand the project requirements. Payment was processed promptly after completion, which I really appreciated. Communication was mostly good, though there were a few times when responses took longer than expected. The feedback provided was constructive and helped improve the final deliverable. The project scope was well-defined, and there were no unexpected changes. Would definitely consider working with them again on future opportunities.",
            createdAt: sixtyDaysAgo + (8 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 12,
            revieweeId: 5,
            jobId: 6,
            rating: 4,
            comment: "Very positive experience with this employer. They were professional and respectful throughout the entire project. The initial briefing was comprehensive, providing all the necessary information to get started. They were open to suggestions and valued my input as a designer. Minor delays in feedback occasionally extended the timeline, but nothing major. Payment terms were honored without issues. The work environment they created was collaborative and encouraging. I appreciate employers who recognize quality work and provide fair compensation for it.",
            createdAt: sixtyDaysAgo + (25 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 14,
            revieweeId: 7,
            jobId: 9,
            rating: 4,
            comment: "Solid experience working on this project. The employer had a clear vision and provided detailed specifications, which made the content creation process smoother. They were responsive to questions and provided helpful clarification when needed. The approval process was efficient, though there were occasional delays in receiving feedback on drafts. Payment was made on time as agreed. The project allowed for creative freedom while maintaining brand consistency. Overall, a professional and fair working relationship that I would be open to continuing in the future.",
            createdAt: sixtyDaysAgo + (42 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 9,
            revieweeId: 10,
            jobId: 7,
            rating: 3,
            comment: "The work was satisfactory but there were some delays that impacted the project timeline. The developer's technical skills were adequate and they eventually delivered a working solution. However, communication could have been more consistent - there were periods where it was difficult to get updates on progress. Some features required multiple revisions to meet the specifications outlined in the job posting. The final product works but lacks some of the polish we had hoped for. On the positive side, they were receptive to feedback and made necessary corrections when issues were identified.",
            createdAt: sixtyDaysAgo + (18 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 13,
            revieweeId: 15,
            jobId: 12,
            rating: 3,
            comment: "Mixed experience with this project. The designer demonstrated creativity in their concepts, but execution fell short in some areas. Several rounds of revisions were needed to get the designs to an acceptable level. While they were willing to make changes, the process took longer than anticipated. Some design elements didn't align perfectly with our brand guidelines despite providing detailed documentation. Communication was inconsistent, with some messages taking days to receive responses. The final deliverables met minimum requirements but lacked the refinement we expected for the price point.",
            createdAt: sixtyDaysAgo + (45 * 24 * 60 * 60 * 1000),
        },
        {
            reviewerId: 6,
            revieweeId: 11,
            jobId: 4,
            rating: 2,
            comment: "Communication could have been better throughout this project. The initial response time was good, but as the project progressed, it became increasingly difficult to get timely updates. The project took significantly longer than the estimated timeline, which created challenges for our planned launch. While the employer was understanding about concerns, the delay in payment processing after completion was frustrating. The job requirements changed midway through without proper discussion of adjusted compensation. The work environment felt disorganized at times. There's potential here, but improvements in project management and communication are needed.",
            createdAt: sixtyDaysAgo + (30 * 24 * 60 * 60 * 1000),
        },
    ];

    await db.insert(reviews).values(sampleReviews);
    
    console.log('✅ Reviews seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});