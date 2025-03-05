
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  delay: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen, delay }) => (
  <div 
    className="border-b border-white/10 py-4 opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
  >
    <button
      className="flex justify-between items-center w-full text-left font-medium text-white hover:text-space-blue transition-colors py-2"
      onClick={toggleOpen}
    >
      <span>{question}</span>
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="py-4 text-gray-300">{answer}</p>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "What is Stellaris: AI Space Explorer?",
      answer: "Stellaris is an advanced AI tool designed to assist with all aspects of space exploration and exoplanet settlement. It provides expert guidance, analysis, and support for astrogation, sensor analysis, terraforming, colony planning, spacecraft repairs, and construction planning."
    },
    {
      question: "How does Stellaris generate schematics?",
      answer: "Stellaris uses advanced algorithms to create detailed, step-by-step schematics for various space mission tasks. These schematics can be downloaded in PDF or DOCX format and are tailored to your specific mission requirements and situation."
    },
    {
      question: "Can Stellaris analyze my mission data?",
      answer: "Yes, Stellaris can analyze a wide range of data including statistics, real-time information from space missions, and web data. It processes this information to provide detailed support for decision-making and mission planning."
    },
    {
      question: "Is Stellaris capable of predictive modeling?",
      answer: "Absolutely. By analyzing historical trends and accessing current data, Stellaris can provide accurate predictions and projections related to space exploration and resource management to help you plan your missions more effectively."
    },
    {
      question: "How does Stellaris assist with mission planning?",
      answer: "Stellaris provides comprehensive mission plans, risk assessments, and contingency strategies. It analyzes potential dangers, calculates resource requirements, and develops detailed step-by-step procedures to maximize mission success rates."
    },
    {
      question: "Is my data safe with Stellaris?",
      answer: "Yes, all interactions with Stellaris follow OpenAI's privacy policies. For specific details about data handling, please refer to OpenAI's Privacy Policy accessible from the footer of this page."
    }
  ];
  
  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="section-container">
      <h2 className="section-title text-center">Frequently Asked Questions</h2>
      <p className="section-subtitle text-center">
        Find answers to common questions about Stellaris and its capabilities.
      </p>
      
      <div className="max-w-3xl mx-auto mt-16">
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleOpen(index)}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
