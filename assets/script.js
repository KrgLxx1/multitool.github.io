// 3D Background Animation with Three.js
document.addEventListener('DOMContentLoaded', function() {
    // Create scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Add renderer to page
    const container = document.getElementById('background3d');
    if (container) {
        container.appendChild(renderer.domElement);
        
        // Style the canvas
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.zIndex = '-1';
        renderer.domElement.style.pointerEvents = 'none';
    }
    
    // Create a grid of points
    const createWavyGrid = () => {
        const geometry = new THREE.PlaneGeometry(60, 60, 50, 50);
        
        // Custom shader material for wavy gradient effect
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                colorA: { value: new THREE.Color(0x7c4dff) },
                colorB: { value: new THREE.Color(0x2d1e5e) }
            },
            vertexShader: `
                uniform float time;
                varying vec2 vUv;
                varying float vElevation;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Add wave effect
                    float elevation = sin(pos.x * 0.1 + time) * sin(pos.y * 0.1 + time) * 2.0;
                    pos.z += elevation;
                    vElevation = elevation;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 colorA;
                uniform vec3 colorB;
                varying vec2 vUv;
                varying float vElevation;
                
                void main() {
                    float intensity = (vElevation + 2.0) / 4.0;
                    vec3 color = mix(colorB, colorA, intensity + 0.2 * sin(vUv.x * 10.0) * sin(vUv.y * 10.0));
                    gl_FragColor = vec4(color, 0.7);
                }
            `,
            wireframe: false,
            transparent: true
        });
        
        // Create mesh from geometry and material
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -5;
        return { mesh, material };
    };
    
    // Create the grid
    const { mesh, material } = createWavyGrid();
    scene.add(mesh);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Create a directional light
    const dirLight = new THREE.DirectionalLight(0x7c4dff, 1);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update time value for wave effect
        material.uniforms.time.value += 0.01;
        
        // Slowly rotate the scene
        mesh.rotation.z += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Интерактивное движение по наведению мыши
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        mesh.rotation.x = -Math.PI / 2 + mouseY * 0.1;
        mesh.rotation.z = mouseX * 0.1;
    });
});

// Данные о файлах для скачивания
const files = [
    {
        name: "Nekorimnas Cleaner",
        description: "Программа для очистки компьютера от временных файлов",
        size: "12.5 МБ",
        icon: "fa-broom",
        downloadUrl: "files/Cleaner.zip"
    }
];

// Экран загрузки
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loaderContainer').classList.add('hidden');
        document.getElementById('mainContent').classList.add('fadeIn');
    }, 2000); // 2 секунды на загрузку
});

// Генерация карточек для скачивания
document.addEventListener('DOMContentLoaded', function() {
    const downloadCardsContainer = document.getElementById('downloadCards');
    
    // Очистим контейнер карточек перед добавлением, чтобы избежать дублирования
    downloadCardsContainer.innerHTML = '';
    
    files.forEach(file => {
        const card = document.createElement('div');
        card.className = 'download-card';
        
        // Создаём элементы вручную вместо использования innerHTML для лучшего контроля
        const iconDiv = document.createElement('div');
        iconDiv.className = 'icon';
        const icon = document.createElement('i');
        icon.className = `fas ${file.icon}`;
        iconDiv.appendChild(icon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        
        const title = document.createElement('h3');
        title.textContent = file.name;
        
        const description = document.createElement('p');
        description.textContent = file.description;
        
        const size = document.createElement('p');
        size.innerHTML = `<small>Размер: ${file.size}</small>`;
        
        contentDiv.appendChild(title);
        contentDiv.appendChild(description);
        contentDiv.appendChild(size);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = file.downloadUrl;
        downloadLink.className = 'download-btn';
        downloadLink.setAttribute('download', ''); // Добавляем атрибут download для скачивания
        
        const downloadIcon = document.createElement('i');
        downloadIcon.className = 'fas fa-download';
        downloadLink.appendChild(downloadIcon);
        downloadLink.appendChild(document.createTextNode(' Скачать'));
        
        card.appendChild(iconDiv);
        card.appendChild(contentDiv);
        card.appendChild(downloadLink);
        
        downloadCardsContainer.appendChild(card);
    });
}); 