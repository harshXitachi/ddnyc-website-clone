import { db } from '@/db';
import { messages } from '@/db/schema';

async function main() {
    const sampleMessages = [
        // Conversation 1: Worker 2 and Employer 1 about Frontend Developer position (Job 1)
        {
            senderId: 2,
            receiverId: 1,
            jobId: 1,
            content: "Hi, I just submitted my application for the Frontend Developer position. I have 5 years of experience with React and Next.js, and I'm really excited about the opportunity to work on modern web applications. I noticed you're looking for someone with TypeScript expertise - I've been using it exclusively for the past 3 years. Would love to discuss how I can contribute to your team!",
            read: true,
            createdAt: new Date('2024-01-15T09:30:00').getTime(),
        },
        {
            senderId: 1,
            receiverId: 2,
            jobId: 1,
            content: "Thank you for applying, Sarah! I've reviewed your portfolio and I'm impressed with your work, especially the e-commerce platform you built. Your experience aligns well with what we're looking for. I'd like to schedule a brief call this week to discuss the role in more detail and answer any questions you might have. Are you available Wednesday or Thursday afternoon?",
            read: true,
            createdAt: new Date('2024-01-15T14:20:00').getTime(),
        },
        {
            senderId: 2,
            receiverId: 1,
            jobId: 1,
            content: "That's great to hear! I'd be happy to schedule a call. Thursday afternoon works perfectly for me - I'm available anytime after 2 PM EST. Should I prepare anything specific for our discussion? Also, could you share more about the tech stack and the team structure?",
            read: true,
            createdAt: new Date('2024-01-15T15:45:00').getTime(),
        },
        {
            senderId: 1,
            receiverId: 2,
            jobId: 1,
            content: "Perfect! Let's do Thursday at 3 PM EST. I'll send you a calendar invite with a Zoom link. We use React, Next.js 14, TypeScript, and Tailwind CSS. The team currently has 4 developers, and you'd be working closely with our product manager and UX designer. Feel free to prepare any questions about the projects, work culture, or growth opportunities. Looking forward to our chat!",
            read: true,
            createdAt: new Date('2024-01-16T10:15:00').getTime(),
        },
        {
            senderId: 2,
            receiverId: 1,
            jobId: 1,
            content: "Thank you! I received the calendar invite. I'll prepare some questions about the roadmap and team dynamics. See you Thursday at 3 PM!",
            read: false,
            createdAt: new Date('2024-01-16T11:30:00').getTime(),
        },

        // Conversation 2: Employer 3 and Worker 5 about Backend Developer position (Job 5)
        {
            senderId: 3,
            receiverId: 5,
            jobId: 5,
            content: "Hi David, we'd like to invite you for a technical interview for the Backend Developer position. Your experience with Node.js and microservices architecture is exactly what we're looking for. We have two interview slots available next week: Tuesday at 10 AM or Friday at 2 PM. The interview will consist of a technical discussion followed by a live coding session. Does either time work for you?",
            read: true,
            createdAt: new Date('2024-01-18T13:00:00').getTime(),
        },
        {
            senderId: 5,
            receiverId: 3,
            jobId: 5,
            content: "Thank you for the opportunity! I'm really excited about this position. Friday at 2 PM works better for me. Could you provide more details about the live coding session? Will I need to set up any specific environment, or will it be in a shared coding platform? Also, what topics should I focus on preparing?",
            read: true,
            createdAt: new Date('2024-01-18T16:30:00').getTime(),
        },
        {
            senderId: 3,
            receiverId: 5,
            jobId: 5,
            content: "Great! Friday at 2 PM is confirmed. We'll use CodeSandbox for the live coding - no setup needed on your end. The session will focus on API design, database optimization, and problem-solving with Node.js. We might also discuss system design concepts. I'll send you a detailed agenda and the meeting link tomorrow. The entire interview should take about 90 minutes.",
            read: true,
            createdAt: new Date('2024-01-19T09:45:00').getTime(),
        },
        {
            senderId: 5,
            receiverId: 3,
            jobId: 5,
            content: "Perfect, I'll block out 2 hours to be safe. Looking forward to receiving the agenda and meeting link. I've been reviewing database optimization techniques and will be ready to discuss real-world scenarios I've worked on. Thanks for the details!",
            read: true,
            createdAt: new Date('2024-01-19T10:20:00').getTime(),
        },
        {
            senderId: 3,
            receiverId: 5,
            jobId: 5,
            content: "Just sent the meeting details to your email. One more thing - please have a recent project ready to discuss. We'd love to hear about your approach to solving technical challenges. See you Friday!",
            read: false,
            createdAt: new Date('2024-01-20T11:00:00').getTime(),
        },

        // Conversation 3: Worker 8 and Employer 2 about UX Designer position (Job 3)
        {
            senderId: 8,
            receiverId: 2,
            jobId: 3,
            content: "Hello! I'm very interested in the UX Designer position. I have 4 years of experience in user research and interface design, primarily working with SaaS products. I saw that you're looking for someone who can conduct user testing - this is actually one of my specialties. I've attached my portfolio link in my application. Would you be open to a quick call to discuss the role in more detail?",
            read: true,
            createdAt: new Date('2024-01-17T10:00:00').getTime(),
        },
        {
            senderId: 2,
            receiverId: 8,
            jobId: 3,
            content: "Hi there! Thanks for reaching out. I reviewed your portfolio and your work on the healthcare app redesign was impressive. The user research documentation was particularly thorough. We're definitely interested in speaking with you. Before we schedule a call, could you share your experience with design systems? We're in the process of building one for our product suite.",
            read: true,
            createdAt: new Date('2024-01-17T14:30:00').getTime(),
        },
        {
            senderId: 8,
            receiverId: 2,
            jobId: 3,
            content: "Absolutely! I've worked extensively with design systems. At my previous company, I was part of the team that built and maintained our design system from scratch using Figma. We documented components, patterns, and guidelines that were used across 5 different products. I also have experience with design tokens and ensuring consistency across platforms. I can share more detailed case studies during our call if you'd like.",
            read: true,
            createdAt: new Date('2024-01-17T15:15:00').getTime(),
        },
        {
            senderId: 2,
            receiverId: 8,
            jobId: 3,
            content: "That's exactly what we need! Let's set up a call for next Monday. I'll have our lead designer join as well so we can discuss the design system project in depth. I'll send over a calendar invite shortly. In the meantime, if you have any questions about our company or the role, feel free to ask!",
            read: true,
            createdAt: new Date('2024-01-18T09:00:00').getTime(),
        },
        {
            senderId: 8,
            receiverId: 2,
            jobId: 3,
            content: "Sounds perfect! I do have a couple of questions: What design tools does your team currently use, and what's the typical project timeline you work with? Also, is the role fully remote or hybrid?",
            read: false,
            createdAt: new Date('2024-01-18T10:45:00').getTime(),
        },
        {
            senderId: 2,
            receiverId: 8,
            jobId: 3,
            content: "Good questions! We primarily use Figma for design and Jira for project management. Project timelines vary - typically 2-4 week sprints. The role is fully remote with optional office days if you're near our San Francisco location. We have team members across the US and Europe. We can discuss compensation and benefits during our call on Monday.",
            read: false,
            createdAt: new Date('2024-01-18T11:30:00').getTime(),
        },

        // Conversation 4: General conversation between Worker 12 and Employer 4 about project clarifications
        {
            senderId: 12,
            receiverId: 4,
            jobId: null,
            content: "Hi, I wanted to reach out regarding the mobile app development project. I noticed in the requirements that you mentioned both iOS and Android platforms. Just to clarify, are you looking for native development or would a React Native solution work for your needs? This will help me provide a more accurate timeline and quote for the project.",
            read: true,
            createdAt: new Date('2024-01-19T14:00:00').getTime(),
        },
        {
            senderId: 4,
            receiverId: 12,
            jobId: null,
            content: "Thanks for asking! We're open to React Native if it doesn't compromise on performance and user experience. Our main concern is having a smooth, responsive app that works well on both platforms. What's been your experience with React Native for apps with real-time features? Our app will have live chat and notifications.",
            read: true,
            createdAt: new Date('2024-01-19T16:20:00').getTime(),
        },
        {
            senderId: 12,
            receiverId: 4,
            jobId: null,
            content: "React Native handles real-time features very well! I've built several apps with live chat using Socket.io and push notifications using Firebase Cloud Messaging. Performance is excellent, and you get the benefit of a single codebase. I can share some examples of similar apps I've developed. Would you like to schedule a call to discuss the technical architecture in detail?",
            read: true,
            createdAt: new Date('2024-01-20T09:15:00').getTime(),
        },
        {
            senderId: 4,
            receiverId: 12,
            jobId: null,
            content: "That sounds promising! Yes, let's schedule a call. I'd love to see those examples and discuss the timeline. We're hoping to launch a beta version in 3 months. Is that realistic given the feature set we discussed?",
            read: false,
            createdAt: new Date('2024-01-20T10:45:00').getTime(),
        },

        // Conversation 5: Follow-up between Worker 3 and Employer 5 about Data Analyst position (Job 7)
        {
            senderId: 5,
            receiverId: 3,
            jobId: 7,
            content: "Hello! Following up on the Data Analyst position. I wanted to provide additional context about my SQL expertise. I've been working with PostgreSQL and MySQL for 6 years, optimizing complex queries and building data pipelines. I also have experience with Python for data analysis using pandas and numpy. Is there a specific project or challenge you're currently facing that I could address?",
            read: true,
            createdAt: new Date('2024-01-16T13:00:00').getTime(),
        },
        {
            senderId: 3,
            receiverId: 5,
            jobId: 7,
            content: "Hi! Thanks for the follow-up. Your SQL background is definitely strong. We're currently dealing with performance issues in our analytics dashboard - queries are taking too long to execute. We're also looking to implement predictive analytics for customer behavior. Have you worked with machine learning models for prediction?",
            read: true,
            createdAt: new Date('2024-01-16T15:30:00').getTime(),
        },
        {
            senderId: 5,
            receiverId: 3,
            jobId: 7,
            content: "Yes, I have! I've implemented several predictive models using scikit-learn and TensorFlow. For query optimization, I typically start with query analysis, indexing strategies, and sometimes database restructuring. I'd be happy to do a quick assessment of your current setup if you'd like. Could we schedule a technical discussion where I can learn more about your data infrastructure?",
            read: true,
            createdAt: new Date('2024-01-17T09:00:00').getTime(),
        },
        {
            senderId: 3,
            receiverId: 5,
            jobId: 7,
            content: "That would be excellent! I'll coordinate with our CTO and get back to you with some available times this week. In the meantime, can you send over any relevant case studies or examples of similar optimization work you've done? It would help us prepare for the discussion.",
            read: false,
            createdAt: new Date('2024-01-17T11:30:00').getTime(),
        },

        // Additional scattered messages for variety
        {
            senderId: 7,
            receiverId: 6,
            jobId: 2,
            content: "Hi, I noticed your posting for the Full Stack Developer role. I have questions about the tech stack mentioned. Are you using any specific state management library with React? Also, what's your deployment pipeline like?",
            read: true,
            createdAt: new Date('2024-01-14T11:00:00').getTime(),
        },
        {
            senderId: 6,
            receiverId: 7,
            jobId: 2,
            content: "We use Redux Toolkit for state management and have a CI/CD pipeline with GitHub Actions deploying to AWS. Happy to discuss more details in an interview if you're interested in applying!",
            read: true,
            createdAt: new Date('2024-01-14T14:20:00').getTime(),
        },
        {
            senderId: 10,
            receiverId: 8,
            jobId: null,
            content: "Hey, I saw you're looking for freelance graphic designers. I specialize in brand identity and have worked with several tech startups. Do you have a specific project in mind, or are you building a roster of designers for ongoing work?",
            read: true,
            createdAt: new Date('2024-01-21T10:00:00').getTime(),
        },
        {
            senderId: 8,
            receiverId: 10,
            jobId: null,
            content: "We're looking for both! We have an immediate rebranding project that needs to start next month, and we'd love to have reliable designers on call for future projects. Could you share your portfolio?",
            read: false,
            createdAt: new Date('2024-01-21T11:30:00').getTime(),
        },
        {
            senderId: 14,
            receiverId: 13,
            jobId: 4,
            content: "Thank you for considering my application for the Marketing Manager position. I wanted to highlight that I've successfully led campaigns that increased user acquisition by 150% in my previous role. Would you like to see the case study?",
            read: false,
            createdAt: new Date('2024-01-22T09:00:00').getTime(),
        },
    ];

    await db.insert(messages).values(sampleMessages);
    
    console.log('✅ Messages seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});