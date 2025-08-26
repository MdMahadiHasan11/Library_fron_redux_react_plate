import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={` flex flex-col items-center justify-center p-6 text-center relative overflow-hidden
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-amber-50"
      }`}
    >
      {/* Background decorative elements */}
      <div
        className={`absolute -left-32 -top-32 w-64 h-64 rounded-full opacity-10 
        ${theme === "dark" ? "bg-blue-400" : "bg-blue-600"}`}
      ></div>
      <div
        className={`absolute -right-24 -bottom-24 w-48 h-48 rounded-full opacity-10 
        ${theme === "dark" ? "bg-amber-400" : "bg-amber-600"}`}
      ></div>

      {/* Floating book icons */}
      <div className="absolute top-28 left-24 opacity-20 rotate-12">
        <svg
          className="w-12 h-12"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-20 opacity-20 -rotate-6">
        <svg
          className="w-10 h-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
        </svg>
      </div>

      <div className="max-w-2xl space-y-6 relative z-10">
        {/* Main heading with emphasis */}
        <div className="mb-2">
          <span
            className={`text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded-full 
            ${
              theme === "dark"
                ? "bg-blue-900/30 text-blue-300"
                : "bg-blue-200/70 text-blue-700"
            }`}
          >
            Welcome to Bookify
          </span>
        </div>

        <h1
          className={`text-5xl md:text-6xl font-bold tracking-tight mb-6
          ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
        >
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500">
            Literary Management
          </span>
        </h1>

        <p
          className={`text-lg md:text-xl leading-relaxed max-w-lg mx-auto
          ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        >
          Explore our carefully curated collection of timeless classics,
          contemporary masterpieces, and undiscovered literary gems. Your next
          favorite read awaits.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            onClick={() => navigate("/books")}
          >
            Begin Your Journey
          </Button>
          <Button
            variant={theme === "dark" ? "secondary" : "outline"}
            size="lg"
            className="px-8 py-6 text-lg transition-all duration-300"
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </div>
      </div>

      <div
        className={`absolute bottom-8 text-sm mt-12 flex items-center
        ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <p>Your personal gateway to the world of books</p>
      </div>
    </div>
  );
};

export default Home;
