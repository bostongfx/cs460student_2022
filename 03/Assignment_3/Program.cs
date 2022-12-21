< html >
  < head >
    < style >
      html, body
{
    background - color:#000;
        margin: 0;
padding: 0;
height: 100 %;
overflow: hidden!important;
}
    </ style >
    < script src = "https://threejs.org/build/three.min.js" type = "text/javascript" ></ script >
    < script src = "https://threejs.org/examples/js/controls/TrackballControls.js" type = "text/javascript" ></ script >
    < script >
      window.onload = function() {


    // create scene
    scene = new THREE.Scene();

    // setup the camera
    var fov = 75;
    var ratio = window.innerWidth / window.innerHeight;
    var zNear = 1;
    var zFar = 10000;
    camera = new THREE.PerspectiveCamera(fov, ratio, zNear, zFar);


    animate();

};

function animate()
{

    requestAnimationFrame(animate);

    // and here...

};
    </ script >
  </ head >
  < body ></ body >
</ html >