import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, camera and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add point light (sun)
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    scene.add(pointLight);

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planet creation function
    const createPlanet = (radius, color, distance) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color });
      const planet = new THREE.Mesh(geometry, material);
      
      // Create orbit
      const orbitGeometry = new THREE.RingGeometry(distance - 0.1, distance + 0.1, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x666666,
        side: THREE.DoubleSide,
        opacity: 0.2,
        transparent: true
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      // Position planet
      planet.position.x = distance;
      
      // Create a pivot point for rotation
      const pivot = new THREE.Object3D();
      pivot.add(planet);
      scene.add(pivot);
      
      return { planet, pivot };
    };

    // Create planets
    const mercury = createPlanet(0.8, 0x8c8c8c, 8);
    const venus = createPlanet(1.2, 0xffd700, 11);
    const earth = createPlanet(1.5, 0x0077be, 15);
    const mars = createPlanet(1, 0xff4500, 18);
    const jupiter = createPlanet(3, 0xffa500, 25);
    const saturn = createPlanet(2.5, 0xffd700, 30);
    const uranus = createPlanet(1.8, 0x40e0d0, 35);
    const neptune = createPlanet(1.8, 0x0000ff, 40);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 100;

    // Position camera
    camera.position.z = 50;

    // Animation loop
    const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
    const speeds = [4.787, 3.502, 2.978, 2.407, 1.307, 0.969, 0.681, 0.543];

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate planets around sun
      planets.forEach((planet, index) => {
        planet.pivot.rotation.y += 0.001 * speeds[index];
      });

      // Update controls
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default SolarSystem;