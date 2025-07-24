import React from "react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageSquare,
    Calendar,
    // ArrowUpRight,
    Building2,
    // Shield,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContactInfo {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
}

// interface QuickAction {
//     title: string;
//     description: string;
//     buttonText: string;
//     icon: React.ElementType;
// }

const Contact: React.FC = () => {
    const navigate = useNavigate();

    const contactInfo: ContactInfo[] = [
        {
            icon: Phone,
            title: "Phone",
            subtitle: "Call us directly",
            primary: "+91 xxxxxxxxxx",
            secondary: "Available 24/7 for emergencies",
        },
        {
            icon: Mail,
            title: "Email",
            subtitle: "Send us an email",
            primary: "info@findmylawyer.com",
            secondary: "Response within 2 hours",
        },
        {
            icon: MapPin,
            title: "Head Office",
            subtitle: "Visit our main office",
            primary: "Ramnagar Road No 5",
            secondary: "Barjala TRTC",
        },
        {
            icon: Clock,
            title: "Business Hours",
            subtitle: "When we're available",
            primary: "Monday - Friday: 8:00 AM - 8:00 PM",
            secondary: "Weekend consultations available",
        },
    ];

    // const quickActions: QuickAction[] = [
    //     {
    //         title: "Emergency Legal Help",
    //         description:
    //             "Need immediate legal assistance? Our emergency hotline is available 24/7 for urgent matters.",
    //         buttonText: "Call Emergency Line",
    //         icon: Phone,
    //     },
    //     {
    //         title: "Schedule Consultation",
    //         description:
    //             "Book a comprehensive legal consultation with one of our experienced attorneys.",
    //         buttonText: "Book Now",
    //         icon: Calendar,
    //     },
    //     {
    //         title: "Case Evaluation",
    //         description:
    //             "Get a free preliminary assessment of your legal situation from our expert team.",
    //         buttonText: "Start Evaluation",
    //         icon: Shield,
    //     },
    // ];

    const officeLocations = [
        {
            city: "Greater Noida",
            address: "Sector 42",
            phone: "+91 381 234-5678",
            isMain: false,
        },
        {
            city: "Agartala",
            address: "Ramnagar Road no 5",
            phone: "+91 70054399xx",
            isMain: true,
        },
        {
            city: "Hyderabad",
            address: "sector 12",
            phone: "+91 325 345-6789",
            isMain: false,
        },
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
                    <div className="text-center space-y-8">
                        <div className="flex items-center justify-center gap-3 text-white text-sm font-medium mb-6">
                            <MessageSquare className="w-5 h-5" />
                            <span className="tracking-widest uppercase">
                                Contact Us
                            </span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                            Let's Connect
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Expert legal guidance is just a conversation away.
                            Reach out to discuss your legal needs with our
                            experienced team.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Contact Information Grid */}
                <section className="mb-20">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-1 h-10 bg-white rounded-full"></div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white">
                                Get In Touch
                            </h2>
                        </div>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Multiple ways to reach our legal experts. Choose the
                            method that works best for you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-white/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                                >
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors duration-300">
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-3">
                                                {info.subtitle}
                                            </p>
                                            <p className="text-white font-semibold text-sm mb-1">
                                                {info.primary}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {info.secondary}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Quick Actions */}
                {/* <section className="mb-20">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-1 h-10 bg-white rounded-full"></div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white">
                                How We Can Help
                            </h2>
                        </div>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Choose the service that best matches your immediate
                            legal needs.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {quickActions.map((action, index) => {
                            const IconComponent = action.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-10 border border-gray-700 hover:border-white/50 transition-all duration-500"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-white/10 p-3 rounded-xl group-hover:bg-white/20 transition-colors duration-300 flex-shrink-0">
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {action.title}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-white text-black font-semibold py-4 rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-white/5 flex items-center justify-center gap-2 group">
                                        {action.buttonText}
                                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section> */}

                {/* Office Locations */}
                <section className="mb-20">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-1 h-10 bg-white rounded-full"></div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white">
                                Our Locations
                            </h2>
                        </div>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Find the office nearest to you for in-person
                            consultations and meetings.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {officeLocations.map((location, index) => (
                            <div
                                key={index}
                                className={`relative group bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border transition-all duration-500 hover:scale-105 cursor-pointer ${
                                    location.isMain
                                        ? "border-white/70 shadow-lg shadow-white/10"
                                        : "border-gray-700 hover:border-white/50"
                                }`}
                            >
                                {location.isMain && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <div className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold">
                                            MAIN OFFICE
                                        </div>
                                    </div>
                                )}

                                <div className="text-center space-y-4">
                                    <div className="bg-white/10 p-4 rounded-2xl inline-block group-hover:bg-white/20 transition-colors duration-300">
                                        <Building2 className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {location.city}
                                        </h3>
                                        <p className="text-gray-300 mb-3">
                                            {location.address}
                                        </p>
                                        <p className="text-white font-semibold">
                                            {location.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Map Section */}
                <section>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-1 h-10 bg-white rounded-full"></div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white">
                                Visit Our Office
                            </h2>
                        </div>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Located in the heart of the legal district, easily
                            accessible by public transport.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-3xl p-10 border border-gray-700 max-w-4xl mx-auto">
                        <div className="rounded-2xl border border-gray-600/50 p-8 bg-gradient-to-br from-white/5 to-gray-400/5">
                            <div className="text-center space-y-6">
                                <div className="bg-white/10 p-6 rounded-2xl inline-block mx-auto">
                                    <MapPin className="w-12 h-12 text-white" />
                                </div>

                                <h3 className="text-3xl font-bold text-white">
                                    Interactive Map
                                </h3>

                                <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-600">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d681.2601759759527!2d91.26969971337361!3d23.839736238593208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1753385702714!5m2!1sen!2sin"
                                        className="w-full h-full"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        allowFullScreen
                                    />
                                </div>

                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=Ramnagar+Road+No+5,+Agartala,+Tripura"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 hover:scale-105 mt-4"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="mt-20">
                    <div className="text-center bg-gradient-to-r from-white/10 to-gray-400/10 rounded-3xl p-16 border border-white/20">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white/10 p-4 rounded-2xl inline-block mb-6">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                                Ready to Discuss Your Legal Needs?
                            </h3>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                Our experienced legal team is here to provide
                                you with the guidance and representation you
                                deserve. Don't wait – take the first step
                                towards resolving your legal matters today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="tel:+9198888888870"
                                    className="bg-white text-black font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10 flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Now
                                </a>
                                <button
                                    onClick={() => {navigate("/lawyers"); scrollTo(-1,-1)}}
                                    className="bg-transparent text-white font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Schedule Meeting
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
