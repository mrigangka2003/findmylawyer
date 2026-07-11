import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, User, Scale } from 'lucide-react';

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
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080808]/85 px-4 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between py-3.5">

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="group flex cursor-pointer items-center gap-2.5 text-lg font-bold tracking-[0.08em] text-white"
                >
                    <div className="flex h-8 w-8 items-center justify-center border border-white/30 bg-white text-black transition group-hover:rotate-6">
                        <Scale size={16} />
                    </div>
                    <span>
                        FINDMYLAWYER
                    </span>
                </div>
                <div className='flex items-center gap-4'>

                
                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-3 py-2 text-sm font-semibold text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-white'
                                        : 'relative px-3 py-2 text-sm font-medium text-zinc-500 transition hover:text-white'
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
                            <div className="flex items-center gap-2.5 border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-3 text-white transition hover:border-white/30">
                                <div className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/5">
                                    <User size={15} className="text-white" />
                                </div>
                                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{user?.name || 'Account'}</span>
                                <ChevronDown
                                    size={14}
                                    className="text-zinc-500 transition-all duration-300 group-hover:rotate-180 group-hover:text-white"
                                />
                            </div>

                            {/* Dropdown */}
                            <div className="invisible absolute right-0 top-full mt-3 w-56 origin-top-right overflow-hidden border border-white/15 bg-[#0a0a0a] opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                                <div className="py-2">
                                    {userMenuItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-white hover:text-black"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                            {item.label}
                                        </Link>
                                    ))}

                                    <div className="h-px bg-white/[0.08] mx-3 my-2"></div>

                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate('/');
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-zinc-400 transition hover:bg-white hover:text-black"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="group hidden items-center gap-2 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 md:flex"
                        >
                            <span>Login</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-black transition-transform group-hover:scale-125" />
                        </button>
                    )}

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        {showUserMenu ? (
                            <X
                                className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors"
                                onClick={() => setShowUserMenu(false)}
                            />
                        ) : (
                            <Menu
                                className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors"
                                onClick={() => setShowUserMenu(true)}
                            />
                        )}
                    </div>
                </div>
                </div>

                {/* Mobile Menu */}
                {showUserMenu && (
                    <div className="fixed inset-0 top-[61px] z-50 flex flex-col border-t border-white/10 bg-[#080808] p-6 md:hidden">
                        <div className="flex flex-col gap-2 mt-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'flex items-center gap-3 border-b border-white py-4 text-lg font-bold text-white'
                                            : 'flex items-center gap-3 border-b border-white/10 py-4 text-lg text-zinc-400 transition hover:text-white'
                                    }
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <span className="w-2 h-2 rounded-full bg-white/40" />
                                    {item.label}
                                </NavLink>
                            ))}

                            {!isAuthenticated && (
                                <button
                                    className="mt-6 flex items-center justify-center gap-2 bg-white px-6 py-4 text-lg font-semibold text-black transition hover:bg-zinc-200"
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        navigate('/login');
                                    }}
                                >
                                    <span>Login</span>
                                    <Scale size={18} />
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
