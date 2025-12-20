import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, FileText } from 'lucide-react';
import Header from '../../components/Header';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';

// --- FAQ Data with Categories ---
const faqData = [
  {
    id: 1,
    question: "How do I download GST compliant invoices?",
    answer: "Navigate to the 'Invoices' page from the sidebar. Select the specific invoice you need and click the 'Export' button. All invoices are automatically generated with your registered GSTIN and address details.",
    category: "Billing"
  },
  {
    id: 2,
    question: "How do I change my default currency to INR (₹)?",
    answer: "The dashboard automatically detects your region. However, you can manually force INR formatting by going to Settings > Preferences > Currency and selecting 'Indian Rupee (INR)'.",
    category: "Settings"
  },
  {
    id: 3,
    question: "Can I assign different roles to my team members?",
    answer: "Yes. Go to the 'Manage Team' section. When adding or editing a user, you can assign roles such as 'Admin', 'Manager', or 'User'. Admins have full access, while Users have view-only permissions for sensitive data.",
    category: "Team Management"
  },
  {
    id: 4,
    question: "Is the geography map data real-time?",
    answer: "The main dashboard map updates every 24 hours. However, the 'Active Users' count on the Dashboard overview is a live stream updated every few seconds.",
    category: "Technical"
  },
  {
    id: 5,
    question: "How do I integrate UPI payments?",
    answer: "We support major UPI gateways (PhonePe, Razorpay, Paytm). Go to Settings > Integrations and paste your API keys. The 'Transactions' page will then start showing UPI payment statuses.",
    category: "Integrations"
  },
  {
    id: 6,
    question: "What happens if I forget my admin password?",
    answer: "Click on 'Forgot Password' at the login screen. An OTP will be sent to your registered mobile number (+91...) and email address for verification.",
    category: "Security"
  }
];

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Toggle Accordion State
  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter Logic
  const filteredFAQs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Header title="Help Center" subtitle="Find answers to common questions" />

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-card text-card-foreground shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
          placeholder="Search for questions, keywords, or topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main FAQ List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              return (
                <Card 
                  key={faq.id} 
                  className={cn(
                    "cursor-pointer transition-all duration-200 border hover:border-primary/50",
                    isOpen ? "ring-1 ring-primary/20" : "hover:shadow-sm"
                  )}
                  onClick={() => toggleItem(faq.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-5">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {faq.category}
                        </span>
                        <h3 className="text-base font-medium leading-6">{faq.question}</h3>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    
                    {/* Accordion Content with simple animation logic */}
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out px-5",
                        isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed border-t pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No results found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

        {/* Sidebar: Contact Support */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="p-3 bg-white/10 w-fit rounded-lg">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Still have questions?</h3>
                <p className="text-sm text-primary-foreground/80 mt-1">
                  Can't find the answer you're looking for? Our team is here to help you.
                </p>
              </div>
              <button className="w-full bg-white text-primary font-semibold py-2 rounded-md hover:bg-white/90 transition-colors text-sm">
                Chat with Support
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-semibold text-sm">Other ways to reach us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Mail className="h-4 w-4" />
                  <span>support@adminis.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Phone className="h-4 w-4" />
                  <span>+91 800-123-4567</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;