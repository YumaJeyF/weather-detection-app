import { weatherApi } from "./api.js";
import { changeData } from './change_data.js';
import { fromCToF } from "./helper.js";
import { fromFToC } from "./helper.js";
import { handleWeatherByGeolocation } from './geolocation.js';

export const weather = async () => {

    // Город по умолчанию

    const weather = await weatherApi('Москва');
    changeData(weather);

    // Смена меры измерения температуры

    const btnsTemp = document.querySelectorAll('.city__btn-temp');
    const temp = document.querySelector('.temperature__number');

    btnsTemp.forEach(btn => btn.addEventListener('click', () => {
        if (!btn.classList.contains('city__btn-temp--active')) {
            btnsTemp.forEach(btn => {
                if (btn.classList.contains(('city__btn-temp--active'))) btn.classList.remove('city__btn-temp--active');
            });
            
            btn.classList.add('city__btn-temp--active');

            if (btn.innerHTML === 'F') {
                const tempF = fromCToF(temp.innerHTML);
                temp.innerHTML = Math.round(tempF);
            } 
            else {
                const tempC = fromFToC(temp.innerHTML);
                temp.innerHTML = Math.round(tempC);
            }
        }
    }));

    // Изменение города

    const btnChange = document.querySelector('#change-city');
    const input = document.querySelector('.change-inf__textfield');
    const btnOk = document.querySelector('.change-inf__button');
    const popup = document.querySelector('.change-inf__popup');
    
    btnChange.addEventListener('click', () => {
        if (!popup.classList.contains('change-inf__popup--visible')) popup.classList.add('change-inf__popup--visible');
    });

    window.addEventListener('click', event => {
        if (!event.target.closest('.change-inf__popup') 
        && !event.target.classList.contains('title--change')
        && !event.target.classList.contains('city__btn-temp')
        && popup.classList.contains('change-inf__popup--visible')) popup.classList.remove('change-inf__popup--visible');
    });

    window.addEventListener('keydown', event => {
        if (popup.classList.contains('change-inf__popup--visible')) {
            if (event.key === 'Escape') popup.classList.remove('change-inf__popup--visible');
            if (event.key === 'Enter') changeCity();
        }
    });

    btnOk.addEventListener('click', changeCity);

    async function changeCity() {
        if (input.value !== '') {
            const weather = await weatherApi(input.value);
            changeData(weather);
            
            if (weather == false) {
                alert('Вы ошиблись в названии города, поробуйте заново');
            } else {
                popup.classList.remove('change-inf__popup--visible');
                input.value = '';
            }
        }
    }

    // Определение местоположения по клику

    const btnGeolocation = document.querySelector('.change-inf__location');

    btnGeolocation.addEventListener('click', handleWeatherByGeolocation);
}