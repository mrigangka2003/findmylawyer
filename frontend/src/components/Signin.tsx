export default function SignIn() {
    return (
        <div className="w-full">
            <form className="space-y-5">

                <div>
                    <label className="text-sm text-zinc-300 mb-2 block">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    />
                </div>

                <div>
                    <label className="text-sm text-zinc-300 mb-2 block">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="text-sm text-zinc-400 hover:text-white transition"
                    >
                        Forgot Password?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-white text-black py-3 font-semibold hover:scale-[1.01] transition-all"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}