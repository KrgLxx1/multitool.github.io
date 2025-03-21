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

// Files data - you can add more files or fetch them dynamically
const files = [
    {
        name: "NekorimnasTools MultiTool v1.0",
        description: "Main application with all tools included",
        size: "15.2 MB",
        icon: "fa-wrench",
        downloadUrl: "#"
    },
    {
        name: "MultiTool Setup",
        description: "Installation package for Windows",
        size: "18.5 MB",
        icon: "fa-windows",
        downloadUrl: "#"
    },
    {
        name: "Source Code",
        description: "GitHub repository with complete source code",
        size: "8.7 MB",
        icon: "fa-code",
        downloadUrl: "#"
    },
    {
        name: "Documentation",
        description: "User manual and API documentation",
        size: "2.3 MB",
        icon: "fa-book",
        downloadUrl: "#"
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
    
    files.forEach(file => {
        const card = document.createElement('div');
        card.className = 'download-card';
        card.innerHTML = `
            <div class="icon">
                <i class="fas ${file.icon}"></i>
            </div>
            <div class="content">
                <h3>${file.name}</h3>
                <p>${file.description}</p>
                <p><small>Size: ${file.size}</small></p>
            </div>
            <button class="download-btn" data-url="${file.downloadUrl}">
                <i class="fas fa-download"></i> Download
            </button>
        `;
        downloadCardsContainer.appendChild(card);
    });

    // Add click event to download buttons
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.dataset.url;
            // Replace with actual download logic
            alert('Downloading file from: ' + url);
            // window.location.href = url; // Uncomment for actual downloads
        });
    });
}); 