import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, User } from 'lucide-react';

type MenuItem = {
    label: string;
    path: string;
};

const NavBar = () => {
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const navigate = useNavigate();

    const navItems: MenuItem[] = [
        { label: 'Home', path: '/' },
        { label: 'Lawyers', path: '/lawyers' },
        { label: 'Contact', path: '/contact' },
        { label: 'About', path: '/about' },
    ];

    const userMenuItems: MenuItem[] = [
        { label: 'My Profile', path: '/my-profile' },
        { label: 'My Appointments', path: '/my-appointments' },
    ];

    return (
        <header className="sticky top-0 z-40 bg-zinc-950/70 backdrop-blur-lg border-b border-white/10">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
                
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="text-xl font-display font-bold text-white tracking-wider cursor-pointer"
                >
                    FINDMYLAWYER.
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-7">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-white font-semibold border-b-2 border-white pb-1 transition-all'
                                        : 'text-gray-400 hover:text-white transition-colors font-medium'
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right Section */}
                <div className="flex items-center gap-3">

                    {/* Authenticated User */}
                    {isAuthenticated ? (
                        <div className="relative group cursor-pointer">
                            <div className="flex items-center gap-2 text-white">
                                <div className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                                    <User size={17} className="text-gray-300" />
                                </div>

                                <ChevronDown
                                    size={15}
                                    className="text-gray-400 group-hover:text-white transition-colors"
                                />
                            </div>

                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-3 w-48 bg-zinc-950/80 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
                                <div className="py-2">
                                    {userMenuItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    <div className="h-px bg-white/10 my-2"></div>

                                    <button
                                        onClick={() => {
                                            setIsAuthenticated(false);
                                            navigate('/');
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="hidden md:block px-5 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-white font-semibold hover:bg-white/20 transition-all"
                        >
                            Login
                        </button>
                    )}

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        {showUserMenu ? (
                            <X
                                className="w-6 h-6 text-white cursor-pointer"
                                onClick={() => setShowUserMenu(false)}
                            />
                        ) : (
                            <Menu
                                className="w-6 h-6 text-white cursor-pointer"
                                onClick={() => setShowUserMenu(true)}
                            />
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {showUserMenu && (
                    <div className="fixed inset-0 top-[65px] bg-zinc-950/95 backdrop-blur-lg z-50 flex flex-col p-6 md:hidden border-t border-white/10">
                        <div className="flex flex-col gap-6">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white text-xl font-bold'
                                            : 'text-gray-400 text-xl hover:text-white transition-colors'
                                    }
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            {!isAuthenticated && (
                                <button
                                    className="mt-4 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-lg font-semibold"
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        navigate('/login');
                                    }}
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default NavBar;