window.onload = function () {
    var r = new X.renderer3D();
    r.intt();
    for (y = 0; y<9; y++) {
      for(u = 0; u<9; u++){
        var c =new X.cube();
        c.length = 20;
        c.center =[25*u, 25*y, 0];
        c.color =[0,0,1];
      }
    }
}
