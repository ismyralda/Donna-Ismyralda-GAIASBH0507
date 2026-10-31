import { useState, useEffect } from "react";

export default function WeatherApp(){
    const [weather, setWeather] = useState(null);
    const [unit, setUnit] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=5.98&longitude=116.07&current_weather=true");
            const data = await res.json();
            setWeather(data.current_weather);
            setUnit(data.current_weather_units);
        }
        fetchWeather();
    }, []);

    if (!weather) return <p>Loading weather...</p>;

    function formatTime(isoString) {
        return new Date(isoString + 'Z').toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }

    return (
        <div>
            <h2>Current Weather</h2>
            <p>Last Updated: {formatTime(weather.time)}</p>
            <p>Temperature: {weather.temperature} {unit.temperature}</p>
            <p>Windspeed: {weather.windspeed} {unit.windspeed}</p>
        </div>
    );
}