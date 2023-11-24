import { toTextualDescription } from "./direction.js";

export const changeData = (weather) => {
    const temp = document.querySelector('.temperature__number');
    const tempInf = document.querySelector('.temperature__inf');
    const cityName = document.querySelector('.city__name');
    const description = document.querySelector('.main__text');

    if (weather != false) {

        if (temp.nextElementSibling.innerHTML === '') temp.nextElementSibling.innerHTML = 'o';
        cityName.innerHTML = weather.name;

        if (!document.querySelector('.temperature__icon')) {
            const tempIcon = document.createElement('img');
            tempIcon.classList.add('temperature__icon');
            tempIcon.src = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
            tempInf.prepend(tempIcon)
        } else {
            document.querySelector('.temperature__icon').src = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
        }
    
        temp.innerHTML = Math.floor(weather.main.temp);
    
        const descriptionInf = weather.weather[0].description;
        description.innerHTML = descriptionInf.charAt(0).toUpperCase() + descriptionInf.slice(1);
            
        // Дополнительная информация о погоде (Меню снизу)
    
        const winds = document.querySelectorAll('.add-inf__text');
    
        winds.forEach(wind => {
            if (wind.previousElementSibling.innerHTML === 'Ветер') wind.innerHTML = `${Math.floor(weather.wind.speed)} м/c, ${toTextualDescription(weather.wind.deg)}`;
            if (wind.previousElementSibling.innerHTML === 'Давление') wind.innerHTML = `${weather.main.pressure} мм рт. ст.`;
            if (wind.previousElementSibling.innerHTML === 'Влажность') wind.innerHTML = `${weather.main.humidity}%`;
            if (wind.previousElementSibling.innerHTML === 'Облачность') wind.innerHTML = `${weather.clouds.all}%`;
        });
    }

    const load = document.querySelector('.container__load');
    load.classList.remove('container__load--active');
}