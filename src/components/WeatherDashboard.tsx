import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Search, MapPin, Cloud, CloudRain, 
  Sun, Wind, Droplet, Compass, ThermometerSun 
} from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";
import { HourlyForecast } from "./HourlyForecast";
import { DailyForecast } from "./DailyForecast";
import { WeatherDetails } from "./WeatherDetails";

interface WeatherDashboardProps {
  weatherData: any;
  onBackToSearch: () => void;
  loading: boolean;
}

export const WeatherDashboard = ({ 
  weatherData, 
  onBackToSearch, 
  loading 
}: WeatherDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle new search - this will be replaced with actual API call
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
    }
  };
  
  if (!weatherData) return null;
  
  // Check if there's any precipitation in the next hour
  const hasPrecipitation = weatherData.hourly.some((hour: any) => hour.precipitation > 0);

  return (
    <div className="container mx-auto px-4 pt-6 animate-fade-in">
      {/* Header and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Button 
          variant="ghost" 
          onClick={onBackToSearch} 
          className="self-start"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>
        
        <form 
          onSubmit={handleSearch} 
          className="glass-card p-1 flex items-center w-full max-w-md"
        >
          <MapPin className="ml-2 text-blue-500" size={18} />
          <Input
            type="text"
            placeholder="Search another location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none focus-visible:ring-0 bg-transparent"
            disabled={loading}
          />
          <Button 
            type="submit" 
            variant="ghost"
            className="p-2" 
            disabled={loading || !searchTerm.trim()}
          >
            <Search size={18} className="text-blue-500" />
          </Button>
        </form>
      </div>
      
      {/* Current Weather */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Main Current Weather */}
        <Card className="glass-card col-span-1 md:col-span-2 p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-500">
                {formatDateTime(weatherData.current.date)}
              </h2>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MapPin size={20} className="text-blue-500" /> 
                {weatherData.location}
              </h1>
            </div>
            
            <div className="text-right mt-4 md:mt-0">
              <div className="flex items-center justify-end">
                <WeatherIcon 
                  iconName={weatherData.current.icon} 
                  size={48} 
                  className="text-blue-500 animate-float" 
                />
                <div className="text-6xl font-bold ml-2">
                  {weatherData.current.temp}°<span className="text-lg align-top">C</span>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                Feels like {weatherData.current.feelsLike}°C
              </p>
            </div>
          </div>
          
          <p className="text-lg mt-4 text-gray-600">
            {weatherData.current.description}
          </p>
          
          {/* Weather Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-2 animate-fade-in delay-100">
              <Wind className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Wind</p>
                <p className="font-medium">{weatherData.current.windSpeed} m/s</p>
              </div>
            </div>
            <div className="flex items-center gap-2 animate-fade-in delay-200">
              <Droplet className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-medium">{weatherData.current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 animate-fade-in delay-300">
              <Compass className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Pressure</p>
                <p className="font-medium">{weatherData.current.pressure} hPa</p>
              </div>
            </div>
            <div className="flex items-center gap-2 animate-fade-in delay-400">
              <ThermometerSun className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Dew Point</p>
                <p className="font-medium">{weatherData.current.dewPoint}°C</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Precipitation Card */}
        <Card className="glass-card p-6 animate-fade-in delay-200">
          <h2 className="text-xl font-semibold mb-4">Precipitation</h2>
          <div className="relative h-40 my-4 border-b border-gray-200">
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end">
              <div className="text-center text-xs text-gray-500 w-1/6">Now</div>
              <div className="text-center text-xs text-gray-500 w-1/6">15min</div>
              <div className="text-center text-xs text-gray-500 w-1/6">30min</div>
              <div className="text-center text-xs text-gray-500 w-1/6">45min</div>
              <div className="text-center text-xs text-gray-500 w-1/6">60min</div>
              <div className="text-center text-xs text-gray-500 w-1/6">75min</div>
            </div>
            
            {hasPrecipitation ? (
              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-24">
                {weatherData.hourly.map((hour: any, index: number) => (
                  <div
                    key={index}
                    className="w-1/6 h-full flex items-end justify-center"
                  >
                    <div
                      className="bg-blue-200 rounded-t"
                      style={{
                        height: `${Math.max(1, hour.precipitation)}px`,
                        width: "50%",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-gray-500">No precipitation within an hour</p>
              </div>
            )}
          </div>
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>{hasPrecipitation ? `${weatherData.hourly[0].precipitation}%` : "0mm/h"}</p>
          </div>
        </Card>
      </div>
      
      {/* Forecast Tabs */}
      <Tabs defaultValue="hourly" className="animate-fade-in delay-300">
        <TabsList className="glass-card mb-4">
          <TabsTrigger value="hourly">Hourly forecast</TabsTrigger>
          <TabsTrigger value="8day">6-day forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hourly">
          <HourlyForecast forecast={weatherData.hourly} />
        </TabsContent>
        
        <TabsContent value="8day">
          <DailyForecast forecast={weatherData.daily} />
        </TabsContent>
      </Tabs>
      
      {/* Weather Details */}
      <WeatherDetails current={weatherData.current} className="mt-6 animate-fade-in delay-400" />
    </div>
  );
};