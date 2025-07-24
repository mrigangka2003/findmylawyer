import { Scale, Shield, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-2 text-white text-sm font-medium mb-4">
                            <Scale className="w-5 h-5" />
                            <span className="tracking-wider">ABOUT US</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                            findMy<span className="text-white">Lawyer</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Your trusted partner in navigating complex legal
                            matters with confidence and expertise
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* About Section */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-8 bg-white rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">
                                About Us
                            </h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Welcome to{" "}
                            <strong className="text-white">findMyLawyer</strong>
                            , your trusted partner in managing your legal needs
                            conveniently and efficiently. At findMyLawyer, we
                            understand the challenges individuals and businesses
                            face when it comes to finding qualified legal
                            representation and managing their legal affairs.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            findMyLawyer is committed to excellence in legal
                            technology. We continuously strive to enhance our
                            platform, integrating the latest advancements to
                            improve user experience and deliver superior
                            service. Whether you're booking your first
                            consultation or managing ongoing legal matters,
                            findMyLawyer is here to support you every step of
                            the way.
                        </p>
                    </div>

                    {/* Image Placeholder */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                            <div className="aspect-square bg-gradient-to-br from-white/10 to-gray-400/10 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src="https://img.freepik.com/premium-photo/legal-teamwork-with-diverse-group-lawyers-col_198067-200974.jpg"
                                    alt="Lawyer Team"
                                    className="object-cover w-full h-full rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="text-center mb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-white rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">
                                Our Vision
                            </h2>
                        </div>
                        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Our vision at{" "}
                                <strong className="text-white">
                                    findMyLawyer
                                </strong>{" "}
                                is to create a seamless legal experience for
                                every client. We aim to bridge the gap between
                                clients and legal professionals, making it
                                easier for you to access the expertise you need,
                                when you need it most.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-white rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">
                                Why Choose Us
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Expertise */}
                        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-white/50 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    Expertise
                                </h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                Access to highly qualified legal professionals
                                with proven track records in their respective
                                fields of law.
                            </p>
                        </div>

                        {/* Convenience */}
                        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-white/50 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    Convenience
                                </h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                Streamlined appointment scheduling and case
                                management that fits into your busy lifestyle
                                and urgent legal needs.
                            </p>
                        </div>

                        {/* Trust */}
                        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-blue-400/20 p-3 rounded-xl">
                                    <Shield className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    Trust
                                </h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                Personalized legal guidance and confidential
                                consultations to help you make informed
                                decisions about your legal matters.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-4 gap-8 mb-20">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-2">
                            500+
                        </div>
                        <div className="text-gray-400">Qualified Lawyers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-2">
                            10K+
                        </div>
                        <div className="text-gray-400">Cases Resolved</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-2">
                            98%
                        </div>
                        <div className="text-gray-400">Client Satisfaction</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-2">
                            15+
                        </div>
                        <div className="text-gray-400">Years Experience</div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl p-12 border border-white/30">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h3>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Connect with our experienced legal professionals today
                        and take the first step towards resolving your legal
                        matters with confidence.
                    </p>
                    <button onClick={()=>{navigate('/lawyers'); scrollTo(0,0)}} className="bg-white text-black font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10 tracking-tight">
                        Book a Consultation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
