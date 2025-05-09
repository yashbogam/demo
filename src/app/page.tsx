import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from 'next';
import { WavyBackground } from "@/components/ui/wavy-background";
import { HeroHeading } from "@/components/ui/hero-heading";
import { CustomHoverButton } from "@/components/ui/custom-hover-button";
import { BentoGridItem } from "@/components/ui/bento-grid";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { PageWrapper } from "@/components/ui/page-wrapper";

// Generate Open Graph metadata
export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "Accelerate Your Medical Research with DataMaster"; // Example title for the homepage OG image
  const ogImageUrl = `/api/og?title=${encodeURIComponent(pageTitle)}`;
  
  // Determine the base URL - use environment variable if available, or fallback
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    // For local development or when env isn't available
    baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://datamaster.vercel.app';
  }

  return {
    // You can add other metadata here if needed, like title, description for the page itself
    title: "DataMaster - Medical Research Platform",
    description: "Access high-quality healthcare data to accelerate your research, analytics, and ML projects.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "DataMaster - Advancing Medical Research", // OG specific title
      description: "High-quality healthcare data, analytics, and ML projects.", // OG specific description
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'DataMaster Social Card',
        },
      ],
      type: 'website',
      siteName: 'DataMaster',
    },
    twitter: {
      card: 'summary_large_image',
      title: "DataMaster - Advancing Medical Research",
      description: "High-quality healthcare data, analytics, and ML projects.",
      images: [ogImageUrl],
    },
    other: {
      'preconnect': 'https://images.unsplash.com',
    }
  };
}

// Dynamically import components
const AnimatedTestimonials = dynamic(() => import("@/components/ui/animated-testimonials").then(mod => mod.AnimatedTestimonials), {
  loading: () => <p>Loading testimonials...</p>,
});
const InfiniteLogoSlider = dynamic(() => import("@/components/ui/infinite-logo-slider").then(mod => mod.InfiniteLogoSlider), {
  loading: () => <p>Loading logos...</p>,
});
const FAQ = dynamic(() => import("@/components/ui/faq"), {
  loading: () => <p>Loading FAQ...</p>,
});
const PinContainer = dynamic(() => import("@/components/ui/3d-pin").then(mod => mod.PinContainer), {
  loading: () => <p>Loading pin...</p>,
});
const LinkPreview = dynamic(() => import("@/components/ui/link-preview").then(mod => mod.LinkPreview), {
  loading: () => <p>Loading preview...</p>,
});

const BentoGrid = dynamic(() => import("@/components/ui/bento-grid").then(mod => mod.BentoGrid), {
  loading: () => <p>Loading grid...</p>,
});
const StickyScroll = dynamic(() => import("@/components/ui/sticky-scroll-reveal").then(mod => mod.StickyScroll), {
  loading: () => <p>Loading scroll content...</p>,
});

// Sample testimonials data for the AnimatedTestimonials component
const testimonials = [
  {
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    name: "Dr. Sarah Johnson",
    designation: "Medical Researcher at Stanford University",
    quote: "DataMaster has revolutionized our research workflow. The quality of healthcare datasets and the analytical tools have significantly accelerated our discoveries in cardiovascular disease treatment.",
  },
  {
    src: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
    name: "James Wilson",
    designation: "Data Scientist at Mayo Clinic",
    quote: "DataMaster has made clinical data analysis accessible to our entire team. It&apos;s now an essential part of our daily workflow.",
  },
  {
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    name: "Dr. Maria Rodriguez",
    designation: "Head of Oncology Research",
    quote: "Access to high-quality medical datasets has been instrumental in our cancer research. DataMaster's HIPAA compliance and data security features give us confidence that we're working with protected information.",
  },
];

// Sample logos for the InfiniteLogoSlider
const partnerLogos = [
  {
    src: "/logos/mayo-clinic.svg",
    alt: "Mayo Clinic",
    width: 150,
    height: 60
  },
  {
    src: "/logos/stanford-medicine.svg",
    alt: "Stanford Medicine",
    width: 180,
    height: 60
  },
  {
    src: "/logos/cleveland-clinic.svg",
    alt: "Cleveland Clinic",
    width: 160,
    height: 60
  },
  {
    src: "/logos/mount-sinai.svg",
    alt: "Mount Sinai",
    width: 140,
    height: 60
  },
  {
    src: "/logos/john-hopkins.svg",
    alt: "Johns Hopkins Medicine",
    width: 180,
    height: 60
  },
  {
    src: "/logos/nih.svg",
    alt: "National Institutes of Health",
    width: 140,
    height: 60
  },
  {
    src: "/logos/mass-general.svg",
    alt: "Massachusetts General Hospital",
    width: 170,
    height: 60
  },
];

