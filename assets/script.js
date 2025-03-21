// 3D Background Animation with Three.js
document.addEventListener('DOMContentLoaded', function() {
    // Create scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    
    const posArray = new Float32Array(particleCount * 3);
    
    // Generate random positions
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Positions - spread particles in a spherical pattern
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i+1] = (Math.random() - 0.5) * 15;
        posArray[i+2] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material for particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x7c4dff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particle system
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.0005;
        
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
});

// Files data with real file paths
const files = [
    {
        name: "NekorimnasTools MultiTool v1.0",
        description: "Main application with all tools included",
        size: "15.2 MB",
        icon: "fa-wrench",
        downloadUrl: "files/tool.exe"
    },
    {
        name: "Source Code",
        description: "GitHub repository with complete source code",
        size: "8.7 MB",
        icon: "fa-code",
        downloadUrl: "files/source.zip"
    },
    {
        name: "Documentation",
        description: "User manual and API documentation",
        size: "2.3 MB",
        icon: "fa-book",
        downloadUrl: "files/info.txt"
    }
];

// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loaderContainer').classList.add('hidden');
        document.getElementById('mainContent').classList.add('fadeIn');
    }, 2000); // 2 seconds loading time
});

// Generate download cards
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
        size.innerHTML = `<small>Size: ${file.size}</small>`;
        
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
        downloadLink.appendChild(document.createTextNode(' Download'));
        
        card.appendChild(iconDiv);
        card.appendChild(contentDiv);
        card.appendChild(downloadLink);
        
        downloadCardsContainer.appendChild(card);
    });
}); 