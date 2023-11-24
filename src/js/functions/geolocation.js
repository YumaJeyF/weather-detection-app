import { weatherApi } from "./api.js";
import { changeData } from "./change_data.js";

export const handleWeatherByGeolocation = () => {

    const options = { 
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    const success = async (pos) => {
        
        // Получаем координаты

        const crd = pos.coords;
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&lang=ru&apiKey=8a721d4805c34256876cafd7571dfdc0`;

        const response = await fetch(url); 

        let result;

        if (response.ok) result = await response.json();
        else throw new Error(`Ошибка, статус ошибки ${response.status}`);

        const weather = await weatherApi(result.features[0].properties.city);
        changeData(weather);
    }

    const error = (error) => console.error(error.code + ' ' + error.message);

    navigator.geolocation.getCurrentPosition(success, error, options);
}