import { LayoutDashboard, FileText, PlusCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout({ children }) {
  const { logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/forms",
      icon: LayoutDashboard,
    },
    {
      label: "Create Form",
      path: "/admin/forms/create",
      icon: PlusCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}

      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <h1 className=" text-xl font-bold text-indigo-600">
            Form Builder
          </h1>
        </div>

        <nav className="p-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${ isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-100" }`
                }
              >
                <Icon size={18} />

                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}

      <main className="flex-1">
        {/* Header */}

        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Admin Panel
          </h2>
        </header>

        {/* Content */}

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;
