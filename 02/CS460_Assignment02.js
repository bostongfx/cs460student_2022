window.onload = function (){
    var r = new XMLDocument.renderer3D();
    r.init();
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            var D = new XMLDocument.cube();
            D.length = 20;
            D.center = [25*j,25*i,0];
            D.color = [1,1,1];
            
        }
    }

}
