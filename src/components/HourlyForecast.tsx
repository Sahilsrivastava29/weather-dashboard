import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { Wind } from "lucide-react";

interface HourlyForecastProps {
  forecast: {
    time: string;
    temp: number;
    conditions: string;
    wind: number;
    precipitation: number;
  }[];
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  const getTemperatureClass = (temp: number) => {
    if (temp >= 40) return "temp-high";
    if (temp >= 30) return "temp-medium";
    return "temp-low";
  };

  // Normalize temperatures for the SVG graph (map temps to 0-100 range for SVG height)
  const minTemp = Math.min(...forecast.map((hour) => hour.temp));
  const maxTemp = Math.max(...forecast.map((hour) => hour.temp));
  const tempRange = maxTemp - minTemp || 1; // Avoid division by zero
  const normalizeTemp = (temp: number) =>
    100 - ((temp - minTemp) / tempRange) * 80; // Map to SVG y-coordinates (inverted)

  // Generate SVG polyline points
  const points = forecast
    .map((hour, index) => {
      const x = (index / (forecast.length - 1)) * 800; // Distribute across 800px width
      const y = normalizeTemp(hour.temp);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="glass-card p-6">
      {/* Temperature Graph */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Temperature</h3>
        <div className="relative h-40">
          {/* Temperature Line */}
          <div className="absolute left-0 right-0 top-0 bottom-20 flex items-end">
            <svg className="w-full h-full" viewBox="0 0 800 100" preserveAspectRatio="none">
              <polyline
                points={points}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                className="drop-shadow-md"
              />
            </svg>
          </div>

          {/* Temperature Points */}
          <div className="absolute left-0 right-0 bottom-0 flex justify-between">
            {forecast.map((hour, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={`font-medium ${getTemperatureClass(hour.temp)}`}>
                  {hour.temp}°
                </span>
                <span className="text-xs text-gray-500 mt-1">{hour.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Precipitation Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Precipitation</h3>
        <div className="flex h-20 items-end justify-between">
          {forecast.map((hour, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center w-1/8 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-xs text-blue-500 mb-1">{hour.precipitation}%</div>
              <div 
                className="w-4 bg-blue-200 rounded-t"
                style={{ height: `${Math.max(1, hour.precipitation)}px` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {forecast.map((hour, index) => (
            <div key={index} className="text-xs text-gray-500 w-1/8 text-center">
              {hour.time}
            </div>
          ))}
        </div>
      </div>
      
      {/* Conditions */}
      <div className="grid grid-cols-8 gap-2 mb-6">
        {forecast.map((hour, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <WeatherIcon iconName={hour.conditions} size={20} className="mb-1" />
            <span className="text-xs text-gray-500">{hour.conditions.split(" ")[0]}</span>
          </div>
        ))}
      </div>
      
      {/* Wind Speed */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-4">Wind Speed (m/s)</h3>
        <div className="grid grid-cols-8 gap-2">
          {forecast.map((hour, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Wind size={16} className="text-blue-500 mb-1" />
              <span className="text-sm">{hour.wind}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};