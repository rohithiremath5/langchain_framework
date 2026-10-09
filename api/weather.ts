
async function getWeather(city: string) {
    // 1. Get city coordinates
    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    if (!geoResponse.ok) {
        throw new Error("Failed to find city");
    }

    const geoData = await geoResponse.json();
    const location = geoData.results?.[0];

    if (!location) {
        throw new Error(`City not found: ${city}`);
    }

    // 2. Fetch current weather
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
    );

    if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather");
    }

    const weatherData = await weatherResponse.json();

    // 3. Return the weather data
    return {
        city: location.name,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        time: weatherData.current.time,
    };
}

// Test it
// console.log(await getWeather("New York"));
export { getWeather };

