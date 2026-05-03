import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, User, Sparkles } from 'lucide-react';

type MenuItem = {
    label: string;
    path: string;
};

import { useAuthStore } from '../store/useAuthStore';

const NavBar = () => {
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
    const { isAuthenticated, user, logout } = useAuthStore();

    const navigate = useNavigate();

    const navItems: MenuItem[] = [
        { label: 'Home', path: '/' },
        { label: 'Lawyers', path: '/lawyers' },
        { label: 'Contact', path: '/contact' },
        { label: 'About', path: '/about' },
    ];

    const userMenuItems: MenuItem[] = [
        { label: 'My Profile', path: '/my-profile' },
    ];

    if (user?.role === 'admin') {
        userMenuItems.push({ label: 'Dashboard', path: '/admin/dashboard' });
    } else if (user?.role === 'lawyer') {
        userMenuItems.push({ label: 'My Dashboard', path: '/lawyer/dashboard' });
    } else {
        userMenuItems.push({ label: 'My Appointments', path: '/user/dashboard' });
    }

    return (
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
            {/* Ambient glow line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3.5">

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-xl font-bold text-white tracking-wider cursor-pointer group"
                >
                    <div className="relative">
                        <Sparkles size={20} className="text-white group-hover:text-gray-300 transition-colors duration-300" />
                        <div className="absolute inset-0 blur-sm bg-white/20 rounded-full" />
                    </div>
                    <span className="text-white tracking-widest">
                        FINDMYLAWYER
                    </span>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-1.5 bg-white/[0.03] rounded-2xl px-2 py-1.5 border border-white/[0.06]">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-2 rounded-xl text-white text-sm font-semibold bg-white/10 border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-300'
                                        : 'relative px-4 py-2 rounded-xl text-gray-400 hover:text-white text-sm font-medium hover:bg-white/[0.04] transition-all duration-300'
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
                            <div className="flex items-center gap-2.5 text-white bg-white/[0.03] rounded-2xl pl-1.5 pr-3 py-1.5 border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
                                <div className="w-8 h-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                                    <User size={15} className="text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{user?.name || 'Account'}</span>
                                <ChevronDown
                                    size={14}
                                    className="text-gray-500 group-hover:text-white transition-all duration-300 group-hover:rotate-180"
                                />
                            </div>

                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-3 w-56 bg-[#050505]/95 backdrop-blur-xl border border-white/[0.05] rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right overflow-hidden">
                                <div className="py-2">
                                    {userMenuItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white transition-all duration-200"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                            {item.label}
                                        </Link>
                                    ))}

                                    <div className="h-px bg-white/[0.06] mx-3 my-2"></div>

                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate('/');
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-400/80 hover:bg-red-500/5 hover:text-red-400 transition-all duration-200 flex items-center gap-3"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                        >
                            <span>Login</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-shadow" />
                        </button>
                    )}

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        {showUserMenu ? (
                            <X
                                className="w-6 h-6 text-white cursor-pointer hover:text-cyan-400 transition-colors"
                                onClick={() => setShowUserMenu(false)}
                            />
                        ) : (
                            <Menu
                                className="w-6 h-6 text-white cursor-pointer hover:text-cyan-400 transition-colors"
                                onClick={() => setShowUserMenu(true)}
                            />
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {showUserMenu && (
                    <div className="fixed inset-0 top-[65px] bg-[#050505]/98 backdrop-blur-xl z-50 flex flex-col p-6 md:hidden border-t border-white/[0.05]">
                        {/* Mobile ambient glow */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="flex flex-col gap-2 mt-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'flex items-center gap-3 px-5 py-4 rounded-2xl text-white text-lg font-bold bg-white/5 border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]'
                                            : 'flex items-center gap-3 px-5 py-4 rounded-2xl text-gray-400 text-lg hover:text-white hover:bg-white/[0.02] transition-all duration-300'
                                    }
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <span className="w-2 h-2 rounded-full bg-cyan-500/50" />
                                    {item.label}
                                </NavLink>
                            ))}

                            {!isAuthenticated && (
                                <button
                                    className="mt-6 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-lg font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        navigate('/login');
                                    }}
                                >
                                    <span>Login</span>
                                    <Sparkles size={18} className="text-white" />
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