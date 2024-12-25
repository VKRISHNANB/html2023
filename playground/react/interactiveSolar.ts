import React, { useRef, useEffect, useState } from 'react';

const SolarSystem = () => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Planet data
    const planets = [
      { name: 'Sun', radius: 20, color: '#ffff00', distance: 0 },
      { name: 'Mercury', radius: 3, color: '#8c8c8c', distance: 32 },
      { name: 'Venus', radius: 5, color: '#ffd700', distance: 44 },
      { name: 'Earth', radius: 6, color: '#0077be', distance: 60 },
      { name: 'Mars', radius: 4, color: '#ff4500', distance: 72 },
      { name: 'Jupiter', radius: 12, color: '#ffa500', distance: 100 },
      { name: 'Saturn', radius: 10, color: '#ffd700', distance: 120 },
      { name: 'Uranus', radius: 7, color: '#40e0d0', distance: 140 },
      { name: 'Neptune', radius: 7, color: '#0000ff', distance: 160 }
    ];

    // Animation variables
    let time = 0;
    const speeds = [0, 4.787, 3.502, 2.978, 2.407, 1.307, 0.969, 0.681, 0.543];

    const drawPlanet = (planet, index) => {
      const angle = time * speeds[index] * 0.001;
      const x = canvas.width / 2 + Math.cos(angle) * planet.distance * (zoom / 50);
      const y = canvas.height / 2 + Math.sin(angle) * planet.distance * (zoom / 50) * Math.cos(rotation.x);

      // Draw orbit
      ctx.beginPath();
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.ellipse(
        canvas.width / 2,
        canvas.height / 2,
        planet.distance * (zoom / 50),
        planet.distance * (zoom / 50) * Math.cos(rotation.x),
        rotation.y,
        0,
        2 * Math.PI
      );
      ctx.stroke();

      // Draw planet
      ctx.beginPath();
      ctx.fillStyle = planet.color;
      ctx.arc(x, y, planet.radius * (zoom / 50), 0, 2 * Math.PI);
      ctx.fill();

      // Add planet name
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.fillText(planet.name, x + planet.radius * (zoom / 50) + 5, y);
    };

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      planets.forEach((planet, index) => {
        drawPlanet(planet, index);
      });

      time++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [rotation, zoom]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      setRotation(prev => ({
        x: prev.x + deltaY * 0.01,
        y: prev.y + deltaX * 0.01
      }));

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    setZoom(prev => Math.max(20, Math.min(100, prev - e.deltaY * 0.1)));
  };

  return (
    <div className="w-full h-screen bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      <div className="absolute top-4 left-4 text-white text-sm">
        <p>Drag to rotate view</p>
        <p>Scroll to zoom in/out</p>
      </div>
    </div>
  );
};

export default SolarSystem;