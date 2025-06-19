// "use client";

// import { useRef, useEffect } from "react";
// import * as THREE from "three";

// export default function MinecraftBackground() {
//   const mountRef = useRef(null);
//   const sceneRef = useRef(null);
//   const rendererRef = useRef(null);
//   const frameRef = useRef(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x1a1a1a);
//     scene.fog = new THREE.Fog(0x1a1a1a, 10, 50);

//     // Camera
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 5, 12);
//     camera.lookAt(0, 2, 0);

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setClearColor(0x000000, 0);
//     mountRef.current.appendChild(renderer.domElement);

//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(10, 10, 5);
//     directionalLight.castShadow = true;
//     directionalLight.shadow.mapSize.width = 2048;
//     directionalLight.shadow.mapSize.height = 2048;
//     scene.add(directionalLight);

//     // Point lights for ambiance
//     const pointLight1 = new THREE.PointLight(0x8b4513, 0.5, 20);
//     pointLight1.position.set(-5, 4, -3);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0x2d4a2d, 0.4, 15);
//     pointLight2.position.set(5, 3, -2);
//     scene.add(pointLight2);

//     // Materials
//     const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
//     const darkWoodMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
//     const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
//     const vinylMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
//     const labelMaterials = [
//       new THREE.MeshLambertMaterial({ color: 0xff6b6b }),
//       new THREE.MeshLambertMaterial({ color: 0x4ecdc4 }),
//       new THREE.MeshLambertMaterial({ color: 0x45b7d1 }),
//       new THREE.MeshLambertMaterial({ color: 0xf9ca24 }),
//       new THREE.MeshLambertMaterial({ color: 0xf0932b }),
//       new THREE.MeshLambertMaterial({ color: 0xeb4d4b }),
//       new THREE.MeshLambertMaterial({ color: 0x6c5ce7 }),
//     ];

//     // Floor
//     const floorGeometry = new THREE.PlaneGeometry(40, 30);
//     const floor = new THREE.Mesh(floorGeometry, stoneMaterial);
//     floor.rotation.x = -Math.PI / 2;
//     floor.receiveShadow = true;
//     scene.add(floor);

//     // Create shelving units
//     function createShelf(x, z, rotation = 0) {
//       const shelfGroup = new THREE.Group();

//       // Shelf structure
//       const shelfGeometry = new THREE.BoxGeometry(4, 0.2, 1);
//       const postGeometry = new THREE.BoxGeometry(0.2, 3, 0.2);

//       // Vertical posts
//       for (let i = 0; i < 3; i++) {
//         const post = new THREE.Mesh(postGeometry, darkWoodMaterial);
//         post.position.set(-1.8 + i * 1.8, 1.5, 0);
//         post.castShadow = true;
//         shelfGroup.add(post);
//       }

//       // Horizontal shelves
//       for (let i = 0; i < 4; i++) {
//         const shelf = new THREE.Mesh(shelfGeometry, woodMaterial);
//         shelf.position.set(0, 0.8 + i * 0.7, 0);
//         shelf.castShadow = true;
//         shelf.receiveShadow = true;
//         shelfGroup.add(shelf);

//         // Add vinyl records on each shelf
//         for (let j = 0; j < 8; j++) {
//           const recordGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02);
//           const record = new THREE.Mesh(recordGeometry, vinylMaterial);
//           record.position.set(-1.5 + j * 0.4, 0.9 + i * 0.7, 0.3);
//           record.rotation.x = Math.PI / 2;
//           record.castShadow = true;
//           shelfGroup.add(record);

//           // Add colorful labels
//           const labelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.025);
//           const label = new THREE.Mesh(
//             labelGeometry,
//             labelMaterials[j % labelMaterials.length]
//           );
//           label.position.set(-1.5 + j * 0.4, 0.91 + i * 0.7, 0.3);
//           label.rotation.x = Math.PI / 2;
//           shelfGroup.add(label);
//         }
//       }

//       shelfGroup.position.set(x, 0, z);
//       shelfGroup.rotation.y = rotation;
//       scene.add(shelfGroup);
//     }

//     // Create multiple shelving units
//     createShelf(-8, -5, 0);
//     createShelf(8, -5, Math.PI);
//     createShelf(-8, 5, 0);
//     createShelf(8, 5, Math.PI);
//     createShelf(0, -8, Math.PI / 2);

//     // Add some scattered vinyl records on floor
//     for (let i = 0; i < 15; i++) {
//       const recordGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02);
//       const record = new THREE.Mesh(recordGeometry, vinylMaterial);
//       record.position.set(
//         (Math.random() - 0.5) * 20,
//         0.01,
//         (Math.random() - 0.5) * 15
//       );
//       record.rotation.x = Math.PI / 2;
//       record.rotation.z = Math.random() * Math.PI * 2;
//       record.castShadow = true;
//       scene.add(record);

//       // Add label
//       const labelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.025);
//       const label = new THREE.Mesh(
//         labelGeometry,
//         labelMaterials[i % labelMaterials.length]
//       );
//       label.position.copy(record.position);
//       label.position.y = 0.02;
//       label.rotation.copy(record.rotation);
//       scene.add(label);
//     }

