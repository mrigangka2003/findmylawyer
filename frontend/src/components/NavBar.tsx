import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

type MenuItem = {
  label: string;
  path: string;
};

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const navigate = useNavigate();

  const navItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "Lawyers", path: "/lawyers" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  const userMenuItems: MenuItem[] = [
    { label: "My Profile", path: "/my-profile" },
    { label: "My Appointments", path: "/my-appointments" },
  ];

  return (
    <header className="relative z-40">
      {/* Deep black background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
      
      <nav className="relative flex items-center justify-between p-6 backdrop-blur-xl bg-black/50 border-b border-white/10">
        {/* Logo - Professional white gradient */}
        <div className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-wide">
          FINDMYLAWYER
        </div>

        {/* Navigation Items - Crisp white glass effect */}
        <ul className="hidden md:flex gap-8 bg-white/5 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl shadow-2xl shadow-black/30">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-white before:rounded-full pb-1 transition-all duration-300 tracking-wide"
                    : "text-white/80 hover:text-white transition-all duration-300 hover:scale-105 font-medium tracking-wide"
                }
              >
                {item.label.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div>
              <div className="flex items-center gap-3 cursor-pointer group relative">
                {/* Professional avatar with white accent */}
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-800 to-black flex items-center justify-center border border-white/10">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                </div>
                <ChevronDown className="text-white/80 group-hover:text-white transition-all duration-300 group-hover:rotate-180" size={18} />
                
                {/* Dropdown Menu - Professional glass panel */}
                <div className="absolute top-0 right-0 pt-16 text-base font-medium z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-2">
                  <div className="min-w-56 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white shadow-2xl shadow-black/50">
                    {userMenuItems.map((item) => (
                      <div key={item.path} className="mb-3 last:mb-0">
                        <Link 
                          className="block w-full text-left hover:text-gray-300 cursor-pointer transition-all duration-300 hover:translate-x-2 py-3 px-4 rounded-xl hover:bg-white/10 font-medium tracking-wide border border-transparent hover:border-white/20" 
                          to={item.path}
                        >
                          {item.label.toUpperCase()}
                        </Link>
                      </div>
                    ))}
                    <hr className="border-white/20 my-4" />
                    <div 
                      className="py-3 px-4 rounded-xl hover:bg-red-900/30 hover:text-red-200 cursor-pointer transition-all duration-300 hover:translate-x-2 font-medium tracking-wide border border-transparent hover:border-red-500/30"
                      onClick={() => {
                        setIsAuthenticated(false);
                        navigate('/');
                      }}
                    >
                      LOGOUT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="relative px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 hover:bg-white/20"
              onClick={() => navigate("/login")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 tracking-wide">SIGNUP/LOGIN</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;