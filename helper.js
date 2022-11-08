HELPER = {};

HELPER.cylinderSkeletonMesh = function(howmany, howwide, color) {
  
  var segmentheight = 10; 
  var height = segmentheight * howmany;

  var geometry = new THREE.CylinderBufferGeometry(
    howwide, 
    howwide, 
    height, 
    8, 
    howmany * 3, 
    true 
  );

  var position = geometry.attributes.position;

  var vertex = new THREE.Vector3();

  var skinIndices = [];
  var skinWeights = [];

  for ( var i = 0; i < position.count; i ++ ) {

    vertex.fromBufferAttribute( position, i );

    var y = ( vertex.y + height / 2 );

    var skinIndex = Math.floor( y / segmentheight );
    var skinWeight = ( y % segmentheight ) / segmentheight;

    skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
    skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );

  }

  geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
  geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );

 
  var material = new THREE.MeshStandardMaterial( {
    skinning: true, 
    color: color,
    side: THREE.DoubleSide,
    flatShading: true
  } );

  
  var bones = [];

  
  var parentbone = new THREE.Bone();
  
  bones.push(parentbone);

  for (var i=0; i< howmany; i++) {

    var currentbone = new THREE.Bone();
    currentbone.position.y = segmentheight;

    parentbone.add(currentbone);
    bones.push(currentbone);    
    parentbone = currentbone;
    
  }

  return [geometry, material, bones];

};