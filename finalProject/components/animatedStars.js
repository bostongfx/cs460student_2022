import { stars } from "./addStars";

export default function animateStars(speed) {
  // loop through each star
  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];

    // and move it forward dependent on the mouseY position.
    s.position.z -= i / speed;

    // if the particle is too close move it to the back
    if (s.position.z < -1000) s.position.z += 2000;
  }
}
