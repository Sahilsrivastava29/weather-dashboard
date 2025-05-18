import { Card } from "@/components/ui/card";

interface WeatherDetailsProps {
  current: {
    humidity: number;
    windSpeed: number;
    pressure: number;
    dewPoint: number;
    visibility: number;
    temp?: number; // Optional, for dynamic weather tip
  };
  className?: string;
}

export const WeatherDetails = ({ current, className = "" }: WeatherDetailsProps) => {
  // Generate dynamic weather tip
  const getWeatherTip = () => {
    const temp = current.temp || 0;
    const humidity = current.humidity;

    if (temp > 35) {
      return "It's quite hot today. Stay hydrated and avoid direct sunlight during peak hours.";
    } else if (temp < 10) {
      return "It's quite cold today. Dress warmly and protect against wind chill.";
    } else if (humidity > 70) {
      return "High humidity today. It might feel sticky, so keep cool and hydrated.";
    } else if (humidity < 20) {
      return "Low humidity today. Use moisturizer to prevent dry skin.";
    } else {
      return "Weather is moderate today. Enjoy your day, but always stay prepared for changes.";
    }
  };

  return (
    <Card className={`glass-card p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Weather Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500">Humidity</h3>
            <div className="mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${current.humidity}%` }}
                ></div>
              </div>
              <p className="text-right text-sm mt-1">{current.humidity}%</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-500">Visibility</h3>
            <p className="text-lg font-medium">{current.visibility} km</p>
            <p className="text-xs text-gray-500">
              {current.visibility >= 10 ? "Excellent visibility" : "Limited visibility"}
            </p>
          </div>
        </div>
        
        {/* Middle Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500">Wind Speed</h3>
            <p className="text-lg font-medium">{current.windSpeed} m/s</p>
            <p className="text-xs text-gray-500">
              {current.windSpeed > 5 ? "Moderate breeze" : "Light breeze"}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-500">Pressure</h3>
            <p className="text-lg font-medium">{current.pressure} hPa</p>
            <p className="text-xs text-gray-500">
              {current.pressure >= 1000 ? "Standard pressure" : "Low pressure"}
            </p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500">Dew Point</h3>
            <p className="text-lg font-medium">{current.dewPoint}°C</p>
            <p className="text-xs text-gray-500">
              {current.dewPoint < 10 ? "Dry air" : "Moist air"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Dynamic Weather Tip */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700">
          <span className="font-medium">Weather tip:</span> {getWeatherTip()}
        </p>
      </div>
    </Card>
  );
};