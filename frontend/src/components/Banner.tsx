const Banner = () => {
    return (
        <div
            className="w-full h-[60vh]  flex items-center justify-center px-4"
        >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center border border-white/20">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Book Appointment with 150+ Trusted Lawyers
                </h1>
                <p className="text-zinc-200 text-sm sm:text-base">
                    Legal advice, simplified. Find the right expert for your
                    needs — fast, reliable, and trusted.
                </p>
                <button className="mt-6 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition backdrop-blur-sm">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Banner;