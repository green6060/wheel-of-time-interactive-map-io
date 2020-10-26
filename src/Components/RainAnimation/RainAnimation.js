import React, { useRef, useState } from 'react'
import * as THREE from 'three/src/Three'
import { Canvas, useFrame } from 'react-three-fiber'

function RainGeometry(props) {


    // Create Geomotry, for Rain
    let rainGeometry = new THREE.Geometry();
    for(let i=0; i < 1500; i++) {
        // Create Raindrops, as vectors, efficiently
      let rainDrop = new THREE.Vector3(
        Math.random() * 400 -200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
      rainDrop.velocity = {};
      rainDrop.velocity = 0;
      rainGeometry.vertices.push(rainDrop);
    }


    // Create Material, for Rain
    let rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true
    });

  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Animation
  useFrame((rainGeometry) => {
    // Animation that occurs every frame
            // rainGeometry.vertices.forEach(p => {
            //         p.velocity -= 0.1 + Math.random() * 0.1;
            //         p.y += p.velocity;
            //         if (p.y < -200) {
            //             p.y = 200;
            //             p.velocity = 0;
            //         }
            //         });
            //         rainGeometry.verticesNeedUpdate = true;
            //         rain.rotation.y +=0.002;
    
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'white'} />
    </mesh>
  )
}

export default function Rain() {
  return (
    <Canvas>
      <ambientLight  color={0x555555}/>
      <directionalLight color={0xffeedd} position={[0,0,1]}/>
      <pointLight color={0x062d89} intensity={30} distance={500} decay={1.7} />
      <RainGeometry />
      <RainGeometry />
    </Canvas>
  )
}

//     // Create Rain
//     rain = new THREE.Points(rainGeo, rainMaterial);
//     // Add Rain to Scene
//     scene.add(rain);





/* Initialize Rain Animation*/
// let scene,camera, renderer, cloudParticles = [], flash, rain, rainGeo, rainCount = 15000;
// setRain(scene, camera, renderer, cloudParticles, flash, rain, rainGeo, rainCount)

// const setRain = (scene, camera, renderer, cloudParticles, flash, rain, rainGeo, rainCount) => {

//     ////// CAMERA
//     //
//     // Create a Camera
//     camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
//     // Position Camera
//     camera.position.z = 1;
//     camera.rotation.x = 1.16;
//     camera.rotation.y = -0.12;
//     camera.rotation.z = 0.27;

//     // Create Fog
//     scene.fog = new THREE.FogExp2(0x11111f, 0.002);

//     ////// RAIN
//     //
//     // Create Geomotry, for Rain
//     rainGeo = new THREE.Geometry();
//     for(let i=0;i<rainCount;i++) {
//         // Create Raindrops, as vectors, efficiently
//       let rainDrop = new THREE.Vector3(
//         Math.random() * 400 -200,
//         Math.random() * 500 - 250,
//         Math.random() * 400 - 200
//       );
//       rainDrop.velocity = {};
//       rainDrop.velocity = 0;
//       rainGeo.vertices.push(rainDrop);
//     }
//     // Create Material, for Rain
//     let rainMaterial = new THREE.PointsMaterial({
//       color: 0xaaaaaa,
//       size: 0.1,
//       transparent: true
//     });
//     // Create Rain
//     rain = new THREE.Points(rainGeo, rainMaterial);
//     // Add Rain to Scene
//     scene.add(rain);

//     // Create Texture Loader
//     let loader = new THREE.TextureLoader();
//     loader.load(Smoke, (texture) => {
//         // Create Geomotry, Cloud
//         let cloudGeo = new THREE.PlaneBufferGeometry(500,500);
//         let cloudMaterial = new THREE.MeshLambertMaterial({
    //         map: texture,
    //         transparent: true
//         });
//         for(let p=0; p<25; p++) {
//             let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
//             cloud.position.set(
//                 Math.random()*800 -400,
//                 500,
//                 Math.random()*500 - 450
//             );
//             // Add animation to cloud position
//             cloud.rotation.x = 1.16;
//             cloud.rotation.y = -0.12;
//             cloud.rotation.z = Math.random()*360;
//             cloud.material.opacity = 0.6;
//             cloudParticles.push(cloud);
//             // Add cloud to scene
//             scene.add(cloud);
//         }

//         // Animate rain / cloud / lightning interaction and movement
//         const animate = (cloudParticles, flash, rain, rainGeo) => {
//             cloudParticles.forEach(p => {
//                 p.rotation.z -=0.002;
//             });
//             rainGeo.vertices.forEach(p => {
//             p.velocity -= 0.1 + Math.random() * 0.1;
//             p.y += p.velocity;
//             if (p.y < -200) {
//                 p.y = 200;
//                 p.velocity = 0;
//             }
//             });
//             rainGeo.verticesNeedUpdate = true;
//             rain.rotation.y +=0.002;
//             if(Math.random() > 0.93 || flash.power > 100) {
//             if(flash.power < 100) 
//                 flash.position.set(
//                 Math.random()*400,
//                 300 + Math.random() *200,
//                 100
//                 );
//             flash.power = 50 + Math.random() * 500;
//             }
//         }

//         animate(cloudParticles, flash, rain, rainGeo)
//     });
// }