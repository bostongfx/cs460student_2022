window.onload = function () {
    var r = new X.renderer3D();
    r.init();
    for (g =0; g<9; g++){
        for (k =0; k<9; k++){
            var C = new X.cube();
            C.lenght = 20;
            C.center = [25*k, 25*g, 0];
            C.color =[0,1,0];
        }
    }
}

;