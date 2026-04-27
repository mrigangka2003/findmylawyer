import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How do I book an appointment?",
        answer: "Simply browse our list of lawyers by speciality, select a lawyer that fits your needs, and click 'Book Appointment'. Choose an available date and time slot, and confirm your booking.",
    },
    {
        question: "Are the consultation fees fixed?",
        answer: "Yes, the consultation fees listed on a lawyer's profile are fixed for the initial consultation. Any further legal fees for ongoing representation will be discussed directly with the lawyer.",
    },
    {
        question: "Can I cancel or reschedule my appointment?",
        answer: "Appointments can be rescheduled or cancelled up to 24 hours before the scheduled time through your 'My Appointments' dashboard.",
    },
    {
        question: "How are the lawyers verified?",
        answer: "We verify the credentials, bar association registration, and experience of every lawyer before they are listed on our platform to ensure you get professional legal advice.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Got questions? We've got answers.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`border ${openIndex === index ? 'border-white/30 bg-zinc-900' : 'border-white/10 bg-black'} rounded-xl overflow-hidden transition-all duration-300`}
                        >
                            <button
                                className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-medium text-left text-white text-lg">
                                    {faq.question}
                                </span>
                                <ChevronDown 
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            
                            <div 
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