//     // Add some crates
//     for (let i = 0; i < 6; i++) {
//       const crateGeometry = new THREE.BoxGeometry(1, 0.8, 1);
//       const crate = new THREE.Mesh(crateGeometry, woodMaterial);
//       crate.position.set(
//         (Math.random() - 0.5) * 16,
//         0.4,
//         (Math.random() - 0.5) * 12
//       );
//       crate.rotation.y = Math.random() * Math.PI;
//       crate.castShadow = true;
//       crate.receiveShadow = true;
//       scene.add(crate);
//     }

//     // Add hanging lights
//     for (let i = 0; i < 4; i++) {
//       const lightGeometry = new THREE.SphereGeometry(0.3, 8, 6);
//       const lightMaterial = new THREE.MeshBasicMaterial({
//         color: 0xffd700,
//         emissive: 0xffd700,
//         emissiveIntensity: 0.3,
//       });
//       const light = new THREE.Mesh(lightGeometry, lightMaterial);
//       light.position.set((i - 1.5) * 4, 6, -2);
//       scene.add(light);

//       // Chain
//       const chainGeometry = new THREE.CylinderGeometry(0.02, 0.02, 2);
//       const chainMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
//       const chain = new THREE.Mesh(chainGeometry, chainMaterial);
//       chain.position.set(light.position.x, 7, light.position.z);
//       scene.add(chain);
//     }

//     sceneRef.current = scene;
//     rendererRef.current = renderer;

//     // Animation
//     let time = 0;
//     function animate() {
//       frameRef.current = requestAnimationFrame(animate);
//       time += 0.01;

//       // Gentle camera sway
//       camera.position.x = Math.sin(time * 0.3) * 2;
//       camera.position.z = 12 + Math.cos(time * 0.2) * 1;
//       camera.lookAt(0, 2, 0);

//       // Animate point lights
//       pointLight1.intensity = 0.5 + Math.sin(time * 2) * 0.1;
//       pointLight2.intensity = 0.4 + Math.cos(time * 1.5) * 0.1;

//       renderer.render(scene, camera);
//     }
//     animate();

//     // Handle window resize
//     function handleResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (frameRef.current) {
//         cancelAnimationFrame(frameRef.current);
//       }
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div
//       ref={mountRef}
//       className="fixed inset-0 -z-10"
//       style={{ pointerEvents: "none" }}
//     />
//   );
// }

