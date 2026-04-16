// PASSAR ISTO PARA .ENV NO FUTURO
const apiKey = '6d9cf7e1077b9b62e8e5596d81e1ef66';

/**
 * Obtém a previsão meteorológica para uma cidade, data e hora específicas. Utiliza a API OpenWeatherMap (previsão de 5 dias com intervalos de 3 horas)
 * @async
 * @param {string} city - Nome da cidade
 * @param {string} targetDate - Data no formato "YYYY-MM-DD"
 * @param {string} targetHour - Hora no formato "HH:MM"
 * @returns {Promise<Object|null>} Promise que resolve para um objeto com os dados da previsão (icon, description, temp, feels_like, humidity, wind, pressure, sea_level) ou `null` se não houver previsão para a data/hora exatas
 */
async function getForecastByCityAndDate(city, targetDate, targetHour) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
    
    return fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => 
			returnData(weatherData, targetDate, targetHour));
}

/**
 * Processa os dados brutos da API OpenWeatherMap e extrai a previsão mais próxima da data/hora pretendida (arredondando a hora para o intervalo de 3 horas anterior)
 * @param {Object} weatherData - Objeto JSON devolvido pela API OpenWeatherMap
 * @param {string} targetDate - Data alvo no formato "YYYY-MM-DD"
 * @param {string} targetHour - Hora alvo no formato "HH:MM"
 * @returns {Object|null} Objeto formatado com os campos da previsão:
 *                        - icon {string}: código do ícone
 *                        - description {string}: descrição textual do tempo
 *                        - temp {number}: temperatura
 *                        - feels_like {number}: sensação térmica
 *                        - humidity {number}: humidade
 *                        - wind {number}: velocidade do vento
 *                        - pressure {number}: pressão atmosférica
 *                        - sea_level {number}: nível do mar
 *                        Retorna `null` se a data/hora não for encontrada
 */
function returnData(weatherData, targetDate, targetHour) {
    const horaNum = parseInt(targetHour.split(':')[0]);
    const horaPrevista = Math.floor(horaNum / 3) * 3;
    const horaFormatada = `${horaPrevista.toString().padStart(2, '0')}:00:00`;
    const alvo = `${targetDate} ${horaFormatada}`;

    const previsao = weatherData.list.find(item => item.dt_txt === alvo);

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


/**
 * Obtém as coordenadas (latitude, longitude) de uma cidade utilizando o serviço Nominatim (OpenStreetMap)
 * Percorre os resultados para dar prioridade a entradas cujo `addresstype` seja "city", pois ao usar a primeira entrada do objeto não estava a dar o local certo
 * @async
 * @param {string} cidade - Nome da cidade a pesquisar
 * @returns {Promise<{lat: string, lon: string} | null>} Promise que resolve para um objeto com as propriedades `lat` e `lon` (strings) ou `null` se nenhum resultado for encontrado.
 */
async function obterCoordenadas(cidade) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${(cidade)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
        let resultado = null;
            for (const item of data) {
                if (item.addresstype === 'city') {
                    resultado = item;
                    break;
                }
            }
        return {lat: resultado.lat, lon: resultado.lon };
    }
    return null;
}

/**
 * Renderiza um mapa interativo Leaflet num contentor HTML.
 * @param {string} containerId - ID do elemento HTML que irá conter o mapa
 * @param {{lat: string|number, lon: string|number}} coords - Coordenadas centrais do mapa
 * @param {string} titulo - Título a ser exibido na popup do marcador
 * @returns {void}
 */
function renderizarMapa(containerId, coords, titulo) {
    const container = document.getElementById(containerId);

    container.innerHTML = "";

    const map = L.map(containerId).setView([coords.lat, coords.lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([coords.lat, coords.lon]).addTo(map).bindPopup(titulo);
}
