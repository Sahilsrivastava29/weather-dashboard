import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Cloud, Sun, CloudRain, Wind } from "lucide-react";

interface LandingSearchProps {
  onSearch: (location: string) => void;
  loading: boolean;
}

export const LandingSearch = ({ onSearch, loading }: LandingSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* Animated Weather Icons */}
      <div className="relative w-full max-w-lg h-32 mb-8">
        <div className="absolute top-0 left-1/4 animate-float delay-100">
          <Sun size={64} className="text-yellow-500 drop-shadow-md" />
        </div>
        <div className="absolute top-10 right-1/4 animate-float delay-300">
          <Cloud size={48} className="text-blue-400 drop-shadow-md" />
        </div>
        <div className="absolute bottom-0 left-1/3 animate-float delay-500">
          <CloudRain size={40} className="text-blue-500 drop-shadow-md" />
        </div>
        <div className="absolute bottom-4 right-1/3 animate-float delay-200">
          <Wind size={36} className="text-blue-300 drop-shadow-md" />
        </div>
      </div>
      
      {/* Title and Description */}
      <h1 className="text-5xl font-bold mb-4 text-blue-600 animate-fade-in">
        CloudPulse
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg animate-fade-in delay-200">
        Get real-time weather updates for any location with beautiful visualizations and detailed forecasts
      </p>
      
      {/* Search Form */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md animate-fade-in delay-300"
      >
        <div className="glass-card p-1 flex items-center">
          <MapPin className="ml-3 text-blue-500" size={20} />
          <Input
            type="text"
            placeholder="Enter city name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none focus-visible:ring-0 bg-transparent text-base"
            disabled={loading}
          />
          <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? "Loading..." : <Search size={18} />}
          </Button>
        </div>
      </form>
      
      {/* Popular Cities */}
      <div className="mt-12 animate-fade-in delay-400">
        <p className="text-sm text-gray-500 mb-3">Popular locations</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["New York", "London", "Tokyo", "Sydney", "Paris"].map((city) => (
            <Button
              key={city}
              variant="outline"
              className="glass-card hover:bg-blue-100/50"
              onClick={() => onSearch(city)}
              disabled={loading}
            >
              {city}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Footer Info */}
      <p className="text-xs text-gray-400 mt-16 animate-fade-in delay-500">
        Powered by OpenWeatherMap API
      </p>
    </div>
  );
};