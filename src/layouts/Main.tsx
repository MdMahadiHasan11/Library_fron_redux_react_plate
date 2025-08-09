import { useEffect, useState } from "react";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/hooks/useTheme";

const Main = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        {/* Navbar - Consistent with shadcn's dark/light variables */}
        <div
          className={`sticky top-0 z-50 w-full transition-transform duration-300 ${
            visible ? "translate-y-0" : "-translate-y-full"
          } ${
            theme === "dark"
              ? "bg-[#020817] border-b border-gray-800"
              : "bg-white border-b border-gray-200"
          }`}>
          <Navbar />
        </div>

        {/* Main Content - More subtle gradient */}
        <div
          className={`flex-1 py-16 w-full transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
              : "bg-gradient-to-br from-gray-50 via-white to-white"
          }`}>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </div>

        {/* Footer - Matches navbar colors */}
        <div
          className={
            theme === "dark"
              ? "bg-[#020817] border-t border-gray-800"
              : "bg-white border-t border-gray-200"
          }>
          <Footer />
        </div>
      </div>
      <Toaster
        position='top-center'
        toastOptions={{
          className: theme === "dark" ? "!bg-gray-800 !text-white" : "",
        }}
      />
    </>
  );
};

export default Main;
