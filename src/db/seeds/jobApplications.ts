import { db } from '@/db';
import { jobApplications } from '@/db/schema';

async function main() {
    const sampleApplications = [
        // Worker 1 applications (3 total: 1 accepted, 1 reviewing, 1 pending)
        {
            jobId: 1,
            workerId: 1,
            status: 'accepted',
            coverLetter: 'Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Full-Stack Developer position at your company. With over 8 years of experience in web development and a proven track record of delivering scalable applications, I am confident I would be a valuable addition to your team.\n\nMy expertise in React, Node.js, and TypeScript aligns perfectly with your requirements. I have successfully led multiple projects from conception to deployment, including a recent e-commerce platform that handles over 100,000 daily transactions. I am particularly excited about the opportunity to work on challenging projects that push the boundaries of modern web development.\n\nI am eager to bring my technical skills and collaborative approach to your organization. Thank you for considering my application.\n\nBest regards,\nJohn Smith',
            resumeUrl: 'https://resume.example.com/john-smith.pdf',
            createdAt: Math.floor(new Date('2024-11-20').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-25').getTime() / 1000),
        },
        {
            jobId: 5,
            workerId: 1,
            status: 'reviewing',
            coverLetter: 'To the Hiring Team,\n\nI am excited to apply for the Mobile App Developer position. My extensive background in React Native and cross-platform development makes me an ideal candidate for this role. Over the past 5 years, I have developed and launched 12 mobile applications with over 2 million combined downloads.\n\nWhat particularly attracts me to this position is your focus on creating innovative user experiences. I thrive in fast-paced environments where creativity meets technical excellence. My recent project involved building a fintech app with biometric authentication and real-time payment processing, achieving a 4.8-star rating on both app stores.\n\nI would love the opportunity to discuss how my mobile development expertise can contribute to your team\'s success.\n\nSincerely,\nJohn Smith',
            resumeUrl: 'https://resume.example.com/john-smith.pdf',
            createdAt: Math.floor(new Date('2024-11-28').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-02').getTime() / 1000),
        },
        {
            jobId: 12,
            workerId: 1,
            status: 'pending',
            coverLetter: 'Dear Hiring Committee,\n\nI am writing to apply for the DevOps Engineer position. While my primary expertise is in full-stack development, I have extensive experience with CI/CD pipelines, Docker, and Kubernetes from managing deployments for multiple high-traffic applications.\n\nIn my current role, I architected and implemented a complete DevOps workflow that reduced deployment time by 70% and improved system reliability to 99.9% uptime. I am passionate about infrastructure automation and believe my unique perspective as a developer transitioning to DevOps would bring valuable insights to your team.\n\nI am excited about the possibility of contributing to your infrastructure and would welcome the opportunity to discuss this position further.\n\nBest regards,\nJohn Smith',
            resumeUrl: 'https://resume.example.com/john-smith.pdf',
            createdAt: Math.floor(new Date('2024-12-05').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-05').getTime() / 1000),
        },
        // Worker 2 applications (2 total: 1 rejected, 1 pending)
        {
            jobId: 2,
            workerId: 2,
            status: 'rejected',
            coverLetter: 'Dear Hiring Manager,\n\nI am interested in the UI/UX Designer position at your company. With 4 years of experience in user interface design and a strong portfolio of web and mobile applications, I believe I can contribute significantly to your design team.\n\nMy design philosophy centers on creating intuitive, accessible experiences that delight users while meeting business objectives. I am proficient in Figma, Sketch, and Adobe Creative Suite, and I have experience conducting user research and usability testing. My recent project involved redesigning a SaaS platform that increased user engagement by 45%.\n\nI would be thrilled to bring my creative vision and technical skills to your organization. Thank you for your consideration.\n\nWarm regards,\nEmily Johnson',
            resumeUrl: 'https://resume.example.com/emily-johnson.pdf',
            createdAt: Math.floor(new Date('2024-11-18').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-22').getTime() / 1000),
        },
        {
            jobId: 8,
            workerId: 2,
            status: 'pending',
            coverLetter: 'To Whom It May Concern,\n\nI am writing to express my interest in the Product Designer role. My background in UI/UX design combined with my understanding of product strategy makes me well-suited for this position.\n\nThroughout my career, I have collaborated closely with product managers and engineers to ship features that users love. I excel at translating complex requirements into elegant design solutions. My approach involves extensive user research, rapid prototyping, and iterative design based on data and feedback.\n\nI am particularly drawn to your company\'s mission of building products that make a real difference in people\'s lives. I would welcome the opportunity to contribute my skills and passion to your team.\n\nBest regards,\nEmily Johnson',
            resumeUrl: 'https://resume.example.com/emily-johnson.pdf',
            createdAt: Math.floor(new Date('2024-12-03').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-03').getTime() / 1000),
        },
        // Worker 3 applications (2 total: both reviewing)
        {
            jobId: 3,
            workerId: 3,
            status: 'reviewing',
            coverLetter: 'Dear Hiring Team,\n\nI am excited to apply for the Backend Developer position. With 6 years of experience building scalable server-side applications and APIs, I am confident in my ability to contribute to your engineering team.\n\nMy expertise includes Node.js, Python, PostgreSQL, and microservices architecture. I have designed and implemented systems handling millions of requests per day with high availability and performance. In my current role, I led the migration of a monolithic application to microservices, resulting in improved scalability and development velocity.\n\nI am passionate about writing clean, maintainable code and fostering a culture of technical excellence. I would be honored to bring my skills and experience to your organization.\n\nSincerely,\nMichael Chen',
            resumeUrl: 'https://resume.example.com/michael-chen.pdf',
            createdAt: Math.floor(new Date('2024-11-22').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-27').getTime() / 1000),
        },
        {
            jobId: 10,
            workerId: 3,
            status: 'reviewing',
            coverLetter: 'To the Hiring Committee,\n\nI am writing to apply for the Cloud Solutions Architect position. My extensive experience with AWS, Azure, and Google Cloud Platform, combined with my background in backend development, positions me well for this role.\n\nOver the past 4 years, I have designed and implemented cloud infrastructure for multiple enterprise applications, optimizing for cost, performance, and security. I hold AWS Solutions Architect and Azure certifications, and I stay current with the latest cloud technologies and best practices.\n\nI am excited about the opportunity to help your organization leverage cloud technologies to achieve business goals. I look forward to discussing how my expertise can benefit your team.\n\nBest regards,\nMichael Chen',
            resumeUrl: 'https://resume.example.com/michael-chen.pdf',
            createdAt: Math.floor(new Date('2024-12-01').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-04').getTime() / 1000),
        },
        // Worker 4 applications (2 total: 1 accepted, 1 pending)
        {
            jobId: 4,
            workerId: 4,
            status: 'accepted',
            coverLetter: 'Dear Hiring Manager,\n\nI am thrilled to apply for the Data Scientist position at your company. With a PhD in Computer Science and 5 years of industry experience applying machine learning to real-world problems, I am excited about the opportunity to contribute to your data science team.\n\nMy expertise includes Python, TensorFlow, scikit-learn, and big data technologies. I have developed predictive models that increased revenue by 25% and reduced operational costs by 30% in my current role. I am passionate about using data-driven insights to solve complex business challenges.\n\nI am particularly impressed by your company\'s commitment to innovation and would be honored to be part of your team.\n\nBest regards,\nSarah Williams',
            resumeUrl: 'https://resume.example.com/sarah-williams.pdf',
            createdAt: Math.floor(new Date('2024-11-19').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-24').getTime() / 1000),
        },
        {
            jobId: 13,
            workerId: 4,
            status: 'pending',
            coverLetter: 'To the Hiring Team,\n\nI am writing to express my strong interest in the Machine Learning Engineer position. My background in both research and applied machine learning makes me well-suited for this role.\n\nI have experience with the entire ML lifecycle, from data collection and preprocessing to model deployment and monitoring. My recent work involved building a recommendation system that increased user engagement by 40%. I am proficient in MLOps practices and have experience deploying models at scale using Kubernetes and cloud platforms.\n\nI would love the opportunity to discuss how my skills and experience align with your needs.\n\nSincerely,\nSarah Williams',
            resumeUrl: 'https://resume.example.com/sarah-williams.pdf',
            createdAt: Math.floor(new Date('2024-12-06').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-06').getTime() / 1000),
        },
        // Worker 5 applications (2 total: 1 rejected, 1 pending)
        {
            jobId: 6,
            workerId: 5,
            status: 'rejected',
            coverLetter: 'Dear Hiring Committee,\n\nI am excited to apply for the QA Engineer position. With 4 years of experience in software testing and quality assurance, I am confident in my ability to ensure the delivery of high-quality products.\n\nMy expertise includes both manual and automated testing, with proficiency in Selenium, Cypress, and Jest. I have established testing frameworks and CI/CD integration for multiple projects, significantly reducing bug rates in production. I am detail-oriented and passionate about advocating for quality throughout the development lifecycle.\n\nI would be thrilled to contribute my skills to your quality assurance efforts.\n\nBest regards,\nDavid Martinez',
            resumeUrl: null,
            createdAt: Math.floor(new Date('2024-11-25').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-29').getTime() / 1000),
        },
        {
            jobId: 14,
            workerId: 5,
            status: 'pending',
            coverLetter: 'To Whom It May Concern,\n\nI am writing to apply for the Automation Engineer position. My background in QA combined with my programming skills makes me an ideal candidate for this role focused on test automation.\n\nI have built comprehensive test automation frameworks using Python and JavaScript, covering unit, integration, and end-to-end testing. My automation efforts have reduced testing time by 60% while increasing test coverage. I am passionate about creating robust, maintainable test suites that enable rapid, confident releases.\n\nI look forward to the opportunity to discuss how I can contribute to your automation initiatives.\n\nSincerely,\nDavid Martinez',
            resumeUrl: null,
            createdAt: Math.floor(new Date('2024-12-04').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-04').getTime() / 1000),
        },
        // Worker 6 application (1 total: accepted)
        {
            jobId: 7,
            workerId: 6,
            status: 'accepted',
            coverLetter: 'Dear Hiring Manager,\n\nI am writing to express my enthusiasm for the Product Manager position at your company. With 7 years of experience leading product development and a track record of launching successful products, I am excited about this opportunity.\n\nMy approach to product management combines data-driven decision making with deep customer empathy. I have led cross-functional teams to deliver products that achieved significant market success, including a mobile app that reached 5 million users within the first year. I excel at strategic planning, stakeholder management, and turning vision into reality.\n\nI am impressed by your company\'s innovative products and would be honored to contribute to your continued success.\n\nBest regards,\nJessica Taylor',
            resumeUrl: 'https://resume.example.com/jessica-taylor.pdf',
            createdAt: Math.floor(new Date('2024-11-21').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-26').getTime() / 1000),
        },
        // Worker 7 application (1 total: reviewing)
        {
            jobId: 9,
            workerId: 7,
            status: 'reviewing',
            coverLetter: 'To the Hiring Team,\n\nI am excited to apply for the Frontend Developer position. With 5 years of experience building responsive, performant web applications, I am confident I can make valuable contributions to your frontend team.\n\nMy expertise includes React, Vue.js, TypeScript, and modern CSS frameworks. I am passionate about creating accessible, user-friendly interfaces and optimizing application performance. In my current role, I improved page load times by 50% through code splitting and lazy loading strategies.\n\nI would love the opportunity to bring my frontend expertise to your organization and help create exceptional user experiences.\n\nSincerely,\nRobert Anderson',
            resumeUrl: 'https://resume.example.com/robert-anderson.pdf',
            createdAt: Math.floor(new Date('2024-11-30').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-03').getTime() / 1000),
        },
        // Worker 8 applications (2 total: 1 rejected, 1 reviewing)
        {
            jobId: 11,
            workerId: 8,
            status: 'rejected',
            coverLetter: 'Dear Hiring Committee,\n\nI am writing to apply for the Security Engineer position. With 6 years of experience in cybersecurity and a strong background in application security, I am well-prepared to help protect your systems and data.\n\nMy expertise includes penetration testing, vulnerability assessment, security architecture, and incident response. I hold CISSP and CEH certifications and have successfully led security initiatives that significantly reduced risk exposure. I am passionate about building security into every phase of the development lifecycle.\n\nI would be honored to contribute my security expertise to your organization.\n\nBest regards,\nLisa Thompson',
            resumeUrl: 'https://resume.example.com/lisa-thompson.pdf',
            createdAt: Math.floor(new Date('2024-11-23').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-28').getTime() / 1000),
        },
        {
            jobId: 15,
            workerId: 8,
            status: 'reviewing',
            coverLetter: 'To Whom It May Concern,\n\nI am excited to apply for the Site Reliability Engineer position. My background in both software development and operations makes me uniquely qualified to bridge the gap between development and reliability.\n\nI have extensive experience with monitoring, incident management, and building resilient systems. In my current role, I improved system uptime from 99.5% to 99.95% through proactive monitoring and automated remediation. I am proficient in Kubernetes, Terraform, and observability tools like Prometheus and Grafana.\n\nI look forward to discussing how I can help improve reliability and operational excellence at your organization.\n\nSincerely,\nLisa Thompson',
            resumeUrl: 'https://resume.example.com/lisa-thompson.pdf',
            createdAt: Math.floor(new Date('2024-12-02').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-05').getTime() / 1000),
        },
        // Worker 9 application (1 total: pending)
        {
            jobId: 1,
            workerId: 9,
            status: 'pending',
            coverLetter: 'Dear Hiring Manager,\n\nI am writing to apply for the Senior Full-Stack Developer position. With 10 years of experience in software development and a passion for building elegant solutions to complex problems, I am excited about this opportunity.\n\nMy technical skills span the entire stack, from database design to frontend interfaces. I have led development teams and mentored junior developers while maintaining hands-on coding involvement. I am particularly skilled in React, Node.js, and PostgreSQL, and I have a strong track record of delivering scalable, maintainable applications.\n\nI would welcome the opportunity to discuss how my experience aligns with your needs.\n\nBest regards,\nJames Wilson',
            resumeUrl: 'https://resume.example.com/james-wilson.pdf',
            createdAt: Math.floor(new Date('2024-12-07').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-07').getTime() / 1000),
        },
        // Worker 10 applications (2 total: 1 accepted, 1 pending)
        {
            jobId: 3,
            workerId: 10,
            status: 'accepted',
            coverLetter: 'To the Hiring Team,\n\nI am thrilled to apply for the Backend Developer position at your company. With 7 years of experience building robust server-side applications and APIs, I am confident in my ability to make significant contributions to your backend team.\n\nMy expertise includes Node.js, Python, GraphQL, and distributed systems design. I have architected and implemented microservices that handle millions of daily requests with high availability. I am passionate about code quality, testing, and continuous improvement.\n\nI am excited about the opportunity to work with your talented team and help build scalable backend systems.\n\nSincerely,\nAmanda Brown',
            resumeUrl: 'https://resume.example.com/amanda-brown.pdf',
            createdAt: Math.floor(new Date('2024-11-24').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-11-29').getTime() / 1000),
        },
        {
            jobId: 8,
            workerId: 10,
            status: 'pending',
            coverLetter: 'Dear Hiring Committee,\n\nI am writing to express my interest in the Product Designer position. While my primary background is in backend development, I have developed strong design sensibilities through close collaboration with design teams and a personal passion for user experience.\n\nI believe my technical background gives me a unique perspective on product design, allowing me to create designs that are not only beautiful but also technically feasible and performant. I have self-taught skills in Figma and have contributed to design decisions in my current role.\n\nI would love the opportunity to transition into design and bring my technical expertise to your product team.\n\nBest regards,\nAmanda Brown',
            resumeUrl: 'https://resume.example.com/amanda-brown.pdf',
            createdAt: Math.floor(new Date('2024-12-08').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-08').getTime() / 1000),
        },
        // Additional applications to reach 20 total
        {
            jobId: 2,
            workerId: 6,
            status: 'pending',
            coverLetter: 'Dear Hiring Manager,\n\nI am interested in the UI/UX Designer position. My product management background has given me deep insights into user needs and design thinking, which I believe would be valuable in a design role.\n\nThroughout my career, I have worked closely with designers and developed a strong understanding of design principles, user research methodologies, and prototyping. I have led design reviews and contributed to design decisions that improved user satisfaction scores by 35%.\n\nI am excited about the possibility of focusing more deeply on design and would appreciate the opportunity to discuss this position with you.\n\nWarm regards,\nJessica Taylor',
            resumeUrl: 'https://resume.example.com/jessica-taylor.pdf',
            createdAt: Math.floor(new Date('2024-12-01').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-01').getTime() / 1000),
        },
        {
            jobId: 4,
            workerId: 7,
            status: 'pending',
            coverLetter: 'To the Hiring Team,\n\nI am writing to apply for the Data Scientist position. While my primary expertise is in frontend development, I have developed strong data analysis skills through performance optimization work and A/B testing initiatives.\n\nI am proficient in Python and have experience with data visualization libraries. I am passionate about using data to drive decision making and would love to transition into a more data-focused role. I am a quick learner and am committed to expanding my machine learning and statistics knowledge.\n\nI look forward to discussing how my unique background could benefit your data science team.\n\nSincerely,\nRobert Anderson',
            resumeUrl: 'https://resume.example.com/robert-anderson.pdf',
            createdAt: Math.floor(new Date('2024-12-06').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-06').getTime() / 1000),
        },
        {
            jobId: 5,
            workerId: 9,
            status: 'reviewing',
            coverLetter: 'Dear Hiring Committee,\n\nI am excited to apply for the Mobile App Developer position. With extensive experience in React and JavaScript, I have recently been focusing on React Native development and am passionate about mobile platforms.\n\nI have shipped two mobile applications in the past year, gaining hands-on experience with platform-specific features, performance optimization, and app store deployment. My full-stack background enables me to build complete mobile solutions including backend APIs.\n\nI would be thrilled to bring my mobile development skills to your team.\n\nBest regards,\nJames Wilson',
            resumeUrl: 'https://resume.example.com/james-wilson.pdf',
            createdAt: Math.floor(new Date('2024-11-27').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-01').getTime() / 1000),
        },
        {
            jobId: 7,
            workerId: 5,
            status: 'pending',
            coverLetter: 'To Whom It May Concern,\n\nI am writing to express my interest in the Product Manager position. My background in QA has given me a comprehensive understanding of the product development lifecycle and user experience from a quality perspective.\n\nI have experience collaborating with product managers and have developed skills in requirements gathering, prioritization, and stakeholder communication. I believe my attention to detail and user-focused mindset would translate well to product management.\n\nI would welcome the opportunity to discuss how my unique background could benefit your product team.\n\nSincerely,\nDavid Martinez',
            resumeUrl: null,
            createdAt: Math.floor(new Date('2024-12-09').getTime() / 1000),
            updatedAt: Math.floor(new Date('2024-12-09').getTime() / 1000),
        },
    ];

    await db.insert(jobApplications).values(sampleApplications);
    
    console.log('✅ Job applications seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});