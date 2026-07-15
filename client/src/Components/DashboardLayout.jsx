import React from "react";
import Sidebar from "./Sidebar";
import Navabar from "./Navabar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden relative">
        <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
            <Navabar isDashboard={true} />
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f0f9ff]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
