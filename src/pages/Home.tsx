import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center`}
    >
      <div className="max-w-2xl space-y-6">
        <h1 className={`text-4xl md:text-5xl font-bold tracking-tight 
          ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Discover Literary Treasures
        </h1>
        
        <p className={`text-lg md:text-xl leading-relaxed 
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
        >
          Explore our carefully curated collection of timeless classics, contemporary masterpieces, 
          and undiscovered literary gems. Your next favorite read awaits.
        </p>
        
        <div className="pt-4">
          <Button 
            size="lg"
            className="px-8 py-6 text-lg"
            onClick={() => navigate("/books")}
          >
            Begin Your Journey
          </Button>
        </div>
      </div>
      
      <div className={`absolute bottom-8 text-sm 
        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
      >
        <p>Your personal gateway to the world of books</p>
      </div>
    </div>
  );
};

export default Home;