export default function Home() {
  return (
    <PageWrapper>
      <div className="bg-black overflow-hidden">
        {/* Hero Section */}
        <WavyBackground 
          containerClassName="min-h-screen w-full pt-24 pb-0" 
          backgroundFill="#000000"
          blur={10}
          waveWidth={100}
          waveOpacity={0.7}
          colors={["#0a2463", "#3e92cc", "#2176FF", "#5D2E8C", "#2B2D42"]}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-12">
            <div className="text-left w-full md:w-2/5 mb-8 md:mb-0">
              <HeroHeading />
              <p className="text-xl md:text-2xl text-gray-300 max-w-xl mt-6">
                Access high-quality healthcare data to accelerate your medical research, analytics, and machine learning projects.
              </p>
              <div className="mt-8">
                <CustomHoverButton>
                  Browse Datasets
                </CustomHoverButton>
              </div>
            </div>
            <div className="hidden md:block md:w-3/5 relative">
              <div className="relative right-0">
                <Image
                  src="/hero.svg"
                  alt="Medical data visualization"
                  width={900}
                  height={900}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </WavyBackground>

        {/* Container Scroll Section */}
        <div className="bg-black -mt-2">
          <ContainerScroll
            titleComponent={
              <h1 className="text-4xl font-semibold text-white mb-10">
                <span className="text-blue-500">Transforming Healthcare</span> with Data-Driven Insights
              </h1>
            }
          >
            <div className="flex flex-col items-center justify-center h-full bg-black text-white space-y-6 p-4 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Discover Our Comprehensive Data Platform</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Curated Datasets</h3>
                  <p className="text-gray-300">Access to verified healthcare data collections from trusted sources.</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                  <p className="text-gray-300">Powerful tools to analyze and visualize complex medical data.</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">HIPAA Compliant</h3>
                  <p className="text-gray-300">All data handling follows strict security and privacy standards.</p>
                </div>
              </div>
              <div className="mt-8 w-full max-w-4xl">
                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-blue-800 to-purple-900 flex items-center justify-center">
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Driving Medical Innovation</h3>
                    <p className="text-xl">Join researchers and healthcare professionals using our platform to advance medical knowledge and improve patient outcomes.</p>
                  </div>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>

        {/* BentoGrid Section */}
        <section className="pt-0 pb-10 bg-black -mt-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-4xl font-medium text-center mb-12 text-white italic" style={{ fontFamily: 'cursive, serif' }}>Why Choose DataMaster</h2>
            <BentoGrid className="max-w-4xl mx-auto">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className={i === 3 || i === 6 ? "md:col-span-2 bg-black border-neutral-800" : "bg-black border-neutral-800"}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Logo Slider Section */}
        <section className="bg-black pt-0 pb-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-2xl text-center mb-8 text-white/70">Trusted by Leading Healthcare Organizations</h2>
            <InfiniteLogoSlider logos={partnerLogos} speed={40} />
          </div>
        </section>

        {/* BoxReveal Section */}
        <section className="py-0 bg-black -mt-4">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-4xl mx-auto flex flex-col gap-16 py-16">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                  <BoxReveal boxColor="#000000" duration={0.7}>
                    <h3 className="text-3xl font-bold text-white mb-4">Powerful Analytics Tools</h3>
                    <p className="text-gray-300 text-lg">
                      Our platform provides cutting-edge analytics capabilities that help researchers and healthcare professionals extract meaningful insights from complex datasets.
                    </p>
                  </BoxReveal>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                  <BoxReveal boxColor="#000000" duration={0.8} width="100%">
                    <div className="bg-black p-6 rounded-xl shadow-lg">
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                          <path d="M3 3v18h18"></path>
                          <path d="M9 9l0 8"></path>
                          <path d="M15 13l0 4"></path>
                          <path d="M21 5l0 16"></path>
                          <path d="M21 11l-6-6"></path>
                          <path d="M3 15l6-6"></path>
                        </svg>
                      </div>
                    </div>
                  </BoxReveal>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="md:w-1/2">
                  <BoxReveal boxColor="#000000" duration={0.7}>
                    <h3 className="text-3xl font-bold text-white mb-4">Secure & Compliant</h3>
                    <p className="text-gray-300 text-lg">
                      We prioritize the security and privacy of sensitive healthcare data, ensuring all information is handled in accordance with industry regulations.
                    </p>
                  </BoxReveal>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                  <BoxReveal boxColor="#000000" duration={0.8} width="100%">
                    <div className="bg-black p-6 rounded-xl shadow-lg">
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          <circle cx="12" cy="16" r="1"></circle>
                        </svg>
                      </div>
                    </div>
                  </BoxReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* StickyScroll Section */}
        <section className="bg-black -mt-1">
          <div className="container mx-auto px-0 md:px-0 lg:px-0">
            <StickyScroll
              content={stickyScrollContent}
              contentClassName="bg-black"
            />
          </div>
        </section>

        {/* Simple Card Section */}
        <section className="bg-black pt-0 -mt-1">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-4xl font-medium text-center mb-12 text-white">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto py-10">
              {cardItems.map((item, idx) => (
                <a href={item.link} key={`service-card-${idx}`} className="block">
                  <div className="rounded-2xl h-full w-full p-8 overflow-hidden bg-black border border-neutral-800 hover:border-neutral-700 transition-all duration-200">
                    <h4 className="text-xl font-semibold text-white mb-4">{item.title}</h4>
                    <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-black pt-0">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-4xl font-medium text-center mb-8 text-white">What Our Users Say</h2>
            <div className="max-w-5xl mx-auto rounded-2xl">
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-black py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-4xl font-medium text-center mb-12 text-white">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <FAQ />
            </div>
          </div>
        </section>

        {/* New Section with 3D Pin and SVG */}
        <section className="bg-black py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-4xl font-medium text-center mb-16 text-white">Connect With Us</h2>
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
              {/* Left Side - 3D Pin */}
              <div className="w-full md:w-1/2 flex justify-center mb-12 md:mb-0">
                <div className="h-64">
                  <PinContainer
                    title="Contact Our Team"
                    href="/contact"
                  >
                    <div className="flex flex-col items-center justify-center p-4">
                      <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
                      <p className="text-center text-white/80">
                        Have questions about our platform? Our team is ready to help you get started.
                      </p>
                      <div className="mt-4 bg-blue-500/20 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mx-auto">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                    </div>
                  </PinContainer>
                </div>
              </div>
              
              {/* Right Side - SVG */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-72 h-72 md:w-96 md:h-96">
                  <Image 
                    src="/002.svg" 
                    alt="Abstract Design" 
                    width={400} 
                    height={400} 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Link Preview Section */}
        <div className="bg-black flex justify-center">
          <div className="text-center">
            <p className="text-white/60 text-sm mb-2">Developed by</p>
            <LinkPreview 
              url="https://github.com/yourusername"
              width={300}
              height={150}
            >
              <span className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                DataMaster Development Team
              </span>
            </LinkPreview>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-t from-blue-950/30 to-black pt-16 pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">DataMaster</h3>
                <p className="text-gray-400 mb-6">
                  Empowering healthcare research with advanced data analytics and secure access to medical datasets.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <IconBrandTwitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <IconBrandLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <IconBrandGithub className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <IconMail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Products</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Datasets</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Access</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Papers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-neutral-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} DataMaster. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageWrapper>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-400" />,
  },
];

