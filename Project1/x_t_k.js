function ren(){
var r  = new X.renderer3D();
r.init();

var skull = new X.mesh();
skull.file= 'skull.vtk';
r.add(skull);

r.render();
}
ren();