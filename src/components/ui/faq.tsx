"use client";

import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // The 1st item will be open by default

  const faqItems = [
    {
      question: "What format are the datasets provided in?",
      answer: "All datasets are provided in JSON format with a consistent structure featuring instruction, input, and output fields, making them easy to process and integrate with machine learning frameworks."
    },
    {
      question: "Can I use these datasets for commercial applications?",
      answer: "Yes, your purchase includes commercial usage rights, allowing you to use these datasets to develop and deploy commercial AI applications in healthcare."
    },
    {
      question: "Do I need specialized hardware to work with these datasets?",
      answer: "The datasets themselves are standard JSON files that can be processed on any modern computer. However, training large AI models with these datasets may require GPU resources, depending on your specific implementation."
    },
    {
      question: "How often are the datasets updated?",
      answer: "This is a one-time purchase of the current version of the datasets. Updates and expanded versions may be offered separately in the future."
    },
    {
      question: "Are the medical responses in the datasets clinically validated?",
      answer: "The datasets have been curated to provide high-quality, evidence-based medical information. However, they are intended for AI training and research purposes and should not replace professional medical advice in clinical settings."
    },
    {
      question: "What programming languages are supported by the example code?",
      answer: "The example code is provided in Python, which is the most common language for AI and machine learning development. The JSON format of the datasets allows for easy integration with any programming language that supports JSON parsing."
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