import { db } from '@/db';
import { jobPostings } from '@/db/schema';

async function main() {
    const now = Date.now();
    const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);
    const thirtyDaysFromNow = now + (30 * 24 * 60 * 60 * 1000);
    const sixtyDaysFromNow = now + (60 * 24 * 60 * 60 * 1000);

    const sampleJobPostings = [
        {
            employerId: 1,
            title: 'Senior Frontend Developer',
            description: `We are seeking an experienced Senior Frontend Developer to join our innovative development team at TechFlow. In this role, you will be responsible for building and maintaining high-quality web applications using modern JavaScript frameworks.

Key Responsibilities:
• Design and implement responsive user interfaces using React and TypeScript
• Collaborate with UX designers to translate designs into functional components
• Optimize application performance and ensure cross-browser compatibility
• Lead code reviews and mentor junior developers
• Participate in architectural decisions and technical planning
• Write clean, maintainable, and well-documented code

Requirements:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript (ES6+)
• Strong understanding of HTML5, CSS3, and responsive design principles
• Experience with state management libraries (Redux, Zustand, or similar)
• Proficiency with Git and modern development workflows
• Excellent problem-solving skills and attention to detail
• Bachelor's degree in Computer Science or equivalent experience

We offer competitive compensation, comprehensive benefits, flexible work arrangements, and opportunities for professional growth in a dynamic startup environment.`,
            category: 'Software Development',
            employmentType: 'full-time',
            location: 'San Francisco, CA',
            salaryRange: '$100,000-$140,000',
            requiredSkills: JSON.stringify(['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Git', 'Redux', 'REST APIs']),
            status: 'active',
            views: 342,
            createdAt: sixtyDaysAgo + (5 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (5 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (15 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 2,
            title: 'UX/UI Designer',
            description: `MediaWave is looking for a talented UX/UI Designer to create exceptional digital experiences for our clients. You will work on diverse projects ranging from mobile apps to enterprise web platforms.

Key Responsibilities:
• Create user-centered designs through research, wireframing, and prototyping
• Design intuitive interfaces that balance aesthetics with functionality
• Develop comprehensive design systems and component libraries
• Conduct user testing and iterate based on feedback
• Collaborate closely with developers to ensure design implementation quality
• Present design concepts and rationale to stakeholders

Requirements:
• 3+ years of experience in UX/UI design
• Mastery of Figma, Adobe XD, and other design tools
• Strong portfolio demonstrating user-centered design process
• Understanding of design principles, typography, and color theory
• Experience with responsive and mobile-first design
• Knowledge of accessibility standards (WCAG)
• Excellent communication and presentation skills

This contract position offers competitive hourly rates and the opportunity to work with leading brands across various industries.`,
            category: 'Design',
            employmentType: 'contract',
            location: 'Remote',
            salaryRange: '$75-$100/hour',
            requiredSkills: JSON.stringify(['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'UI Design']),
            status: 'active',
            views: 278,
            createdAt: sixtyDaysAgo + (12 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (12 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (25 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 3,
            title: 'Content Marketing Manager',
            description: `ShopSmart is seeking a strategic Content Marketing Manager to lead our content initiatives and drive brand awareness. You will be responsible for developing and executing comprehensive content strategies across multiple channels.

Key Responsibilities:
• Develop and implement content marketing strategies aligned with business goals
• Create engaging content for blogs, social media, email campaigns, and websites
• Manage content calendar and ensure consistent brand voice
• Analyze content performance metrics and optimize for better results
• Collaborate with design, product, and sales teams
• Manage relationships with freelance writers and content creators
• Stay current with content marketing trends and best practices

Requirements:
• 4+ years of experience in content marketing or related role
• Proven track record of developing successful content strategies
• Excellent writing and editing skills
• Experience with SEO and content optimization
• Proficiency with content management systems (WordPress, HubSpot)
• Strong analytical skills and data-driven mindset
• Bachelor's degree in Marketing, Communications, or related field

Join our growing team and help shape the voice of a leading e-commerce platform with millions of users.`,
            category: 'Marketing',
            employmentType: 'full-time',
            location: 'Austin, TX',
            salaryRange: '$70,000-$90,000',
            requiredSkills: JSON.stringify(['Content Strategy', 'SEO', 'Copywriting', 'Social Media', 'Analytics', 'WordPress', 'Email Marketing']),
            status: 'active',
            views: 195,
            createdAt: sixtyDaysAgo + (8 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (8 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (20 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 4,
            title: 'Data Scientist',
            description: `FinanceHub is looking for an experienced Data Scientist to join our analytics team. You will work on challenging problems involving large-scale financial data and machine learning applications.

Key Responsibilities:
• Develop and deploy machine learning models for financial predictions
• Analyze complex datasets to extract actionable insights
• Build data pipelines and automate data processing workflows
• Create data visualizations and dashboards for stakeholders
• Collaborate with engineering teams to integrate models into production
• Conduct A/B tests and statistical analyses
• Stay current with latest developments in ML and AI

Requirements:
• Master's or PhD in Computer Science, Statistics, or related field
• 3+ years of experience in data science or machine learning
• Expert knowledge of Python and ML libraries (scikit-learn, TensorFlow, PyTorch)
• Strong statistical analysis and mathematical modeling skills
• Experience with SQL and big data technologies (Spark, Hadoop)
• Proficiency with data visualization tools (Tableau, PowerBI, matplotlib)
• Publications or contributions to open-source projects preferred

We offer competitive compensation, equity options, and the opportunity to work with cutting-edge financial technology.`,
            category: 'Data Science',
            employmentType: 'full-time',
            location: 'New York, NY',
            salaryRange: '$120,000-$150,000',
            requiredSkills: JSON.stringify(['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow', 'Data Analysis', 'Big Data']),
            status: 'active',
            views: 412,
            createdAt: sixtyDaysAgo + (3 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (3 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (10 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 5,
            title: 'Customer Support Specialist',
            description: `HealthBridge is seeking a compassionate Customer Support Specialist to provide exceptional service to our healthcare platform users. This part-time role offers flexible hours and the opportunity to make a real difference in people's lives.

Key Responsibilities:
• Respond to customer inquiries via phone, email, and chat
• Troubleshoot technical issues and guide users through solutions
• Document customer interactions and maintain detailed records
• Escalate complex issues to appropriate teams
• Provide feedback on common customer pain points
• Contribute to knowledge base articles and help documentation
• Maintain high customer satisfaction ratings

Requirements:
• 1-2 years of customer support experience
• Excellent communication and interpersonal skills
• Patient and empathetic approach to problem-solving
• Comfortable with technology and learning new software
• Ability to work independently in a remote environment
• Experience in healthcare or related field is a plus
• High school diploma required; Bachelor's degree preferred

This position offers flexible scheduling, competitive hourly pay, and opportunities to transition to full-time employment.`,
            category: 'Customer Support',
            employmentType: 'part-time',
            location: 'Remote',
            salaryRange: '$20-$25/hour',
            requiredSkills: JSON.stringify(['Customer Service', 'Communication', 'Problem Solving', 'Technical Support', 'Documentation', 'Zendesk']),
            status: 'active',
            views: 156,
            createdAt: sixtyDaysAgo + (15 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (15 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (35 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 1,
            title: 'Backend Engineer',
            description: `TechFlow is expanding our backend team and looking for a skilled Backend Engineer to build scalable server-side applications. You will work on designing and implementing robust APIs and microservices.

Key Responsibilities:
• Design and develop RESTful APIs and microservices
• Optimize database queries and improve system performance
• Implement security best practices and authentication systems
• Write comprehensive unit and integration tests
• Collaborate with frontend developers on API contracts
• Monitor system health and troubleshoot production issues
• Participate in on-call rotation for production support

Requirements:
• 3+ years of backend development experience
• Proficiency in Node.js, Python, or Go
• Strong understanding of databases (PostgreSQL, MongoDB)
• Experience with cloud platforms (AWS, GCP, or Azure)
• Knowledge of containerization (Docker, Kubernetes)
• Familiarity with message queues and caching systems
• Bachelor's degree in Computer Science or equivalent

Join a fast-paced startup environment with opportunities for technical growth and leadership.`,
            category: 'Software Development',
            employmentType: 'full-time',
            location: 'San Francisco, CA',
            salaryRange: '$90,000-$130,000',
            requiredSkills: JSON.stringify(['Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs', 'Microservices']),
            status: 'active',
            views: 289,
            createdAt: sixtyDaysAgo + (18 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (18 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (28 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 2,
            title: 'Motion Graphics Designer',
            description: `MediaWave seeks a creative Motion Graphics Designer to produce engaging animated content for digital campaigns. You will create eye-catching animations for social media, advertisements, and client presentations.

Key Responsibilities:
• Create 2D and 3D motion graphics and animations
• Develop animated explainer videos and promotional content
• Design dynamic social media assets and video content
• Collaborate with creative team on campaign concepts
• Manage multiple projects with tight deadlines
• Ensure brand consistency across all animated content
• Stay updated with latest animation trends and techniques

Requirements:
• 2+ years of motion graphics experience
• Expert in After Effects, Cinema 4D, or similar tools
• Strong portfolio showcasing diverse animation styles
• Understanding of animation principles and storytelling
• Experience with video editing software (Premiere Pro)
• Ability to work efficiently under pressure
• Art or Design degree preferred

This part-time contract position offers creative freedom and exposure to high-profile client projects.`,
            category: 'Design',
            employmentType: 'part-time',
            location: 'Los Angeles, CA',
            salaryRange: '$45-$65/hour',
            requiredSkills: JSON.stringify(['After Effects', 'Cinema 4D', 'Motion Graphics', 'Video Editing', 'Premiere Pro', 'Animation', '3D Design']),
            status: 'active',
            views: 167,
            createdAt: sixtyDaysAgo + (22 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (22 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (40 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 3,
            title: 'Social Media Manager',
            description: `ShopSmart is looking for a dynamic Social Media Manager to grow our online presence and engage with our community across all major platforms.

Key Responsibilities:
• Develop and execute social media strategies
• Create and schedule engaging content for multiple platforms
• Monitor social media metrics and provide insights
• Engage with followers and respond to comments/messages
• Manage influencer partnerships and collaborations
• Run social media advertising campaigns
• Track competitor activities and industry trends

Requirements:
• 3+ years of social media management experience
• Proven track record of growing social media audiences
• Expert knowledge of all major social platforms
• Strong copywriting and visual content creation skills
• Experience with social media management tools (Hootsuite, Buffer)
• Understanding of paid social advertising
• Creative mindset with data-driven approach

Join our team and help us build an engaged community of millions of customers.`,
            category: 'Marketing',
            employmentType: 'full-time',
            location: 'Remote',
            salaryRange: '$55,000-$75,000',
            requiredSkills: JSON.stringify(['Social Media', 'Content Creation', 'Copywriting', 'Analytics', 'Community Management', 'Instagram', 'TikTok']),
            status: 'active',
            views: 223,
            createdAt: sixtyDaysAgo + (10 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (10 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (18 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 4,
            title: 'Machine Learning Engineer',
            description: `FinanceHub is hiring a Machine Learning Engineer to develop and deploy advanced ML models for financial applications. You will work on cutting-edge projects involving predictive analytics and algorithmic trading.

Key Responsibilities:
• Design and implement production-ready ML models
• Optimize model performance and scalability
• Develop automated training and deployment pipelines
• Conduct experiments and evaluate model performance
• Collaborate with data scientists and engineers
• Monitor model drift and maintain model quality
• Research and implement latest ML techniques

Requirements:
• 4+ years of ML engineering experience
• Strong programming skills in Python and/or Java
• Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)
• Knowledge of MLOps practices and tools
• Understanding of cloud infrastructure (AWS/GCP)
• Experience with distributed computing
• Master's degree in CS, ML, or related field preferred

Competitive salary, equity, and opportunity to work with billions of data points daily.`,
            category: 'Data Science',
            employmentType: 'full-time',
            location: 'New York, NY',
            salaryRange: '$130,000-$170,000',
            requiredSkills: JSON.stringify(['Machine Learning', 'Python', 'TensorFlow', 'MLOps', 'AWS', 'Deep Learning', 'Model Deployment']),
            status: 'closed',
            views: 478,
            createdAt: sixtyDaysAgo + (2 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (2 * 24 * 60 * 60 * 1000),
            expiresAt: sixtyDaysAgo - (5 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 5,
            title: 'Technical Writer',
            description: `HealthBridge needs a skilled Technical Writer to create clear, comprehensive documentation for our healthcare platform. You will work closely with engineering and product teams to produce user guides, API documentation, and knowledge base articles.

Key Responsibilities:
• Write and maintain technical documentation
• Create user guides and tutorials
• Document APIs and integration processes
• Develop internal process documentation
• Review and edit content from subject matter experts
• Ensure documentation accuracy and clarity
• Maintain documentation versioning and updates

Requirements:
• 2+ years of technical writing experience
• Strong writing and editing skills
• Ability to understand complex technical concepts
• Experience with documentation tools (Confluence, GitBook)
• Knowledge of markdown and version control (Git)
• Healthcare or medical software experience preferred
• Bachelor's degree in English, Communications, or Technical Writing

This contract position offers flexibility and the chance to contribute to meaningful healthcare technology.`,
            category: 'Content Creation',
            employmentType: 'contract',
            location: 'Remote',
            salaryRange: '$50-$70/hour',
            requiredSkills: JSON.stringify(['Technical Writing', 'Documentation', 'Markdown', 'API Documentation', 'Editing', 'Git', 'Confluence']),
            status: 'active',
            views: 134,
            createdAt: sixtyDaysAgo + (25 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (25 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (45 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 1,
            title: 'DevOps Engineer',
            description: `TechFlow is seeking an experienced DevOps Engineer to maintain and improve our infrastructure and deployment processes. You will ensure high availability and performance of our production systems.

Key Responsibilities:
• Manage and maintain cloud infrastructure (AWS/GCP)
• Implement and optimize CI/CD pipelines
• Monitor system performance and troubleshoot issues
• Automate deployment and scaling processes
• Implement security best practices
• Manage containerized applications with Kubernetes
• Participate in incident response and on-call rotation

Requirements:
• 4+ years of DevOps or infrastructure experience
• Strong knowledge of AWS or Google Cloud Platform
• Proficiency with Docker and Kubernetes
• Experience with Infrastructure as Code (Terraform, CloudFormation)
• Scripting skills in Python, Bash, or similar
• Understanding of networking and security concepts
• Bachelor's degree in CS or related field

Competitive compensation package with benefits and professional development opportunities.`,
            category: 'Software Development',
            employmentType: 'full-time',
            location: 'San Francisco, CA',
            salaryRange: '$110,000-$145,000',
            requiredSkills: JSON.stringify(['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'Python']),
            status: 'active',
            views: 367,
            createdAt: sixtyDaysAgo + (7 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (7 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (22 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 2,
            title: 'Video Editor',
            description: `MediaWave is looking for a talented Video Editor to produce high-quality video content for diverse client projects. You will edit everything from corporate videos to social media content.

Key Responsibilities:
• Edit video content for various platforms and purposes
• Color correct and audio mix video projects
• Add motion graphics and visual effects
• Manage video assets and project files
• Collaborate with creative team on storytelling
• Ensure videos meet brand guidelines and technical specs
• Work efficiently to meet project deadlines

Requirements:
• 2+ years of professional video editing experience
• Expert in Adobe Premiere Pro and After Effects
• Strong understanding of pacing, storytelling, and timing
• Knowledge of color grading and audio mixing
• Ability to work with various video formats and codecs
• Creative eye for composition and visual aesthetics
• Portfolio showcasing diverse editing styles

Part-time position with flexible hours and opportunity for full-time advancement.`,
            category: 'Content Creation',
            employmentType: 'part-time',
            location: 'Los Angeles, CA',
            salaryRange: '$35-$50/hour',
            requiredSkills: JSON.stringify(['Premiere Pro', 'After Effects', 'Video Editing', 'Color Grading', 'Audio Mixing', 'Final Cut Pro', 'DaVinci Resolve']),
            status: 'active',
            views: 198,
            createdAt: sixtyDaysAgo + (20 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (20 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (38 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 3,
            title: 'Product Marketing Manager',
            description: `ShopSmart seeks a strategic Product Marketing Manager to drive go-to-market strategies for our e-commerce platform features. You will bridge product development and market demand.

Key Responsibilities:
• Develop product positioning and messaging strategies
• Create go-to-market plans for new features and products
• Conduct market research and competitive analysis
• Collaborate with product and sales teams
• Create marketing collateral and sales enablement materials
• Analyze product performance metrics
• Plan and execute product launches

Requirements:
• 5+ years of product marketing experience
• Proven track record of successful product launches
• Strong analytical and strategic thinking skills
• Excellent presentation and communication abilities
• Experience in e-commerce or SaaS preferred
• Proficiency with marketing analytics tools
• MBA or Bachelor's degree in Marketing or Business

Join a growing company with competitive salary and comprehensive benefits package.`,
            category: 'Marketing',
            employmentType: 'full-time',
            location: 'Austin, TX',
            salaryRange: '$85,000-$110,000',
            requiredSkills: JSON.stringify(['Product Marketing', 'Go-to-Market Strategy', 'Market Research', 'Analytics', 'Presentations', 'Product Management', 'B2B Marketing']),
            status: 'draft',
            views: 0,
            createdAt: sixtyDaysAgo + (28 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (28 * 24 * 60 * 60 * 1000),
            expiresAt: null,
        },
        {
            employerId: 4,
            title: 'Business Intelligence Analyst',
            description: `FinanceHub is hiring a Business Intelligence Analyst to transform data into actionable insights that drive business decisions. You will work with stakeholders across the organization to identify trends and opportunities.

Key Responsibilities:
• Design and maintain business intelligence dashboards
• Analyze business metrics and KPIs
• Create data visualizations and reports
• Work with stakeholders to understand data needs
• Develop SQL queries for data extraction
• Identify trends and provide strategic recommendations
• Document data definitions and methodologies

Requirements:
• 3+ years of BI or data analysis experience
• Advanced SQL skills and database knowledge
• Proficiency with BI tools (Tableau, PowerBI, Looker)
• Strong analytical and problem-solving abilities
• Experience in financial services preferred
• Excellent communication skills
• Bachelor's degree in Business, Statistics, or related field

Competitive salary with benefits and opportunity to work with large-scale financial data.`,
            category: 'Data Science',
            employmentType: 'full-time',
            location: 'Remote',
            salaryRange: '$75,000-$95,000',
            requiredSkills: JSON.stringify(['SQL', 'Tableau', 'PowerBI', 'Data Analysis', 'Business Intelligence', 'Excel', 'Data Visualization']),
            status: 'active',
            views: 256,
            createdAt: sixtyDaysAgo + (14 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (14 * 24 * 60 * 60 * 1000),
            expiresAt: thirtyDaysFromNow + (30 * 24 * 60 * 60 * 1000),
        },
        {
            employerId: 5,
            title: 'Quality Assurance Specialist',
            description: `HealthBridge needs a detail-oriented Quality Assurance Specialist to ensure our healthcare platform meets the highest quality standards. You will be responsible for testing and validating software functionality.

Key Responsibilities:
• Design and execute test plans and test cases
• Perform manual and automated testing
• Identify, document, and track software defects
• Verify bug fixes and regression testing
• Collaborate with developers on quality improvements
• Ensure compliance with healthcare regulations
• Provide testing metrics and reports

Requirements:
• 2+ years of QA testing experience
• Understanding of software testing methodologies
• Experience with test management tools (Jira, TestRail)
• Knowledge of automated testing tools (Selenium, Cypress) preferred
• Attention to detail and analytical mindset
• Healthcare software experience is a plus
• Bachelor's degree in CS or related field preferred

Part-time remote position with flexible hours and opportunities for career growth.`,
            category: 'Software Development',
            employmentType: 'part-time',
            location: 'Remote',
            salaryRange: '$30-$40/hour',
            requiredSkills: JSON.stringify(['Quality Assurance', 'Testing', 'Jira', 'Test Cases', 'Bug Tracking', 'Selenium', 'Manual Testing']),
            status: 'closed',
            views: 189,
            createdAt: sixtyDaysAgo + (1 * 24 * 60 * 60 * 1000),
            updatedAt: sixtyDaysAgo + (1 * 24 * 60 * 60 * 1000),
            expiresAt: sixtyDaysAgo - (3 * 24 * 60 * 60 * 1000),
        },
    ];

    await db.insert(jobPostings).values(sampleJobPostings);
    
    console.log('✅ Job postings seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});