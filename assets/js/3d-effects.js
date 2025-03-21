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