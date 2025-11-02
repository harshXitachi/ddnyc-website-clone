import Image from "next/image";
import Link from "next/link";

interface ProjectData {
  number: string;
  title: string;
  services: string[];
  imageUrl: string;
  projectUrl: string;
}

const projectsData: ProjectData[] = [
  {
    number: "01",
    title: "FIFA World Cup 2026™ NYNJ Website Design",
    services: ["Web Design", "Web Development", "Event Design"],
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/FIFA-800-x-524-25.webp",
    projectUrl: "#",
  },
  {
    number: "02",
    title: "IvyWise Education Consultancy",
    services: ["Branding", "Brand Collateral", "Web Design", "Video Production"],
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/IW-800x524-1-26.webp",
    projectUrl: "#",
  },
  {
    number: "03",
    title: "New York City FC Etihad Park Stadium - Website Design & Development",
    services: ["Web Design", "Web Development", "UI/UX", "3D Design", "Custom Animations"],
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/Stadium_800_524-27.gif",
    projectUrl: "#",
  },
  {
    number: "04",
    title: "BAS Stone",
    services: ["Web Design", "Branding", "Web Development"],
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/dd_nyc_bas_800_x_524-28.webp",
    projectUrl: "#",
  },
  {
    number: "05",
    title: "WillowWood Global Medical Branding",
    services: ["Branding", "Brand Collateral", "3D Design", "Motion Graphics"],
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/800-x-524-29.jpg",
    projectUrl: "#",
  },
  {
    number: "06",
    title: "Antidote – Luxury Candle Branding & Packaging Design",
    services: ["Branding", "Packaging Design", "Luxury", "E-commerce"],
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/309b993e-eb56-40d5-9e18-4e7d67f91ffb-dd-nyc/assets/images/AD-800x520-1-30.webp",
    projectUrl: "#",
  },
];

const ProjectCard = ({ project }: { project: ProjectData }) => (
  <Link 
    href={project.projectUrl} 
    className="group block text-text-primary transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
  >
    <div className="overflow-hidden">
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={800}
        height={524}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="pt-6">
      <div className="flex items-start gap-4">
        <span className="font-display font-medium text-base leading-tight mt-1">{project.number}</span>
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-xl lg:text-[22px] leading-[1.3] text-text-primary">{project.title}</h3>
          <p className="font-body text-text-secondary text-sm">{project.services.join(' / ')}</p>
        </div>
      </div>
    </div>
  </Link>
);


const PortfolioGrid = () => {
  return (
    <section className="bg-background-primary py-20 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16 flex items-center gap-4">
          <div className="w-12 h-px bg-divider-border"></div>
          <h2 className="text-xs font-medium uppercase tracking-wider font-display text-text-muted">
            DD.NYC® Design Agency Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>

        <div className="mt-16">
          <Link href="#" className="group inline-flex items-center gap-2 text-primary-accent font-semibold text-base hover:underline">
            <span>View all projects</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;