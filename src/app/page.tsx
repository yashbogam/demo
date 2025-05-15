import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from 'next';
import { WavyBackground } from "@/components/ui/wavy-background";
import { HeroHeading } from "@/components/ui/hero-heading";
import { CustomHoverButton } from "@/components/ui/custom-hover-button";
import { BentoGridItem } from "@/components/ui/bento-grid";
import { Tabs } from "@/components/ui/tabs";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { IconStethoscope, IconMessageQuestion, IconSchool, IconUserCircle, IconPill, IconFileText, IconHeartbeat, IconBrandTwitter, IconBrandLinkedin, IconBrandGithub, IconMail } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { CodeBlock } from "@/components/ui/code-block";
import { CollapsibleCodeBlock } from "@/components/ui/collapsible-code-block";

// Import ExpandableCardDemo components
import ExpandableCardDemoStandard from "@/components/expandable-card-demo-standard";

// Sample data for BentoGrid items
const items = [
  {
    title: "Clinical Decision Support",
    description: "AI-powered systems that assist healthcare providers in making informed clinical decisions based on patient data and medical knowledge.",
    header: <IconStethoscope className="h-8 w-8 text-neutral-500" />,
    icon: <IconStethoscope className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Medical Q&A Systems",
    description: "Intelligent systems that can answer medical questions with evidence-based responses, supporting both healthcare professionals and patients.",
    header: <IconMessageQuestion className="h-8 w-8 text-neutral-500" />,
    icon: <IconMessageQuestion className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Medical Education",
    description: "Advanced learning platforms that adapt to individual needs, providing personalized medical education experiences.",
    header: <IconSchool className="h-8 w-8 text-neutral-500" />,
    icon: <IconSchool className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Patient Care Management",
    description: "Comprehensive systems for managing patient care, including monitoring, treatment planning, and follow-up care coordination.",
    header: <IconUserCircle className="h-8 w-8 text-neutral-500" />,
    icon: <IconUserCircle className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Drug Discovery",
    description: "AI-driven approaches to accelerate drug discovery by analyzing medical data and identifying potential therapeutic candidates.",
    header: <IconPill className="h-8 w-8 text-neutral-500" />,
    icon: <IconPill className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Medical Documentation",
    description: "Automated systems for generating and managing medical documentation, improving efficiency and accuracy in healthcare records.",
    header: <IconFileText className="h-8 w-8 text-neutral-500" />,
    icon: <IconFileText className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Health Monitoring",
    description: "Real-time health monitoring systems that use AI to detect and predict potential health issues before they become serious.",
    header: <IconHeartbeat className="h-8 w-8 text-neutral-500" />,
    icon: <IconHeartbeat className="h-4 w-4 text-neutral-500" />,
  },
];

// Sample data for sticky scroll content
const stickyScrollContent = [
  {
    title: "Comprehensive Medical Knowledge",
    description: "Access a vast repository of medical knowledge curated from trusted sources, covering everything from basic anatomy to complex disease mechanisms.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Comprehensive Medical Knowledge
      </div>
    ),
  },
  {
    title: "Clinical Q&A Dataset",
    description: "Extensive collection of real clinical questions and expert answers, perfect for training medical AI systems and supporting healthcare professionals.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--pink-500))] flex items-center justify-center text-white">
        Clinical Q&A Dataset
      </div>
    ),
  },
  {
    title: "Medical Examination Data",
    description: "Comprehensive medical examination questions and detailed explanations, ideal for educational platforms and assessment systems.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--teal-500))] flex items-center justify-center text-white">
        Medical Examination Data
      </div>
    ),
  },
];

