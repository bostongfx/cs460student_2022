let mesh;

// Create an AnimationMixer, and get the list of AnimationClip instances
const mixer = new THREE.AnimationMixer(mesh);
const clips = mesh.animations;

// Update the mixer on each frame
function update() {
    mixer.update(deltaSeconds);
}

// Play a specific animation
const clip = THREE.AnimationClip.findByName(clips, 'dance');
const action = mixer.clipAction(clip);
action.play();

// Play all animations
clips.forEach(function(clip) {
    mixer.clipAction(clip).play();
});