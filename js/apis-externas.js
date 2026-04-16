const apiKey = '6d9cf7e1077b9b62e8e5596d81e1ef66';

async function getForecastByCityAndDate(city, targetDate, targetHour) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
    
    return fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => 
			returnData(weatherData, targetDate, targetHour));
}

function returnData(weatherData, targetDate, targetHour) {
    const horaNum = parseInt(targetHour.split(':')[0]);
    const horaPrevista = Math.floor(horaNum / 3) * 3;
    const horaFormatada = `${horaPrevista.toString().padStart(2, '0')}:00:00`;
    const alvo = `${targetDate} ${horaFormatada}`;

    const previsao = weatherData.list.find(item => item.dt_txt === alvo);
	console.log(previsao);

    if (previsao) {
        return {
            icon: previsao.weather[0].icon,
            description: previsao.weather[0].description,
            temp: Math.round(previsao.main.temp),
            feels_like: Math.round(previsao.main.feels_like),
            humidity: previsao.main.humidity,
            wind: previsao.wind.speed,
            pressure: previsao.main.pressure,
            sea_level: previsao.main.sea_level,
        };
    }
    return null;
}