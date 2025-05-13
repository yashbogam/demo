import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from 'next';
import { WavyBackground } from "@/components/ui/wavy-background";
import { HeroHeading } from "@/components/ui/hero-heading";
import { CustomHoverButton } from "@/components/ui/custom-hover-button";
import { BentoGridItem } from "@/components/ui/bento-grid";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HoverEffect } from "@/components/ui/card-hover-effect";
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
import { CodeBlock } from "@/components/ui/code-block";
import { CollapsibleCodeBlock } from "@/components/ui/collapsible-code-block";

// Import ExpandableCardDemo components
import ExpandableCardDemoStandard from "@/components/expandable-card-demo-standard";

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
    src: "/optimized-images/HuggingFace.svg",
    alt: "Hugging Face",
    width: 180,
    height: 60
  },
  {
    src: "/optimized-images/openai.svg",
    alt: "OpenAI",
    width: 180,
    height: 60
  },
  {
    src: "/optimized-images/Microsoft.svg.webp",
    alt: "Microsoft",
    width: 180,
    height: 60
  },
  {
    src: "/optimized-images/google.svg",
    alt: "Google",
    width: 180,
    height: 60
  },
  {
    src: "/optimized-images/nvidia.svg",
    alt: "NVIDIA", 
    width: 180,
    height: 60
  },
  {
    src: "/optimized-images/Kaggle.svg.webp",
    alt: "Kaggle",
    width: 180,
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
                  src="/optimized-images/hero.svg"
                  alt="Medical data visualization"
                  width={900}
                  height={900}
                  className="object-contain"
                  priority={true}
                  quality={95}
                />
              </div>
            </div>
          </div>
        </WavyBackground>

        {/* Key Benefits Section */}
        <div className="bg-black py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white">Key Benefits</h2>
              <p className="text-xl mt-4 text-gray-300 max-w-3xl mx-auto">
                Why leading healthcare AI researchers and companies choose our datasets
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <ExpandableCardDemoStandard />
            </div>
          </div>
        </div>

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

        {/* Code Example Section */}
        <section className="bg-black pt-4 pb-12">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h3 className="text-2xl font-medium text-center mb-2 text-white">Example Python Notebook</h3>
            <p className="text-center text-gray-300 mb-4">Get started quickly with our datasets using this sample code</p>
            <h4 className="text-xl font-medium text-center mb-8 text-white/80">Loading and Using the Medical Datasets</h4>
            <div className="max-w-3xl mx-auto">
              <CollapsibleCodeBlock
                language="python"
                filename="medical_dataset_integration.py"
                initialVisibleLines={20}
                code={`# Sample Python Notebook for Medical Dataset Integration

import json
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# 1. Loading the datasets
def load_medical_dataset(file_path):
    """Load a medical dataset from a JSON file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

# Example paths (replace with your actual paths after unzipping)
entrance_exam_path = './medical_datasets/evaluation-medical-instruction-dataset.json'
clinical_qa_path = './medical_datasets/HealthCareMagic-100k.json'
medical_facts_path = './medical_datasets/medical_meadow_wikidoc_medical_flashcards.json'

# Load datasets
entrance_exam_data = load_medical_dataset(entrance_exam_path)
clinical_qa_data = load_medical_dataset(clinical_qa_path)
medical_facts_data = load_medical_dataset(medical_facts_path)

print(f"Entrance Exam Questions: {len(entrance_exam_data)}")
print(f"Clinical Q&A Pairs: {len(clinical_qa_data)}")
print(f"Medical Facts: {len(medical_facts_data)}")

# 2. Converting to DataFrame for analysis
def convert_to_dataframe(data):
    """Convert dataset to DataFrame for easier analysis."""
    return pd.DataFrame(data)

entrance_exam_df = convert_to_dataframe(entrance_exam_data)
clinical_qa_df = convert_to_dataframe(clinical_qa_data)
medical_facts_df = convert_to_dataframe(medical_facts_data)

# Display sample entries
print("\\nSample Entrance Exam Question:")
print(entrance_exam_df.iloc[0])

print("\\nSample Clinical Q&A:")
print(clinical_qa_df.iloc[0])

print("\\nSample Medical Fact:")
print(medical_facts_df.iloc[0])

# 3. Preparing data for model fine-tuning
def prepare_for_training(df, test_size=0.1):
    """Prepare dataset for model training."""
    # Combine instruction, input, and output into training format
    df['text'] = df.apply(lambda row: f"Instruction: {row['instruction']}\\nInput: {row['input']}\\nOutput: {row['output']}", axis=1)
    
    # Split into training and validation sets
    train_df, val_df = train_test_split(df, test_size=test_size, random_state=42)
    
    return train_df, val_df

# Prepare datasets
train_entrance, val_entrance = prepare_for_training(entrance_exam_df)
train_clinical, val_clinical = prepare_for_training(clinical_qa_df)
train_facts, val_facts = prepare_for_training(medical_facts_df)

print(f"\\nTraining set sizes:")
print(f"Entrance Exam: {len(train_entrance)}")
print(f"Clinical Q&A: {len(train_clinical)}")
print(f"Medical Facts: {len(train_facts)}")

# 4. Example: Fine-tuning a model (pseudocode)
def finetune_model(training_data, model_name="meta-llama/Llama-2-7b-chat-hf"):
    """Fine-tune a model on medical data (conceptual example)."""
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    
    # Tokenize data and prepare for training
    # ... (tokenization code)
    
    # Set up training arguments
    # ... (training arguments)
    
    # Fine-tune model
    # ... (training loop)
    
    return model, tokenizer

# Note: This function is a placeholder showing the concept, not actual implementation
# model, tokenizer = finetune_model(train_clinical)

# 5. Example: Creating a specialized medical chatbot
def create_medical_chatbot(model, tokenizer):
    """Create a medical chatbot using the fine-tuned model."""
    def answer_medical_question(question):
        prompt = f"Instruction: If you are a doctor, please answer the medical question based on your knowledge.\\nInput: {question}\\nOutput:"
        inputs = tokenizer(prompt, return_tensors="pt")
        output = model.generate(**inputs, max_length=200)
        return tokenizer.decode(output[0], skip_special_tokens=True)
    
    return answer_medical_question

# Example usage (pseudocode)
# medical_bot = create_medical_chatbot(model, tokenizer)
# response = medical_bot("What are the symptoms of diabetes?")
# print(response)

# 6. Data Analysis Example
def analyze_dataset_content(df, column='input', n_words=10):
    """Analyze content of the dataset."""
    # Count common medical terms
    all_text = ' '.join(df[column].astype(str))
    words = all_text.lower().split()
    word_freq = pd.Series(words).value_counts().head(n_words)
    
    # Plot common terms
    plt.figure(figsize=(10, 6))
    word_freq.plot(kind='bar')
    plt.title(f'Most Common Terms in {column} Column')
    plt.xlabel('Term')
    plt.ylabel('Frequency')
    plt.tight_layout()
    
    return word_freq

# Example analysis
common_terms = analyze_dataset_content(clinical_qa_df)
print("\\nMost common terms in clinical questions:")
print(common_terms)`}
                highlightLines={[10, 11, 12, 13, 14, 42, 43, 44, 45, 46, 47, 48, 70, 71, 72, 73, 74]}
              />
            </div>
          </div>
        </section>

        {/* Logo Slider Section */}
        <section className="bg-black pt-0 pb-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-2xl text-center mb-8 text-white/70">TRUSTED BY DEVELOPERS FROM AROUND THE WORLD </h2>
            <InfiniteLogoSlider logos={partnerLogos} speed={60} />
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

        {/* Applications & Use Cases Section */}
        <section className="bg-black py-16 pt-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-4xl font-medium text-center mb-12 text-white">Applications & Use Cases</h2>
            <HoverEffect items={cardItems} />
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
                    src="/optimized-images/002.svg" 
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
    title: "Medical Entrance Exam Dataset",
    description: "Thousands of real-world medical entrance exam multiple-choice questions with expert answers covering all major specialties and topics. Format: JSON with instruction-input-output fields",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <Image 
          src="/optimized-images/med_exam.webp" 
          alt="Medical Entrance Exam Dataset visualization" 
          width={320}
          height={240}
          className="object-contain h-full w-full"
          quality={85}
        />
      </div>
    ),
  },
  {
    title: "Clinical Consultation Dataset",
    description: "Patient-doctor consultation Q&A pairs with detailed physician responses covering diagnosis, treatment options, and medical advice. Format: JSON with instruction-input-output fields",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <Image 
          src="/optimized-images/clinical_dataset.webp" 
          alt="Clinical Consultation Dataset visualization" 
          width={320}
          height={240}
          className="object-contain h-full w-full"
          quality={85}
        />
      </div>
    ),
  },
  {
    title: "Medical Knowledge Facts",
    description: "Concise, evidence-based answers to medical questions covering biochemistry, physiology, pharmacology, and clinical knowledge. Format: JSON with instruction-input-output fields",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <Image 
          src="/optimized-images/med_knowledge.webp" 
          alt="Medical Knowledge Facts visualization" 
          width={320}
          height={240}
          className="object-contain h-full w-full"
          quality={85}
        />
      </div>
    ),
  },
];

const cardItems = [
  {
    title: "Medical AI Model Training",
    description: "Fine-tune general large language models for medical domain specific applications. Create models that understand medical terminology and context for accurate responses.",
    link: "#analytics",
  },
  {
    title: "Clinical Decision Support",
    description: "Develop AI systems that assist healthcare providers by suggesting potential diagnoses, treatment options, and relevant clinical guidelines based on patient data.",
    link: "#ml-models",
  },
  {
    title: "Medical Education",
    description: "Create intelligent tutoring systems for medical students, offering personalized learning experiences, question-answering, and exam preparation assistance.",
    link: "#compliance",
  },
  {
    title: "Patient Communication",
    description: "Build AI tools that help explain medical concepts to patients in accessible language, answer common questions, and provide general health education.",
    link: "#research",
  },
  {
    title: "Medical Research",
    description: "Enhance information retrieval systems for medical researchers, enabling quick access to relevant knowledge and evidence-based information.",
    link: "#visualization",
  },
  {
    title: "Medical Benchmarking",
    description: "Utilize our datasets to evaluate the performance of existing AI models on medical knowledge tasks, identifying areas for improvement.",
    link: "#custom",
  },
]; 
