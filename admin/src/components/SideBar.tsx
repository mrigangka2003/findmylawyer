import { LayoutDashboard, Calendar, UserPlus, Users } from "lucide-react";

const SideBar = () => {
    return (
        <aside className="h-screen w-64 bg-zinc-900 text-white flex flex-col shadow-lg">
            {/* Logo / Title */}
            <div className="px-6 py-4 border-b border-zinc-700">
                <h1 className="text-2xl font-bold tracking-wide">FindMyLawyer</h1>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </a>

                <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
                >
                    <Calendar size={20} />
                    <span>Appointments</span>
                </a>

                <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
                >
                    <UserPlus size={20} />
                    <span>Add Lawyer</span>
                </a>

                <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
                >
                    <Users size={20} />
                    <span>Lawyer List</span>
                </a>
            </nav>
        </aside>
    );
};

export default SideBar;
