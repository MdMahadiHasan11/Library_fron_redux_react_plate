import { useTheme } from "@/hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`
      py-8 border-t
      ${
        theme === "dark"
          ? "bg-gradient-to-t from-gray-900 to-gray-800 border-gray-700 text-gray-300"
          : "bg-gradient-to-t from-blue-50 to-white border-gray-200 text-gray-600"
      }
    `}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-4">
          <div
            className={`text-xl font-bold mr-2 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Bookify
          </div>
          <span className="text-sm">Library Management System</span>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} Bookify. All rights reserved.
        </p>

        <div className="flex justify-center space-x-6 mt-4 text-xs">
          <a
            href="#"
            className={`hover:${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            } transition-colors`}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className={`hover:${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            } transition-colors`}
          >
            Terms of Service
          </a>
          <a
            href="#"
            className={`hover:${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            } transition-colors`}
          >
            Contact Us
          </a>
        </div>

        <p className="text-xs mt-4 opacity-80">
          Powered by a love for books and efficient organization
        </p>
      </div>
    </footer>
  );
};

export default Footer;
