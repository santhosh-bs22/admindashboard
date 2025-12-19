import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../../components/Header';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to Settings > Account > Reset Password. You will receive an email with instructions.'
    },
    {
      question: 'How can I add a new team member?',
      answer: 'Navigate to the Team page and click the "Add Member" button. Fill in the required information and submit the form.'
    },
    {
      question: 'Where can I view my revenue reports?',
      answer: 'Revenue reports are available on the Dashboard page. You can also generate custom reports from the Analytics section.'
    },
    {
      question: 'How do I export my data?',
      answer: 'Go to the specific page containing the data you want to export, click the export button (usually represented by a download icon), and choose your preferred format (CSV, Excel, or PDF).'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, our mobile app is available for both iOS and Android devices. You can download it from the respective app stores.'
    },
  ];

  return (
    <div>
      <Header title="Frequently Asked Questions" subtitle="Find answers to common questions" />
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card rounded-xl border overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="text-left font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 pt-2 border-t">
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;