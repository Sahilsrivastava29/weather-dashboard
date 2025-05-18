
import { 
  Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, 
  Sun, CloudSun, Wind, Thermometer 
} from "lucide-react";

interface WeatherIconProps {
  iconName: string;
  size?: number;
  className?: string;
}

export const WeatherIcon = ({ iconName, size = 24, className = "" }: WeatherIconProps) => {
  const getIcon = () => {
    switch (iconName) {
      case "cloud":
        return <Cloud size={size} className={className} />;
      case "cloud-rain":
        return <CloudRain size={size} className={className} />;
      case "cloud-drizzle":
        return <CloudDrizzle size={size} className={className} />;
      case "cloud-lightning":
        return <CloudLightning size={size} className={className} />;
      case "cloud-snow":
        return <CloudSnow size={size} className={className} />;
      case "sun":
        return <Sun size={size} className={className} />;
      case "cloud-sun":
        return <CloudSun size={size} className={className} />;
      case "wind":
        return <Wind size={size} className={className} />;
      case "thermometer":
        return <Thermometer size={size} className={className} />;
      default:
        return <Cloud size={size} className={className} />;
    }
  };

  return getIcon();
};
