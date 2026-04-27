import { Shield, Clock, Users, CheckCircle } from "lucide-react";

const features = [
    {
        icon: <Shield className="w-8 h-8 text-white" />,
        title: "Verified Legal Experts",
        description: "Every lawyer on our platform undergoes a strict verification process to ensure top-tier legal representation.",
    },
    {
        icon: <Clock className="w-8 h-8 text-white" />,
        title: "24/7 Availability",
        description: "Book consultations at your convenience. Our platform allows you to schedule appointments anytime, anywhere.",
    },
    {
        icon: <Users className="w-8 h-8 text-white" />,
        title: "Client-Centric Approach",
        description: "We prioritize your needs, connecting you with professionals who listen, understand, and fight for your rights.",
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-white" />,
        title: "Transparent Pricing",
        description: "No hidden fees. You see the consultation fees upfront before booking any appointment.",
    },
];

const Features = () => {
    return (
        <section className="py-24 bg-zinc-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        Why Choose FindMyLawyer?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We bridge the gap between you and exceptional legal counsel, making the process of finding a lawyer simple, secure, and transparent.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-black border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 group"
                        >
                            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
