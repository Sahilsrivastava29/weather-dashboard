import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  forecast: {
    day: string;
    high: number;
    low: number;
    conditions: string;
    icon: string;
  }[];
}

export const DailyForecast = ({ forecast }: DailyForecastProps) => {
  return (
    <Card className="glass-card divide-y divide-gray-100">
      {forecast.map((day, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-4 animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Day */}
          <div className="w-1/4">
            <p className="font-medium">{day.day}</p>
          </div>
          
          {/* Weather Condition */}
          <div className="w-1/4 flex items-center">
            <WeatherIcon iconName={day.icon} className="mr-2 text-blue-500" />
            <span className="text-sm text-gray-600">{day.conditions}</span>
          </div>
          
          {/* Temperature Range */}
          <div className="w-1/4">
            <div className="flex items-center justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
          
          {/* High/Low */}
          <div className="w-1/4 text-right">
            <span className="text-orange-500 font-medium">{day.high}°</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-blue-500 font-medium">{day.low}°</span>
          </div>
        </div>
      ))}
    </Card>
  );
};