// Sample data for card items
const cardItems = [
  {
    title: "Clinical Decision Support Systems",
    description: "Build AI-powered systems that assist healthcare providers in making informed clinical decisions.",
    link: "#"
  },
  {
    title: "Medical Education Platforms",
    description: "Create adaptive learning experiences for medical students and healthcare professionals.",
    link: "#"
  },
  {
    title: "Healthcare Chatbots",
    description: "Develop intelligent chatbots that can provide accurate medical information and support.",
    link: "#"
  },
  {
    title: "Drug Discovery",
    description: "Accelerate drug discovery processes with AI-driven analysis of medical data.",
    link: "#"
  },
  {
    title: "Patient Care Management",
    description: "Implement comprehensive systems for managing and optimizing patient care.",
    link: "#"
  },
  {
    title: "Medical Research",
    description: "Support groundbreaking medical research with high-quality healthcare datasets.",
    link: "#"
  }
];

// Generate Open Graph metadata
export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "Accelerate Your Medical Research with DataMaster";
  const ogImageUrl = `/api/og?title=${encodeURIComponent(pageTitle)}`;
  
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://datamaster.vercel.app';
  }

  return {
    title: "DataMaster - Medical Research Platform",
    description: "Access high-quality healthcare data to accelerate your research, analytics, and ML projects.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "DataMaster - Advancing Medical Research",
      description: "High-quality healthcare data, analytics, and ML projects.",
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

// Sample testimonials data
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
    quote: "DataMaster has made clinical data analysis accessible to our entire team. It's now an essential part of our daily workflow.",
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
          containerClassName="min-h-screen w-full pt-24 pb-20" 
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
                <a href="https://link.datamaster.tech/lsqzy" target="_blank" rel="noopener noreferrer">
                  <CustomHoverButton>
                    Download Datasets
                  </CustomHoverButton>
                </a>
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
        <div className="bg-black pt-12 pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Key Benefits</h2>
              <p className="text-lg sm:text-xl mt-4 text-gray-300 max-w-3xl mx-auto">
                Why leading healthcare AI researchers and companies choose our datasets
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <ExpandableCardDemoStandard />
            </div>
          </div>
        </div>

        {/* Data Categories Section with Tabs */}
        <div className="bg-black py-16 pb-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Choose Our Medical Datasets?</h2>
            </div>
            <div className="mx-auto max-w-4xl">
              <Tabs 
                tabs={[
                  {
                    title: "Researchers & Academic Institutions",
                    value: "Researchers",
                    content: (
                      <div className="p-8 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0" style={{
                          background: "linear-gradient(to right, #000428, #004e92)",
                          filter: "blur(20px)",
                          transform: "scale(1.2)"
                        }}></div>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-white mb-4">For Researchers & Academic Institutions</h3>
                          <ul className="list-disc pl-5 text-white space-y-2">
                            <li>Train and validate medical AI models with gold-standard data</li>
                            <li>Benchmark new algorithms against established medical knowledge</li>
                            <li>Access diverse medical scenarios for robust model development</li>
                            <li>Support research in medical NLP, question-answering, and clinical decision support</li>
                          </ul>
                          <a href="https://link.datamaster.tech/lsqzy" target="_blank" rel="noopener noreferrer">
                            <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
                              Access Datasets
                            </button>
                          </a>
                        </div>
                      </div>
                    )
                  },
                  {
                    title: "Healthcare Technology",
                    value: "Healthcare",
                    content: (
                      <div className="p-8 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0" style={{
                          background: "linear-gradient(to right, #155799, #159957)",
                          filter: "blur(20px)",
                          transform: "scale(1.2)"
                        }}></div>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-white mb-4">For Healthcare Technology Companies</h3>
                          <ul className="list-disc pl-5 text-white space-y-2">
                            <li>Accelerate time-to-market with production-ready training data</li>
                            <li>Build more accurate diagnostic and decision support tools</li>
                            <li>Reduce data acquisition and annotation costs</li>
                            <li>Create superior medical AI applications with comprehensive knowledge coverage</li>
                          </ul>
                          <a href="https://link.datamaster.tech/lsqzy" target="_blank" rel="noopener noreferrer">
                            <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
                              Access Datasets
                            </button>
                          </a>
                        </div>
                      </div>
                    )
                  },
                  {
                    title: "Medical Education",
                    value: "Medical",
                    content: (
                      <div className="p-8 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0" style={{
                          background: "linear-gradient(to right, #3a6186, #89253e)",
                          filter: "blur(20px)",
                          transform: "scale(1.2)"
                        }}></div>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-white mb-4">For Medical Education Platforms</h3>
                          <ul className="list-disc pl-5 text-white space-y-2">
                            <li>Develop intelligent tutoring systems with expert-level knowledge</li>
                            <li>Create adaptive learning experiences based on proven medical content</li>
                            <li>Generate unlimited practice questions and explanations</li>
                            <li>Build systems that provide evidence-based explanations</li>
                          </ul>
                          <a href="https://link.datamaster.tech/lsqzy" target="_blank" rel="noopener noreferrer">
                            <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
                              Access Datasets
                            </button>
                          </a>
                        </div>
                      </div>
                    )
                  }
                ]}
                containerClassName="bg-black"
                activeTabClassName="bg-blue-900/40"
                tabClassName="text-white hover:text-white transition-all"
                contentClassName="mt-8"
              />
            </div>
          </div>
        </div>

        {/* Spacer to add gap between sections */}
        <div className="bg-black py-40 md:py-32"></div>

        {/* BentoGrid Section */}
        <section className="pt-28 pb-10 bg-black">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-center mb-12 text-white italic" style={{ fontFamily: 'cursive, serif' }}>AI & ML Applications in Healthcare</h2>
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
            <h3 className="text-xl sm:text-2xl font-medium text-center mb-2 text-white">Example Python Notebook</h3>
            <p className="text-center text-gray-300 mb-4">Get started quickly with our datasets using this sample code</p>
            <h4 className="text-lg sm:text-xl font-medium text-center mb-8 text-white/80">Loading and Using the Medical Datasets</h4>
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
            <h2 className="text-xl sm:text-2xl text-center mb-8 text-white/70">TRUSTED BY DEVELOPERS FROM AROUND THE WORLD </h2>
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
            <h2 className="text-3xl sm:text-4xl font-medium text-center mb-12 text-white">Applications & Use Cases</h2>
            <HoverEffect items={cardItems} />
          </div>
        </section>

        {/* Dataset Access Links Section */}
        <section className="bg-black py-8">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center text-center">
              <p className="text-white text-xl mr-4">Access Sample datasets here:</p>
              <div className="flex flex-col md:flex-row items-center justify-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-full max-w-[300px] mx-auto md:w-auto md:mx-0">
                  <LinkPreview 
                    url="https://link.datamaster.tech/kaggle"
                    width={300}
                    height={150}
                  >
                    <span className="text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap">
                      Kaggle
                    </span>
                  </LinkPreview>
                </div>
                
                <span className="hidden md:inline text-white text-xl mx-2">and</span>

                <div className="w-full max-w-[300px] mx-auto md:w-auto md:mx-0">
                  <LinkPreview 
                    url="https://link.datamaster.tech/huggingface"
                    width={300}
                    height={150}
                  >
                    <span className="text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap">
                      HuggingFace
                    </span>
                  </LinkPreview>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section - How It Works */}
        <section className="bg-black py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <Timeline  
              data={[
                {
                  title: "1. Complete Purchase",
                  content: (
                    <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-gray-300">
                        Click the "Purchase Now" button and complete the secure payment process through our payment gateway.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "2. Receive Download Link",
                  content: (
                    <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-gray-300">
                        Upon payment confirmation, you'll immediately receive an email with your secure download link to access the datasets.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "3. Download ZIP File",
                  content: (
                    <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-gray-300">
                        Download the compressed ZIP file containing all datasets, documentation, and example code to your local system.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "4. Extract & Integrate",
                  content: (
                    <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-gray-300">
                        Extract the files and begin integrating the datasets into your AI development workflow using our example code as a starting point.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-black pt-0">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-center mb-8 text-white">What Our Users Say</h2>
            <div className="max-w-5xl mx-auto rounded-2xl">
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-black py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-center mb-12 text-white">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <FAQ />
            </div>
          </div>
        </section>

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
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sample Code</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-center text-gray-400">
                © {new Date().getFullYear()} DataMaster. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageWrapper>
  );
}