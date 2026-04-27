import { useNavigate } from "react-router-dom";
import { ArrowRight, Scale, Shield, Award } from "lucide-react";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex flex-col pt-20 items-center justify-start overflow-hidden bg-black">
            {/* Background Gradients & Orbs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>
            
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-[100px] animate-pulse-ring"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-[120px] animate-pulse-ring-delay"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Text Content */}
                <div className="text-left space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/20 text-white/80 text-sm font-medium animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        Trusted by 10,000+ Clients
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-display tracking-tight text-white animate-fade-in-up-delay">
                        Expert Legal Help, <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-500">
                            When You Need It.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg animate-fade-in-up-delay-2">
                        Connect with top-rated lawyers specialized in your case. Experience premium legal representation seamlessly online.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 animate-fade-in-up-delay-3">
                        <button 
                            onClick={() => navigate("/lawyers")}
                            className="bg-white hover:bg-gray-200 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 group"
                        >
                            Find a Lawyer
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 animate-fade-in-up-delay-4">
                        <div>
                            <p className="text-3xl font-display font-bold text-white">98%</p>
                            <p className="text-sm text-gray-400">Success Rate</p>
                        </div>
                        <div>
                            <p className="text-3xl font-display font-bold text-white">500+</p>
                            <p className="text-sm text-gray-400">Expert Lawyers</p>
                        </div>
                        <div>
                            <p className="text-3xl font-display font-bold text-white">24/7</p>
                            <p className="text-sm text-gray-400">Support Available</p>
                        </div>
                    </div>
                </div>

                {/* Right Visuals - Glass Cards */}
                <div className="relative h-[600px] hidden lg:block animate-fade-in-scale">
                    {/* Main Card */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] glass-card p-6 z-20 translate-x-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <Scale className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Corporate Law</h3>
                                <p className="text-sm text-gray-400">Expert consultations</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-12 bg-white/5 rounded-lg border border-white/5 flex items-center px-4 gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-600/50"></div>
                                    <div className="space-y-1.5 flex-1">
                                        <div className="h-2 w-24 bg-white/20 rounded"></div>
                                        <div className="h-1.5 w-16 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="w-4 h-4 rounded-full border border-white/30"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-20 right-40 w-64 glass-card p-4 z-10 animate-float">
                        <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-gray-300" />
                            <div>
                                <p className="text-sm text-white font-medium">Secure Booking</p>
                                <p className="text-xs text-gray-400">End-to-end encryption</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-32 right-64 w-56 glass-card p-4 z-30 animate-float" style={{ animationDelay: '1s' }}>
                        <div className="flex items-center gap-3">
                            <Award className="w-8 h-8 text-gray-300" />
                            <div>
                                <p className="text-sm text-white font-medium">Top Rated</p>
                                <p className="text-xs text-gray-400">Verified reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