"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function MinecraftBackground() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const cameraRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue
    scene.fog = new THREE.Fog(0x87ceeb, 30, 100);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(20, 30, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    scene.add(directionalLight);

    // Materials
    const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x4a7c3a });
    const dirtMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const darkWoodMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
    const vinylMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
    const labelMaterials = [
      new THREE.MeshLambertMaterial({ color: 0xff6b6b }),
      new THREE.MeshLambertMaterial({ color: 0x4ecdc4 }),
      new THREE.MeshLambertMaterial({ color: 0x45b7d1 }),
      new THREE.MeshLambertMaterial({ color: 0xf9ca24 }),
      new THREE.MeshLambertMaterial({ color: 0xf0932b }),
      new THREE.MeshLambertMaterial({ color: 0xeb4d4b }),
      new THREE.MeshLambertMaterial({ color: 0x6c5ce7 }),
      new THREE.MeshLambertMaterial({ color: 0x00d2d3 }),
      new THREE.MeshLambertMaterial({ color: 0xff9ff3 }),
      new THREE.MeshLambertMaterial({ color: 0x54a0ff }),
    ];

    // Create ground with grass texture
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const ground = new THREE.Mesh(groundGeometry, grassMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create Minecraft-style tree
    function createTree(x, z) {
      const treeGroup = new THREE.Group();

      // Trunk
      const trunkGeometry = new THREE.BoxGeometry(1, 6, 1);
      const trunk = new THREE.Mesh(trunkGeometry, woodMaterial);
      trunk.position.set(0, 3, 0);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Leaves (blocky style)
      for (let y = 0; y < 3; y++) {
        for (let lx = -2; lx <= 2; lx++) {
          for (let lz = -2; lz <= 2; lz++) {
            if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && y === 0) continue;

            const leavesGeometry = new THREE.BoxGeometry(1, 1, 1);
            const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
            leaves.position.set(lx, 6 + y, lz);
            leaves.castShadow = true;
            treeGroup.add(leaves);
          }
        }
      }

      treeGroup.position.set(x, 0, z);
      scene.add(treeGroup);
    }

    // Create record display stand
    function createRecordStand(x, z, rotation = 0) {
      const standGroup = new THREE.Group();

      // Base platform
      const baseGeometry = new THREE.BoxGeometry(6, 0.5, 4);
      const base = new THREE.Mesh(baseGeometry, darkWoodMaterial);
      base.position.set(0, 0.25, 0);
      base.castShadow = true;
      base.receiveShadow = true;
      standGroup.add(base);

      // Vertical display boards
      for (let i = 0; i < 3; i++) {
        const boardGeometry = new THREE.BoxGeometry(0.2, 3, 3.5);
        const board = new THREE.Mesh(boardGeometry, woodMaterial);
        board.position.set(-2 + i * 2, 2, 0);
        board.castShadow = true;
        standGroup.add(board);

        // Records leaning against each board
        for (let j = 0; j < 12; j++) {
          const recordGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02);
          const record = new THREE.Mesh(recordGeometry, vinylMaterial);
          record.position.set(-2 + i * 2 + 0.15, 0.8 + j * 0.2, -1.2 + j * 0.2);
          record.rotation.x = Math.PI / 2 + 0.2;
          record.rotation.z = Math.PI / 2;
          record.castShadow = true;
          standGroup.add(record);

          // Colorful labels
          const labelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.025);
          const label = new THREE.Mesh(
            labelGeometry,
            labelMaterials[j % labelMaterials.length]
          );
          label.position.copy(record.position);
          label.position.x += 0.02;
          label.rotation.copy(record.rotation);
          standGroup.add(label);
        }
      }

      // Crates around the stand
      for (let i = 0; i < 4; i++) {
        const crateGeometry = new THREE.BoxGeometry(1.2, 1, 1.2);
        const crate = new THREE.Mesh(crateGeometry, woodMaterial);
        const angle = (i / 4) * Math.PI * 2;
        crate.position.set(Math.cos(angle) * 4, 0.5, Math.sin(angle) * 3);
        crate.castShadow = true;
        crate.receiveShadow = true;
        standGroup.add(crate);

        // Records in crates
        for (let j = 0; j < 6; j++) {
          const recordGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02);
          const record = new THREE.Mesh(recordGeometry, vinylMaterial);
          record.position.set(
            crate.position.x + (-0.4 + (j % 3) * 0.4),
            crate.position.y + 0.5,
            crate.position.z + (Math.floor(j / 3) * 0.4 - 0.2)
          );
          record.rotation.x = Math.PI / 2;
          record.castShadow = true;
          standGroup.add(record);

          const labelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.025);
          const label = new THREE.Mesh(
            labelGeometry,
            labelMaterials[j % labelMaterials.length]
          );
          label.position.copy(record.position);
          label.position.y += 0.02;
          label.rotation.copy(record.rotation);
          standGroup.add(label);
        }
      }

      standGroup.position.set(x, 0, z);
      standGroup.rotation.y = rotation;
      scene.add(standGroup);
    }

    // Create circular arrangement of record stands
    const numStands = 8;
    const standRadius = 25;
    for (let i = 0; i < numStands; i++) {
      const angle = (i / numStands) * Math.PI * 2;
      const x = Math.cos(angle) * standRadius;
      const z = Math.sin(angle) * standRadius;
      createRecordStand(x, z, angle + Math.PI);
    }

    // Create inner circle of record stands
    const innerStands = 5;
    const innerRadius = 12;
    for (let i = 0; i < innerStands; i++) {
      const angle = (i / innerStands) * Math.PI * 2;
      const x = Math.cos(angle) * innerRadius;
      const z = Math.sin(angle) * innerRadius;
      createRecordStand(x, z, angle + Math.PI);
    }

    // Create trees around the perimeter
    const numTrees = 24;
    const treeRadius = 45;
    for (let i = 0; i < numTrees; i++) {
      const angle = (i / numTrees) * Math.PI * 2;
      const x = Math.cos(angle) * (treeRadius + Math.random() * 10);
      const z = Math.sin(angle) * (treeRadius + Math.random() * 10);
      createTree(x, z);
    }

    // Add some random trees
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 55 + Math.random() * 20;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      createTree(x, z);
    }

    // Scattered vinyl records on ground
    for (let i = 0; i < 50; i++) {
      const recordGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02);
      const record = new THREE.Mesh(recordGeometry, vinylMaterial);
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 35;
      record.position.set(
        Math.cos(angle) * radius,
        0.01,
        Math.sin(angle) * radius
      );
      record.rotation.x = Math.PI / 2;
      record.rotation.z = Math.random() * Math.PI * 2;
      record.castShadow = true;
      scene.add(record);

      const labelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.025);
      const label = new THREE.Mesh(
        labelGeometry,
        labelMaterials[i % labelMaterials.length]
      );
      label.position.copy(record.position);
      label.position.y = 0.02;
      label.rotation.copy(record.rotation);
      scene.add(label);
    }

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Mouse movement handler
    function handleMouseMove(event) {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    let time = 0;
    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Mouse-controlled camera rotation
      const targetX = mouseRef.current.x * Math.PI * 0.3;
      const targetY = Math.max(-0.5, Math.min(0.5, mouseRef.current.y * 0.3));

      // Smooth camera movement based on mouse
      const radius = 0.1;
      camera.position.x = Math.sin(targetX) * radius;
      camera.position.z = Math.cos(targetX) * radius;
      camera.position.y = 8 + targetY * 5;

      // Always look towards the center with slight mouse influence
      camera.lookAt(
        Math.sin(targetX) * 5,
        2 + targetY * 2,
        Math.cos(targetX) * 5
      );

      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
}
