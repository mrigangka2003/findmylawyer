import {
    Mail,
    Phone,
    MapPin,
    X,
    Linkedin,
    Heart,
    ExternalLink,
} from "lucide-react";



const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
            {/* Background Animation (kept for effect, optional) */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl" />
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl" />
            </div>

            <div className="relative z-10 pt-16 pb-8 px-6 sm:px-10 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Brand Info */}
                        <div className="space-y-4 lg:col-span-2">
                            <div className="flex items-center">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                                    FindMyLawyer
                                </h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed max-w-md">
                                Your trusted platform to find experienced
                                lawyers, book appointments, and solve legal
                                issues with confidence. Built with modern
                                technology for seamless user experience.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="text-lg font-semibold mb-6 text-slate-200">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {/* {[
                                    "Home",
                                    "Services",
                                    "Find Lawyers",
                                    "About Us",
                                    "Contact",
                                ].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="flex items-center gap-2 text-slate-300"
                                        >
                                            <span>{item}</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </li>
                                ))} */}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-6 text-slate-200">
                                Get In Touch
                            </h4>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span>+91 70054 39980</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>mrigangkadatta@gmail.com</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span>Agartala, India</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Media Centered */}
                    <div className="border-t border-slate-700/50 pt-8 mb-8">
                        <div className="flex flex-col items-center gap-6">
                            <h4 className="text-lg font-semibold text-slate-200">
                                Connect With Us
                            </h4>
                            <div className="flex gap-4">
                                {[{
                                    icon: X,
                                    href: "https://x.com/mrigangkadatta",
                                    label: "Twitter"
                                }, {
                                    icon: Linkedin,
                                    href: "https://www.linkedin.com/in/mrigangka/",
                                    label: "LinkedIn"
                                }].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center"
                                    >
                                        <Icon className="w-4 h-4 text-slate-300" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Credit */}
                    <div className="border-t border-zinc-700/50 pt-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                            <div>
                                © {new Date().getFullYear()} FindMyLawyer. All rights reserved.
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Crafted with</span>
                                <Heart className="w-4 h-4 text-red-400" />
                                <span>by</span>
                                <a
                                    href="https://www.linkedin.com/in/mrigangka/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-400"
                                >
                                    <span className="font-semibold">
                                        MrigangkaDatta
                                    </span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
