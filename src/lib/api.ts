// This file will handle our OpenWeatherMap API calls

interface WeatherApiConfig {
  apiKey: string;
  baseUrl: string;
}

// Configuration object - API key should already be set
const config: WeatherApiConfig = {
  apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY || "", // You confirmed this is set correctly
  baseUrl: "https://api.openweathermap.org/data/2.5",
};

// Function to fetch current weather data
export const fetchCurrentWeather = async (location: string, units: string = "metric") => {
  try {
    const response = await fetch(
      `${config.baseUrl}/weather?q=${location}&units=${units}&appid=${config.apiKey}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Weather data not available for ${location}: ${errorData.message}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

// Function to fetch forecast data (5 day / 3 hour forecast)
export const fetchForecast = async (location: string, units: string = "metric") => {
  try {
    const response = await fetch(
      `${config.baseUrl}/forecast?q=${location}&units=${units}&appid=${config.apiKey}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Forecast data not available for ${location}: ${errorData.message}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};

// Function to fetch One Call API data (current, minutely, hourly, daily) - Not used for now
export const fetchOneCallData = async (
  lat: number, 
  lon: number, 
  units: string = "metric",
  exclude: string[] = []
) => {
  try {
    const excludeString = exclude.length > 0 ? `&exclude=${exclude.join(",")}` : "";
    const response = await fetch(
      `${config.baseUrl}/onecall?lat=${lat}&lon=${lon}&units=${units}${excludeString}&appid=${config.apiKey}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Weather data not available for coordinates (${lat}, ${lon}): ${errorData.message}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching one call data:", error);
    throw error;
  }
};

// Utility function to map OpenWeatherMap icon codes to our custom icons
export const mapWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    "01d": "sun",
    "01n": "moon",
    "02d": "cloud-sun",
    "02n": "cloud-moon",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "cloud",
    "04n": "cloud",
    "09d": "cloud-drizzle",
    "09n": "cloud-drizzle",
    "10d": "cloud-rain",
    "10n": "cloud-rain",
    "11d": "cloud-lightning",
    "11n": "cloud-lightning",
    "13d": "cloud-snow",
    "13n": "cloud-snow",
    "50d": "wind",
    "50n": "wind",
  };
  
  return iconMap[iconCode] || "cloud";
};

// Function to convert API data into our app's format
export const formatWeatherData = (currentWeather: any, forecastData: any) => {
  // Group forecast data by day for daily forecast
  const dailyData: { [key: string]: any[] } = {};
  forecastData.list.forEach((entry: any) => {
    const date = new Date(entry.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(entry);
  });

  // Create daily forecast by aggregating data for each day
  const daily = Object.keys(dailyData).map((date) => {
    const entries = dailyData[date];
    const temps = entries.map((entry: any) => entry.main.temp);
    const conditions = entries[0].weather[0].description; // Use the first entry's condition
    const icon = entries[0].weather[0].icon; // Use the first entry's icon
    return {
      day: date,
      high: Math.round(Math.max(...temps)),
      low: Math.round(Math.min(...temps)),
      conditions,
      icon,
    };
  });

  return {
    location: currentWeather.name,
    current: {
      temp: Math.round(currentWeather.main.temp),
      feelsLike: Math.round(currentWeather.main.feels_like),
      description: currentWeather.weather[0].description,
      humidity: currentWeather.main.humidity,
      windSpeed: currentWeather.wind.speed,
      pressure: currentWeather.main.pressure,
      dewPoint: Math.round(currentWeather.main.temp - 2), // Simplified
      visibility: currentWeather.visibility / 1000, // Convert to km
      uvIndex: 0, // Not available in /forecast, set to 0
      icon: currentWeather.weather[0].icon,
      date: new Date(),
    },
    hourly: forecastData.list.slice(0, 8).map((hour: any) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "numeric" }),
      temp: Math.round(hour.main.temp),
      conditions: hour.weather[0].description,
      wind: hour.wind.speed,
      precipitation: hour.rain ? (hour.rain["3h"] || 0) * 10 : 0, // Convert mm to percentage (approximation)
    })),
    daily: daily.slice(0, 8), // Limit to 8 days
  };
};