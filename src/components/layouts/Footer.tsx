import { useTheme } from "@/hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`
      py-6 border-t
      ${theme === "dark" 
        ? "bg-[#020817] border-gray-800 text-gray-300" 
        : "bg-white border-gray-200 text-gray-600"
      }
    `}>
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} The Bookery. All rights reserved.
        </p>
        <p className="text-xs mt-2 opacity-80">
          Made with ❤️ for book lovers
        </p>
      </div>
    </footer>
  );
};

export default Footer;