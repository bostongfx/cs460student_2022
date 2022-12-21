import * as THREE from "three";

// implementation from https://codepen.io/GraemeFulton/pen/BNyQMM
export const stars = [];
export function addStars(scene) {
  // The loop will move from z position of -1500 to z position 3000, adding a random particle at each position.
  for (var z = -1500; z < 3000; z += 5) {
    // Make a sphere (exactly the same as before).
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sphere = new THREE.Mesh(geometry, material);

    // This time we give the sphere random x and y positions
    sphere.position.x = Math.random() * 6000 - 3000;
    sphere.position.y = Math.random() * 6000 - 3000;

    // Then set the z position to where it is in the loop (distance of camera)
    sphere.position.z = z;

    // scale it up a bit
    sphere.scale.x = sphere.scale.y = 2;

    //add the stars to the scene
    scene.add(sphere);

    //finally push it to the stars array
    stars.push(sphere);
  }
}
