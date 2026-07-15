import { useNavigate, useLocation } from "react-router-dom";
import { FiFolder, FiHome, FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";

const SidebarItem = ({ icon: Icon, label, path, active }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? "bg-[#E0F2FE] text-[#0369A9] font-semibold"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? "text-[#0369A9]" : "text-slate-500"}`} />
      <span className="text-sm">{label}</span>
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-64 h-full bg-[#f8fafc] border-r border-slate-200 flex flex-col flex-shrink-0 hidden md:flex">
      {/* Logo */}
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-2 px-6 py-5 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img src="/logo.png" alt="logo" className="h-7 w-auto" />
        <h1 className="text-[#0369A9] text-xl font-bold tracking-tight">
          FlowTrack
        </h1>
      </div>

      <div className="px-3 py-2 flex flex-col gap-1 flex-1">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">
          Main Menu
        </div>
        
        <SidebarItem
          icon={FiHome}
          label="Dashboard"
          path="/"
          active={location.pathname === "/"}
        />
        
        {user && (
          <>
            <SidebarItem
              icon={FiFolder}
              label="Projects"
              path="/manage-projects"
              active={location.pathname.includes("/manage-projects") || location.pathname.includes("/project") || location.pathname.includes("/tasks")}
            />
            <SidebarItem
              icon={FiUsers}
              label="Team"
              path="/manage-projects" 
              active={false}
            />
          </>
        )}
      
      </div>

      <div className="p-4 border-t border-slate-200">
        {user ? (
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0369A9] to-[#0284C7] flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-slate-800 truncate">{user?.name}</span>
              <span className="text-xs text-slate-500 truncate capitalize">{user?.role}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-2">
            <button 
              onClick={() => navigate("/login")}
              className="w-full text-center text-sm py-2 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-[#0284C7] transition-all duration-300"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate("/register")}
              className="w-full text-center text-sm py-2 rounded-xl text-[#0369A9] font-semibold hover:bg-blue-50 transition-all duration-300"
            >
              Start Free Trial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
