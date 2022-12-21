//////////////settings/////////
var movementSpeed = 80;
var totalObjects = 1000;
var objectSize = 10;
var sizeRandomness = 4000;
var colors = [0xFF0FFF, 0xCCFF00, 0xFF000F, 0x996600, 0xFFFFFF];
/////////////////////////////////
//var dirs = [];

Explosion = function ExplodeAnimation(x,y,z)
{
  var geometry = new THREE.BufferGeometry();
  var vertices = [];
  this.dirs = [];
  
  for (i = 0; i < totalObjects; i ++) {
    vertices.push(x, y, z);
    this.dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
  }
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

  //var material = new THREE.ParticleBasicMaterial( { size: objectSize,  color: colors[Math.round(Math.random() * colors.length)] });

  var material = new THREE.PointsMaterial( { size: objectSize,  color: colors[Math.round(Math.random() * colors.length)] });
  //var particles = new THREE.ParticleSystem( geometry, material );
  var particles = new THREE.Points( geometry, material );
  
  this.particleMaterial = material;
  this.particlesRect = particles;
  this.status = true;
  
  this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);

  this.pointX = x;
  this.pointY = y;
  this.pointZ = z;

  this.time = 0.0;
  this.size = 10.0;
  
  scene.add( this.particlesRect  ); 
};
  
Explosion.prototype.update = function(){
  //console.log("update");
  if (this.time < 10.0) {
    this.time = this.time + 0.1;
    this.size = this.size * 0.975;
    this.particlesRect.material.size = this.size;
  } else {
    this.status = false;
    this.remove();
  }
  if (this.status == true){

    var geometry2 = new THREE.BufferGeometry();
    var vertices = [];
  
    for (i = 0; i < totalObjects; i ++) {
      vertices.push(this.pointX+this.dirs[i].x, this.pointY+this.dirs[i].y, this.pointZ+this.dirs[i].z);
      if (i < totalObjects-3) {
        this.pointX = this.particlesRect.geometry.getAttribute('position').array[i*3];
        this.pointY = this.particlesRect.geometry.getAttribute('position').array[i*3+1];
        this.pointZ = this.particlesRect.geometry.getAttribute('position').array[i*3+2];
      }
    }
    this.particlesRect.geometry.dispose();
    geometry2.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    this.particlesRect.geometry = geometry2;

    this.particlesRect.geometry.verticesNeedUpdate = true;
  }
}

Explosion.prototype.remove = function(){
  scene.remove(this.particlesRect);
}