export const weatherApi = async (city) => {
    const load = document.querySelector('.container__load');

    if (!load.classList.contains('container__load--active')) load.classList.add('container__load--active');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7827be5493bdb9aff78ab7c81a125179&units=metric&lang=ru`;

    const response = await fetch(url);

    if (response.status == 404) return false;
    
    if (response.ok) return await response.json();
    else throw new Error(`Ошибка ${response.status}`);
}