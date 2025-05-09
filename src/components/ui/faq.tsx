"use client";

import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(4); // The 5th item (index 4) will be open by default

  const faqItems = [
    {
      question: "What types of healthcare datasets do you offer?",
      answer: "We offer a comprehensive range of healthcare datasets including electronic health records (anonymized), medical imaging data, clinical trial data, genomic information, pharmaceutical research data, and public health statistics. All datasets comply with relevant privacy regulations."
    },
    {
      question: "How is data privacy and security maintained?",
      answer: "We maintain HIPAA compliance through robust security protocols, including end-to-end encryption, secure access controls, regular security audits, and comprehensive data anonymization processes. All users must comply with our strict data usage agreements to ensure ethical handling of sensitive information."
    },
    {
      question: "Can I integrate DataMaster with existing systems?",
      answer: "Yes, DataMaster offers flexible API integration options compatible with most popular healthcare analytics platforms, EHR systems, and research tools. Our developer documentation provides comprehensive guides for seamless integration with your existing workflows and systems."
    },
    {
      question: "Is there a trial version available?",
      answer: "We offer a 30-day free trial with access to sample datasets and core platform features. This allows researchers and organizations to evaluate the platform's capabilities before committing to a subscription. Contact our sales team to arrange a personalized demo and trial setup."
    },
    {
      question: "What support options are available for users?",
      answer: "We provide multiple levels of support including comprehensive documentation, video tutorials, regular webinars, email support, and dedicated account managers for enterprise clients. Our technical support team is available during business hours, and emergency support is provided 24/7 for critical issues. We also offer customized training sessions for teams new to the platform."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div 
          key={index} 
          className="border border-neutral-800 rounded-lg overflow-hidden transition-all duration-300"
        >
          <button 
            className="w-full flex justify-between items-center p-4 text-left bg-[rgb(14,17,22)] hover:bg-opacity-70 hover:backdrop-blur-sm hover:bg-[rgba(14,17,22,0.7)] transition-all"
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-lg font-medium text-white">{item.question}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96 p-4 backdrop-blur-md bg-black/30' : 'max-h-0'
            }`}
          >
            <p className="text-gray-300">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ; 