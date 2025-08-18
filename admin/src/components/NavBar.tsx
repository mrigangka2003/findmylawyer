import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAdminStore } from "../store/adminStore";

function NavBar() {
    const { adminToken, clearAdminToken } = useAdminStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-zinc-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold tracking-wide">FindMyLawyer</h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <p className="text-gray-300 text-sm">
                            {adminToken ? "Admin" : "Lawyer"}
                        </p>
                        {adminToken ? (
                            <button
                                onClick={clearAdminToken}
                                className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-zinc-800">
                    <div className="px-4 pt-2 pb-3 space-y-2">
                        <p className="text-gray-300 text-sm">
                            {adminToken ? "Admin" : "Lawyer"}
                        </p>
                        {adminToken ? (
                            <button
                                onClick={() => {
                                    clearAdminToken();
                                    setIsOpen(false);
                                }}
                                className="w-full bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                className="w-full bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
