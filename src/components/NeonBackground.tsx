import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NeonBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create some floating neon particles
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particles: THREE.Mesh[] = [];

    for (let i = 0; i < 100; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.random() > 0.5 ? '#9f7aea' : '#63b3ed'),
        transparent: true,
        opacity: 0.6,
      });
      const particle = new THREE.Mesh(geometry, material);

      particle.position.x = (Math.random() - 0.5) * 50;
      particle.position.y = (Math.random() - 0.5) * 50;
      particle.position.z = (Math.random() - 0.5) * 50;

      scene.add(particle);
      particles.push(particle);
    }

    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);

      particles.forEach((p, i) => {
        p.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
        p.position.x += Math.cos(Date.now() * 0.001 + i) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      particles.forEach(p => (p.material as THREE.Material).dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950"
    />
  );
};

export default NeonBackground;
