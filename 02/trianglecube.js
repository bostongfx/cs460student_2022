window.onload = function () {
    var r = new X.renderer3D();
    r.init();
    var C1 = new X.cube();
    C1.center = [0,0,0];
    C1.lenght = 20;
    r.add( C1 );

    var C2 = new X.cube();
    C2.center = [25,0,0];
    C2.lenght = 20;
    r.add( C2 );

    var C3 = new X.cube();
    C3.center = [50,0,0];
    C3.lenght = 20;
    r.add( C3 );

    var C4 = new X.cube();
    C4.center = [75,0,0];
    C4.lenght = 20;
    C4.color  =[0,1,0];
    setInterval ( function (){
        C4.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C4 );

    var C5 = new X.cube();
    C5.center = [100,0,0];
    C5.lenght = 20;
    C5.color = [0,1,0];
    r.add( C5 );

    var C6 = new X.cube();
    C6.center = [125,0,0];
    C6.lenght = 20;
    C6.color  = [0,1,0];
    setInterval ( function (){
        C6.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C6 );

    var C7 = new X.cube();
    C7.center = [150,0,0];
    C7.lenght = 20;
    r.add( C7 );

    var C8 = new X.cube();
    C8.center = [175,0,0];
    C8.lenght = 20;
    r.add( C8 );

    var C9 = new X.cube();
    C9.center = [200,0,0];
    C9.lenght = 20;
    r.add( C9 );

    var C10 = new X.cube();
    C10.center = [0,25,0];
    C10.lenght = 20;
    r.add( C10 );

    var C11 = new X.cube();
    C11.center = [25,25,0];
    C11.lenght = 20;
    r.add( C11 );

    var C12 = new X.cube();
    C12.center = [50,25,0];
    C12.lenght = 20;
    r.add( C12 );

    var C13 = new X.cube();
    C13.center = [75,25,0];
    C13.lenght = 20;
    C13.color =[0,1,0];
    r.add( C13 );

    var C14 = new X.cube();
    C14.center = [100,25,0];
    C14.lenght = 20;
    C14.color =[0,1,0];
    r.add( C14 );

    var C15 = new X.cube();
    C15.center = [125,25,0];
    C15.lenght = 20;
    C15.color = [0,1,0];
    r.add( C15 );

    var C16 = new X.cube();
    C16.center = [150,25,0];
    C16.lenght = 20;
    r.add( C16 );

    var C17= new X.cube();
    C17.center = [175,25,0];
    C17.lenght = 20;
    r.add( C17 );

    var C18 = new X.cube();
    C18.center = [200,25,0];
    C18.lenght = 20;
    r.add( C18 );

    var C19 = new X.cube();
    C19.center = [0,50,0];
    C19.lenght = 20;
    C19.color =[0,1,0];
    setInterval ( function (){
        C19.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C19 );

    var C20 = new X.cube();
    C20.center = [25,50,0];
    C20.lenght = 20;
    C20.color = [0,1,0];
    r.add( C20 );

    var C21 = new X.cube();
    C21.center = [50,50,0];
    C21.lenght = 20;
    C21.color = [0,1,0];
    r.add( C21 );

    var C22 = new X.cube();
    C22.center = [75,50,0];
    C22.lenght = 20;
    C22.color = [0,1,0];
    r.add( C22 );

    var C23 = new X.cube();
    C23.center = [100,50,0];
    C23.lenght = 20;
    C23.color = [0,1,0];
    r.add( C23 );

    var C24 = new X.cube();
    C24.center = [125,50,0];
    C24.lenght = 20;
    C24.color =[0,1,0];
    r.add( C24 );

    var C25 = new X.cube();
    C25.center = [150,50,0];
    C25.lenght = 20;
    C25.color = [0,1,0];
    r.add( C25 );

    var C26 = new X.cube();
    C26.center = [175,50,0];
    C26.lenght = 20;
    C26.color = [0,1,0];
    r.add( C26 );

    var C27 = new X.cube();
    C27.center = [200,50,0];
    C27.lenght = 20;
    C27.color = [0,1,0];
    r.add( C27 );

    var C28 = new X.cube();
    C28.center = [0,75,0];
    C28.lenght = 20;
    C28.color = [0,1,0];
    r.add( C28 );

    var C29 = new X.cube();
    C29.center = [25,75,0];
    C29.lenght = 20;
    C29.color = [0,1,0];
    r.add( C29 );

    var C30 = new X.cube();
    C30.center = [50,75,0];
    C30.lenght = 20;
    C30.color = [0,1,0];
    r.add( C30 );

    var C31 = new X.cube();
    C31.center = [75,75,0];
    C31.lenght = 20;
    C31.color = [0,1,0];
    r.add( C31 );

    var C32 = new X.cube();
    C32.center = [100,75,0];
    C32.lenght = 20;
    C32.color = [0,1,0];
    r.add( C32 );

    var C33 = new X.cube();
    C33.center = [125,75,0];
    C33.lenght = 20;
    C33.color = [0,1,0];
    r.add( C33 );

    var C34 = new X.cube();
    C34.center = [150,75,0];
    C34.lenght = 20;
    C34.color = [0,1,0];
    r.add( C34 );

    var C35 = new X.cube();
    C35.center = [175,75,0];
    C35.lenght = 20;
    C35.color = [0,1,0];
    r.add( C35 );

    var C36 = new X.cube();
    C36.center = [200,75,0];
    C36.lenght = 20;
    C36.color = [0,1,0];
    r.add( C36 );

    var C37= new X.cube();
    C37.center = [0,100,0];
    C37.lenght = 20;
    r.add( C37 );

    var C38 = new X.cube();
    C38.center = [25,100,0];
    C38.lenght = 20;
    C38.color = [0,1,0];
    r.add( C38 );

    var C39 = new X.cube();
    C39.center = [50,100,0];
    C39.lenght = 20;
    C39.color = [0,1,0];
    setInterval ( function (){
        C39.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C39 );

    var C40 = new X.cube();
    C40.center = [75,100,0];
    C40.lenght = 20;
    C40.color = [0,1,0];
    setInterval ( function (){
        C40.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C40 );

    var C41 = new X.cube();
    C41.center = [100,100,0];
    C41.lenght = 20;
    C41.color = [0,1,0];
    r.add( C41 );

    var C42 = new X.cube();
    C42.center = [125,100,0];
    C42.lenght = 20;
    C42.color = [0,1,0];
    setInterval ( function (){
        C42.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C42 );

    var C43 = new X.cube();
    C43.center = [150,100,0];
    C43.lenght = 20;
    C43.color = [0,1,0];
    r.add( C43 );

    var C44 = new X.cube();
    C44.center = [175,100,0];
    C44.lenght = 20;
    C44.color = [0,1,0];
    setInterval ( function (){
        C44.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C44 );

    var C45 = new X.cube();
    C45.center = [200,100,0];
    C45.lenght = 20;
    r.add( C45 );

    var C46 = new X.cube();
    C46.center = [0,125,0];
    C46.lenght = 20;
    r.add( C46 );

    var C47 = new X.cube();
    C47.center = [25,125,0];
    C47.lenght = 20;
    C47.color = [0,1,0];
    setInterval ( function (){
        C47.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C47 );

    var C48 = new X.cube();
    C48.center = [50,125,0];
    C48.lenght = 20;
    C48.color = [0,1,0];
    setInterval ( function (){
        C48.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C48 );

    var C49 = new X.cube();
    C49.center = [75,125,0];
    C49.lenght = 20;
    C49.color = [0,1,0];
    setInterval ( function (){
        C49.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C49 );

    var C50 = new X.cube();
    C50.center = [100,125,0];
    C50.lenght = 20;
    C50.color = [0,1,0];
    setInterval ( function (){
        C50.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C50 );

    var C51 = new X.cube();
    C51.center = [125,125,0];
    C51.lenght = 20;
    C51.color = [0,1,0];
    setInterval ( function (){
        C51.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C51 );

    var C52 = new X.cube();
    C52.center = [150,125,0];
    C52.lenght = 20;
    C52.color= [0,1,0];
    setInterval ( function (){
        C52.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C52 );

    var C53 = new X.cube();
    C53.center = [175,125,0];
    C53.lenght = 20;
    C53.color = [0,1,0];
    setInterval ( function (){
        C53.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C53 );

    var C54 = new X.cube();
    C54.center = [200,125,0];
    C54.lenght = 20;
    r.add( C54 );

    var C55 = new X.cube();
    C55.center = [0,150,0];
    C55.lenght = 20;
    r.add( C55 );

    var C56 = new X.cube();
    C56.center = [25,150,0];
    C56.lenght = 20;
    r.add( C56 );

    var C57 = new X.cube();
    C57.center = [50,150,0];
    C57.lenght = 20;
    r.add( C57 );

    var C58 = new X.cube();
    C58.center = [75,150,0];
    C58.lenght = 20;
    C58.color = [0,1,0];
    setInterval ( function (){
        C58.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C58 );

    var C59 = new X.cube();
    C59.center = [100,150,0];
    C59.lenght = 20;
    C59.color = [0,1,0];
    setInterval ( function (){
        C59.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C59 );

    var C60 = new X.cube();
    C60.center = [125,150,0];
    C60.lenght = 20;
    C60.color = [0,1,0];
    setInterval ( function (){
        C60.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C60 );

    var C61 = new X.cube();
    C61.center = [150,150,0];
    C61.lenght = 20;
    r.add( C61 );

    var C62 = new X.cube();
    C62.center = [175,150,0];
    C62.lenght = 20;
    r.add( C62 );

    var C63 = new X.cube();
    C63.center = [200,150,0];
    C63.lenght = 20;
    r.add( C63 );

    var C64 = new X.cube();
    C64.center = [0,175,0];
    C64.lenght = 20;
    r.add( C64 );

    var C65 = new X.cube();
    C65.center = [25,175,0];
    C65.lenght = 20;
    r.add( C65 );

    var C66 = new X.cube();
    C66.center = [50,175,0];
    C66.lenght = 20;
    r.add( C66 );

    var C67 = new X.cube();
    C67.center = [75,175,0];
    C67.lenght = 20;
    C67.color = [0,1,0];
    r.add( C67 );

    var C68 = new X.cube();
    C68.center = [100,175,0];
    C68.lenght = 20;
    C68.color = [0,1,0];
    setInterval ( function (){
        C68.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C68 );

    var C69 = new X.cube();
    C69.center = [125,175,0];
    C69.lenght = 20;
    C69.color = [0,1,0];
    setInterval ( function (){
        C69.color = [Math.random(), Math.random(), Math.random()]
    },100);
    r.add( C69 );

    var C70 = new X.cube();
    C70.center = [150,175,0];
    C70.lenght = 20;
    r.add( C70 );

    var C71 = new X.cube();
    C71.center = [175,175,0];
    C71.lenght = 20;
    r.add( C71 );

    var C72 = new X.cube();
    C72.center = [200,175,0];
    C72.lenght = 20;
    r.add( C72 );

    var C73 = new X.cube();
    C73.center = [0,200,0];
    C73.lenght = 20;
    r.add( C73 );

    var C74 = new X.cube();
    C74.center = [25,200,0];
    C74.lenght = 20;
    r.add( C74 );

    var C75 = new X.cube();
    C75.center = [50,200,0];
    C75.lenght = 20;
    r.add( C75 );

    var C76 = new X.cube();
    C76.center = [75,200,0];
    C76.lenght = 20;
    r.add( C76 );

    var C77 = new X.cube();
    C77.center = [100,200,0];
    C77.lenght = 20;
    C77.color = [0,1,0];
    r.add( C77 );

    var C78 = new X.cube();
    C78.center = [125,200,0];
    C78.lenght = 20;
    r.add( C78 );

    var C79 = new X.cube();
    C79.center = [150,200,0];
    C79.lenght = 20;
    r.add( C79 );

    var C80 = new X.cube();
    C80.center = [175,200,0];
    C80.lenght = 20;
    r.add( C80 );

    var C81 = new X.cube();
    C81.center = [200,200,0];
    C81.lenght = 20;
    r.add( C81 );

    r.camera.position = [0,0,1000];
    r.render();
 }



