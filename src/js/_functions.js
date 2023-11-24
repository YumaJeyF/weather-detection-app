// Этот файл - подключение готовых компонентов

import * as checkingSupportWebp from './functions/webp_support.js';

checkingSupportWebp.isWebp();

// Виджет погоды

import { weather } from './functions/weather.js';

weather();