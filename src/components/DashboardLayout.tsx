import { useState } from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#171723] flex overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <main className="min-h-screen w-full text-white">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
