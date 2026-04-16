// ==================== GRÁFICO DE PRODUÇÃO ACADÊMICA - MÓDULO AUXILIAR ====================

/**
 * Fornece e processa os dados do gráfico.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {Object} Objeto com data, tipos, dadosAgrupados, series e alturaTotal.
 */
export function processarDadosGrafico() {
    const data = [
        {categoria: "Projetos", tipo: "Em curso", valor: 3},
        {categoria: "Projetos", tipo: "Concluídos", valor: 6},
        {categoria: "Estágios", tipo: "Em curso", valor: 8},
        {categoria: "Estágios", tipo: "Concluídos", valor: 14},
        {categoria: "Mestrados/Doutoramentos", tipo: "Em curso", valor: 4},
        {categoria: "Mestrados/Doutoramentos", tipo: "Concluídos", valor: 9},
        {categoria: "Publicações", tipo: "Indexadas", valor: 16},
        {categoria: "Publicações", tipo: "Não indexadas", valor: 5}
    ];

    const tipos = Array.from(new Set(data.map(d => d.tipo)));

    const dadosAgrupados = Array.from(d3.group(data, d => d.categoria), ([categoria, valores]) => {
        const obj = {categoria};
        valores.forEach(v => obj[v.tipo] = v.valor);
        return obj;
    });

    const series = d3.stack().keys(tipos)(dadosAgrupados);

    const alturaTotal = series[0].length * 60 + 30 + 30;

    return { data, tipos, dadosAgrupados, series, alturaTotal };
}

/**
 * Define dimensões, margens e escalas.
 * @param {Object} series - Dados empilhados.
 * @param {Array} dadosAgrupados - Dados agrupados por categoria.
 * @param {Array} tipos - Tipos únicos.
 * @param {number} alturaTotal - Altura do SVG.
 * @returns {Object} Objeto com dimensões e escalas.
 */
export function definirDimensoesEEscalas(series, dadosAgrupados, tipos, alturaTotal) {
    const width = 1500;
    const marginTop = 30;
    const marginRight = 150;
    const marginBottom = 30;
    const marginLeft = 180;

    const x = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleBand()
        .domain(dadosAgrupados.map(d => d.categoria))
        .range([marginTop, alturaTotal - marginBottom])
        .padding(0.2);

    const color = d3.scaleOrdinal()
        .domain(tipos)
        .range(["#1E88E5", "#FFC107", "#4CAF50", "#F44336"]);

    return {
        width,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        x,
        y,
        color
    };
}

/**
 * Cria o elemento SVG.
 * @param {Object} dimensoes - Dimensões do gráfico.
 * @param {number} alturaTotal - Altura do SVG.
 * @returns {Object} Objeto SVG do D3.
 */
export function criarSVG(dimensoes, alturaTotal) {
    const { width } = dimensoes;

    return d3.select("#grafico-producao")
        .append("svg")
        .attr("width", width)
        .attr("height", alturaTotal)
        .attr("viewBox", [0, 0, width, alturaTotal])
        .attr("style", "max-width: 100%; height: auto;");
}
