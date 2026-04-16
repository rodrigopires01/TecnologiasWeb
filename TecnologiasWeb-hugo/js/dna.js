// ==================== DNA 3D NI NEWSLETTER- MÓDULO AUXILIAR ====================

/**
 * Configura o DNA em 3D.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {Object} Objeto com scene, camera, renderer, dnaGroup e container.
 */
export function setupDNA3D() {
    const container = document.getElementById('dna-container');

    const blue = 0x84D0F0;
    const yellow = 0xFED162;
    const purple = 0x651E59;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
    const ballGeometry = new THREE.SphereGeometry(0.8, 16, 16);

    const blueMaterial = new THREE.MeshBasicMaterial({ color: blue });
    const yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });
    const purpleMaterial = new THREE.MeshBasicMaterial({ color: purple });

    const dnaGroup = new THREE.Group();

    return {
        container,
        scene,
        camera,
        renderer,
        dnaGroup,
        tubeGeometry,
        ballGeometry,
        blueMaterial,
        yellowMaterial,
        purpleMaterial
    };
}

/**
 * Cria a estrutura do DNA com 20 camadas
 * @param {Object} components - Componentes para a estrutura (dnaGroup, tubeGeometry, ballGeometry, blueMaterial, yellowMaterial, purpleMaterial)
 * @returns {Object} dnaGroup com a estrutura completa
 */
export function criarEstruturaDNA(components) {
    const { dnaGroup, tubeGeometry, ballGeometry, blueMaterial, yellowMaterial, purpleMaterial } = components;

    for (let i = 0; i <= 20; i++) {
        const row = new THREE.Group();
        const yPos = i * 2 - 20;

        const blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
        blueTube.rotation.z = Math.PI/2;
        blueTube.position.set(-3, 0, 0);

        const yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial);
        yellowTube.rotation.z = Math.PI/2;
        yellowTube.position.set(3, 0, 0);

        const ballLeft = new THREE.Mesh(ballGeometry, purpleMaterial);
        ballLeft.position.set(-6, 0, 0);

        const ballRight = new THREE.Mesh(ballGeometry, purpleMaterial);
        ballRight.position.set(6, 0, 0);

        row.add(blueTube, yellowTube, ballLeft, ballRight);
        row.position.y = yPos;
        row.rotation.y = i * 0.5;

        dnaGroup.add(row);
    }

    return dnaGroup;
}

/**
 * Faz a animação do DNA
 * @param {Object} components - Componentes da estrutura (dnaGroup, renderer, scene, camera).
 * @returns {Function} Função da animação.
 */
export function iniciarAnimacaoDNA(components) {
    const { dnaGroup, renderer, scene, camera } = components;

    function animate() {
        requestAnimationFrame(animate);
        dnaGroup.rotation.x += 0.005;
        dnaGroup.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    return animate;
}

/**
 * Configura o redimensionamento responsivo
 * @param {Object} components - Componentes da estrutura (container, camera, renderer)
 */
export function configurarRedimensionamentoDNA(components) {
    const { container, camera, renderer } = components;

    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}
