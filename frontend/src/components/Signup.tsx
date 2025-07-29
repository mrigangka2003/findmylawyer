
export default function SignUp() {
    return (
        <div className="w-full max-w-sm space-y-8">
            <form className="space-y-6">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-md bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-md bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-500 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
