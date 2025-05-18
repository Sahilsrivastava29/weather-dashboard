import { useEffect, useState } from "react";
import { WeatherDashboard } from "@/components/WeatherDashboard";
import { LandingSearch } from "@/components/LandingSearch";
import { toast } from "sonner";
import { fetchCurrentWeather, fetchForecast, formatWeatherData } from "@/lib/api";

const Index = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchLocation: string) => {
    setLoading(true);
    setLocation(searchLocation);
    setError(null);

    try {
      // Fetch current weather
      const currentWeather = await fetchCurrentWeather(searchLocation);
      console.log("Current Weather Response:", currentWeather);

      // Fetch 5-day forecast (3-hour intervals)
      const forecastData = await fetchForecast(searchLocation);
      console.log("Forecast Data Response:", forecastData);

      // Format the data to match WeatherDashboard's expected structure
      const formattedData = formatWeatherData(currentWeather, forecastData);

      setWeatherData(formattedData);
      setHasSearched(true);
      toast.success(`Weather data loaded for ${searchLocation}`);
    } catch (err: any) {
      console.error("Error in handleSearch:", err.message);
      console.error("Error details:", err.response ? err.response.data : err);
      setError("Failed to load weather data. Please try again.");
      toast.error(`Failed to load weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full pb-10">
      {!hasSearched ? (
        <LandingSearch onSearch={handleSearch} loading={loading} />
      ) : error ? (
        <div className="text-center mt-10 text-red-500">{error}</div>
      ) : (
        <WeatherDashboard
          weatherData={weatherData}
          onBackToSearch={() => setHasSearched(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Index;