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
        <section className="border-t border-white/10 bg-[#080808] py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.75fr_1.25fr] lg:gap-24 lg:px-8">
                <div>
                    <p className="eyebrow mb-4">Before you begin</p>
                    <h2 className="font-display text-4xl leading-none text-white md:text-5xl">
                        A few clear answers.
                    </h2>
                    <p className="mt-6 max-w-sm text-sm leading-6 text-zinc-500">
                        The process is designed to make legal help feel a little more straightforward.
                    </p>
                </div>

                <div className="border-t border-white/10">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="border-b border-white/10"
                        >
                            <button
                                className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-base font-medium text-white sm:text-lg">
                                    {faq.question}
                                </span>
                                <ChevronDown 
                                    className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="max-w-2xl text-sm leading-6 text-zinc-500">
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
