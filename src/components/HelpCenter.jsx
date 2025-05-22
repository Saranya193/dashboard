import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";

const faqs = [
  {
    question: "How do I create a new article?",
    answer:
      "Go to the 'Create Article' section in the sidebar and fill out the form with your title and content.",
  },
  {
    question: "Can I import keywords from Google Search Console?",
    answer:
      "Yes, use the 'Import Keyword from GSC' tool in the Articles submenu to import keywords directly.",
  },
  {
    question: "How do I track backlinks?",
    answer:
      "Use the 'Free Backlinks' feature to add and manage backlink opportunities easily.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use the 'Live Chat Support' section to get instant help from our team.",
  },
];

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Help Center - FAQ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="search-faq">Search FAQs</Label>
          <Input
            id="search-faq"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredFaqs.length === 0 ? (
          <p>No questions match your search.</p>
        ) : (
          <ul className="space-y-2">
            {filteredFaqs.map((faq, index) => (
              <li key={index} className="border rounded-md bg-gray-50">
                <button
                  className="w-full flex justify-between items-center p-3 focus:outline-none"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className="font-semibold text-left">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {openIndex === index && (
                  <div
                    id={`faq-content-${index}`}
                    className="px-4 pb-3 text-gray-700"
                  >
                    {faq.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
