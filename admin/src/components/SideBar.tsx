import { LayoutDashboard, Calendar, UserPlus, Users } from "lucide-react";
import { useAdminStore } from "../store/adminStore";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const { adminToken } = useAdminStore();

    const sidebarList = [
        {
            path: "/admin-dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            path: "/all-appointments",
            label: "Appointments",
            icon: <Calendar className="w-5 h-5" />,
        },
        {
            path: "/add-lawyers",
            label: "Add Lawyer",
            icon: <UserPlus className="w-5 h-5" />,
        },
        {
            path: "/lawyers-list",
            label: "Lawyers",
            icon: <Users className="w-5 h-5" />,
        },
    ];

    return (
        <div className="h-screen w-64 bg-neutral-900 text-white shadow-xl min-h-screen">
            {adminToken && (
                <ul className="flex flex-col gap-2 p-4">
                    {sidebarList.map((item, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                                        ${isActive
                                        ? "bg-neutral-800 border-l-4 border-white"
                                        : "hover:bg-neutral-800"
                                    }`
                                }
                            >
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SideBar;