const stickyScrollContent = [
  {
    title: "Comprehensive Data Collection",
    description: "Access our extensive library of healthcare datasets, carefully curated and maintained for research and analysis.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white p-4">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span className="text-lg font-medium">Data Library</span>
        </div>
      </div>
    ),
  },
  {
    title: "Advanced Visualization Tools",
    description: "Transform complex medical data into intuitive visualizations that reveal patterns and insights at a glance.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white p-4">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span className="text-lg font-medium">Visual Analytics</span>
        </div>
      </div>
    ),
  },
  {
    title: "Research Collaboration",
    description: "Connect with experts and collaborate on groundbreaking research projects using our secure data-sharing features.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white p-4">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span className="text-lg font-medium">Collaboration Network</span>
        </div>
      </div>
    ),
  },
];

const cardItems = [
  {
    title: "Data Analytics",
    description: "Our advanced analytics tools help you transform raw data into actionable insights for better healthcare outcomes.",
    link: "#analytics",
  },
  {
    title: "Machine Learning Models",
    description: "Leverage our pre-trained healthcare ML models to predict patient outcomes and optimize treatment plans.",
    link: "#ml-models",
  },
  {
    title: "HIPAA Compliance",
    description: "All our data processing and storage solutions meet strict healthcare industry security standards.",
    link: "#compliance",
  },
  {
    title: "Research Collaboration",
    description: "Connect with leading medical researchers and institutions through our secure collaboration platform.",
    link: "#research",
  },
  {
    title: "Data Visualization",
    description: "Create stunning visual representations of complex medical data for easier interpretation.",
    link: "#visualization",
  },
  {
    title: "Custom Solutions",
    description: "Our team can build tailored data solutions to meet your specific healthcare organization needs.",
    link: "#custom",
  },
]; 
