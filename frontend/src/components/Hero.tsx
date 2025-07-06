import { useNavigate } from "react-router-dom";
import {ArrowRight, Scale, Shield, Users, Award, ChevronRight } from "lucide-react";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex flex-col pt-8 items-center justify-start overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <Scale size={600} className="text-white" strokeWidth={0.5} />
            </div>

            <div className="absolute top-3 left-20 opacity-10">
                <Shield size={100} className="text-white animate-pulse" />
            </div>
            <div className="absolute bottom-20 right-20 opacity-10">
                <Users size={120} className="text-white animate-pulse" />
            </div>
            <div className="absolute top-5 right-40 opacity-10">
                <Award size={80} className="text-white animate-pulse" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                <div className="mb-3">
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 italic leading-relaxed mb-2">
                        "Justice delayed is justice denied"
                    </blockquote>
                    <cite className="text-white/60 text-lg font-medium">
                        — William E. Gladstone
                    </cite>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent inline-block animate-fade-in-up">
                        Find Your
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent inline-block animate-fade-in-up-delay">
                        Legal Expert
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
                    Connect with experienced lawyers who understand your case.
                    Professional legal representation when you need it most.
                </p>

                <div className="mb-16 relative">
                    <div className="w-24 h-24 mx-auto mb-8 animate-float">
                        <div className="w-full h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                            <Scale size={40} className="text-white" />
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border border-white/20 rounded-full animate-pulse-ring"></div>
                        <div className="w-40 h-40 border border-white/10 rounded-full animate-pulse-ring-delay absolute"></div>
                        <div className="w-48 h-48 border border-white/5 rounded-full animate-pulse-ring-delay-2 absolute"></div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-4 animate-fade-in-up-delay-4">
                    <button className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-bold px-12 py-4 rounded-2xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl mr-4 group">
                        <a href="#topLaw" className="flex">
                            <span className="group-hover:animate-pulse">
                                Book Appointment
                            </span>
                            <ArrowRight className="ml-1"/>
                        </a>
                    </button>
                    <button className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-semibold px-12 py-4 rounded-2xl text-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                        <span
                            onClick={() => navigate("/about")}
                            className="relative z-10"
                        >
                            Learn More
                        </span>
                        <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </button>
                </div>
            </div>

            {/* Centered Scroll Down */}
            <div className="absolute bottom-40 w-full flex justify-center text-white/60 animate-bounce-slow">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm animate-fade-in-up-delay-5">
                        Scroll Down
                    </span>
                    <ChevronRight
                        className="rotate-90 animate-pulse"
                        size={20}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
