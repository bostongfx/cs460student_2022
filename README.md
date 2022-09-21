# cs460student
Assignments for CS460.org!
<html>
<head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    <title>CS460 Assignment 2</title>
    <style>
        body {
            background-color: grey;
            color: white; /* font color */
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden !important;
        }

        #logo {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    </style>

    <script type="text/javascript" src="http://get.goXTK.com/xtk_edge.js"></script>

    <script type="text/javascript">window.onload = function () {

            // this gets called when the site is ready

            // create a new scene and renderer
        var r = new X.renderer3D();

        r.init();

        for (var i = 0; i < 26; i++) {
            for (var j = 0; j < 29; j++) {

            var c = new X.cube();
            c.center = [30 * i, 30 * j, 0]
            if (i < 10 && i > 5 && j == 26) {
                c.color = [0, 0, 0];
            }

            if (i == 20 && j == 26) {
                c.color = [0, 0, 0];
            }

            if (i == 5 && j == 25) {
                c.color = [0, 0, 0];
            }

            if (i == 10 && j == 25) {
                c.color = [0, 0, 0];
            }

            if (i == 19 && j == 25) {
                c.color = [0, 0, 0];
            }

            if (i == 21 && j == 25) {
                c.color = [0, 0, 0];
            }

            if (i < 10 && i > 5 && j == 25) {
                c.color = [1, 0.5, 0];
            }

            if (i == 20 && j == 25) {
                c.color = [1, 0, 0];
            }

            if (i == 4 && j == 24) {
                c.color = [0, 0, 0];
            }

            if (i == 11 && j == 24) {
                c.color = [0, 0, 0];
            }

            if (i > 4 && i < 11 && j == 24) {
                c.color = [1, 0.5, 0];
            }

            if (i == 19 && j == 24) {
                c.color = [0, 0, 0];
            }

            if (i == 22 && j == 24) {
                c.color = [0, 0, 0];
            }

            if (i < 22 && i > 19 && j == 24) {
                c.color = [1, 0, 0];
            }
                if (i == 4 && j == 23) {
                    c.color = [0, 0, 0];
                }

                if (i == 11 && j == 23) {
                    c.color = [0, 0, 0];
                }

                if (i > 4 && i < 11 && j == 23) {
                    c.color = [1, 0.5, 0];
                }

                if (i == 19 && j == 23) {
                    c.color = [0, 0, 0];
                }

                if (i == 22 && j == 23) {
                    c.color = [0, 0, 0];
                }

                if (i < 22 && i > 19 && j == 23) {
                    c.color = [1, 0, 0];
                }
                if (i == 3 && j == 22) {
                    c.color = [0, 0, 0];
                }

                if (i == 12 && j == 22) {
                    c.color = [0, 0, 0];
                }

                if (i > 3 && i < 12 && j == 22) {
                    c.color = [1, 0.5, 0];
                }

                if (i == 18 && j == 22) {
                    c.color = [0, 0, 0];
                }

                if (i == 23 && j == 22) {
                    c.color = [0, 0, 0];
                }

                if (i < 23 && i > 18 && j == 22) {
                    c.color = [1, 0, 0];
                }
                if (i == 2 && j == 21) {
                    c.color = [0, 0, 0];
                }

                if (i == 12 && j == 21) {
                    c.color = [0, 0, 0];
                }

                if (i > 2 && i < 7 && j == 21) {
                    c.color = [1, 0.5, 0];
                }
                if (i > 8 && i < 12 && j == 21 ) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 8 && j == 21) {
                    c.color = [0, 0, 0];
                }
                if (i == 18 && j == 21) {
                    c.color = [0, 0, 0];
                }

                if (i == 23 && j == 21) {
                    c.color = [0, 0, 0];
                }

                if (i < 23 && i > 21 && j == 21) {
                    c.color = [1, 0, 0];
                }
                if (i > 18 && i < 21 && j == 21) {
                    c.color = [1, 0, 0];
                }
                if (i == 21 && j == 21) {
                    c.color = [1, 1, 0];
                }
                if (i == 2 && j == 20) {
                    c.color = [0, 0, 0];
                }

                if (i == 13 && j == 20) {
                    c.color = [0, 0, 0];
                }

                if (i > 2 && i < 7 && j == 20) {
                    c.color = [1, 0.5, 0];
                }
                if (i > 8 && i < 13 && j == 20) {
                    c.color = [1, 0.5, 0];
                }
                if (i > 6 && i < 9 && j == 20) {
                    c.color = [0, 0, 0];
                }
                if (i == 18 && j == 20) {
                    c.color = [0, 0, 0];
                }

                if (i == 23 && j == 20) {
                    c.color = [0, 0, 0];
                }

                if (i == 19 && j == 20) {
                    c.color = [1, 0, 0];
                }
                if (i == 22 && j == 20) {
                    c.color = [1, 0, 0];
                }
                if (i > 19 && i < 22 && j == 20) {
                    c.color = [1, 1, 0];
                }
                
                if (i == 2 && j == 19) {
                    c.color = [0, 0, 0];
                }

                if (i == 13 && j == 19) {
                    c.color = [0, 0, 0];
                }

                if (i > 2 && i < 7 && j == 19) {
                    c.color = [1, 0.5, 0];
                }
                if (i > 8 && i < 13 && j == 19) {
                    c.color = [1, 0.5, 0];
                }
                if (i > 6 && i < 9 && j == 19) {
                    c.color = [0, 0, 0];
                }
                if (i == 19 && j == 19) {
                    c.color = [0, 0, 0];
                }
                if (i == 20 && j == 19) {
                    c.color = [1, 1, 0];
                }
                if (i > 20 && i < 23 && j == 19) {
                    c.color = [0, 0, 0];
                }
                if (i == 3 && j == 18) {
                    c.color = [0, 0, 0];
                }

                if (i == 14 && j == 18) {
                    c.color = [0, 0, 0];
                }
                if (i > 3 && i < 14 && j == 18) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 19 && j == 18) {
                    c.color = [0, 0, 0];
                }
                if (i == 20 && j == 18) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 21 && j == 18) {
                    c.color = [0, 0, 0];
                }
                if (i > 3 && i < 6 && j == 17) {
                    c.color = [0, 0, 0];
                }

                if (i == 15 && j == 17) {
                    c.color = [0, 0, 0];
                }
                if(i > 5 && i < 15 && j == 17) {
                    c.color = [1, 0.5, 0];
                }
                if(i == 18 && j == 17) {
                    c.color = [0, 0, 0];
                }
                if (i > 18 && i < 21 && j == 17) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 21 && j == 17) {
                    c.color = [0, 0, 0];
                }
                if (i > 5 && i < 10 && j == 16) {
                    c.color = [0, 0, 0];
                }
                if (i > 9 && i < 12 && j == 16) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 12 && j == 16) {
                    c.color = [0, 0, 0];
                }
                if (i > 12 && i < 16 && j == 16) {
                    c.color = [1, 0.5, 0];
                }
                if (i > 15 && i < 18 && j == 16) {
                    c.color = [0, 0, 0];
                }
                if (i > 17 && i < 20 && j == 16) {
                    c.color = [1, 0.5, 0];
                }
                if(i == 20 && j == 16) {
                    c.color = [0, 0, 0];
                }
                if (i == 7 && j == 15) {
                    c.color = [0, 0, 0];
                }
                if (i > 7 && i < 11 && j == 15) {
                    c.color = [1, 1, 0];
                }
                if (i == 11 && j == 15) {
                    c.color = [0, 0, 0];
                }
                if (i > 11 && i < 17 && j == 15) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 17 && j == 15) {
                    c.color = [0, 0, 0];
                }
                if (i > 17 && i < 20 && j == 15) {
                    c.color = [1, 0.5, 0];
                }

                if (i == 20 && j == 15) {
                    c.color = [0, 0, 0];
                }
                if (i == 7 && j == 14) {
                    c.color = [0, 0, 0];
                }
                if (i > 7 && i < 12 && j == 14) {
                    c.color = [1, 1, 0];
                }
                if (i > 11 && i < 14 && j == 14) {
                    c.color = [0, 0, 0];
                }
                if (i > 13 && i < 17 && j == 14) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 17 && j == 14) {
                    c.color = [0, 0, 0];
                }
                if (i == 18 && j == 14) {
                    c.color = [1, 0.5, 0];
                }
                if (i == 19 && j == 14) {
                    c.color = [0, 0, 0];
                }
                if (i == 6 && j == 13) {
                    c.color = [0, 0, 0];
                }
                if (i == 7 && j == 13) {
                    c.color = [0.7, 0.7, 0.7];
                }
                if (i == 8 && j == 13) {
                    c.color = [0, 0, 0];
                }
                if (i > 8 && i < 13 && j == 13) {
                    c.color = [1, 1, 0];
                }
                if (i > 12 && i < 17 && j == 13) {
                    c.color = [1, 0.5, 0];

                }
                if (i > 16 && i <19 && j == 13) {
                    c.color = [0, 0, 0];
                }
                if (i > 6 && i < 10 && j == 12) {
                    c.color = [0, 0, 0];
                }
                if (i > 9 && i < 12 && j == 12) {
                    c.color = [1, 1, 0];
                }
                if (i > 11 && i < 16 && j == 12) {
                    c.color = [1, 0.5, 0];

                }
                if(i > 15 && i < 18 && j == 12) {
                    c.color = [0, 0, 0];
                }
                if (i > 9 && i < 14 && j == 11) {
                    c.color = [0, 0, 0];
                }
                if (i == 14 && j == 11) {
                    c.color = [1, 0.5, 0];

                }
                if (i > 14 && i < 17 && j == 11) {
                    c.color = [0, 0, 0];
                }
                if (i > 10 && i < 13 && j == 10) {
                    c.color = [0, 0, 0];
                }
                if(i == 13 && j == 10) {
                    c.color = [0.7, 0.7, 0.7];
                }
                if (i == 14 && j == 10) {
                    c.color = [1, 0.5, 0];
                }
                if(i == 15 && j == 10) {
                    c.color = [0.7, 0.7, 0.7];
                }
                if(i == 16 && j == 10) {
                    c.color = [0, 0, 0];
                }
                if (i > 12 && i < 17 && j == 9) {
                    c.color = [0, 0, 0];
                }
  
            r.add(c);
        }
    }

            //creat cube in for loop

            //creat white cube for the pixel art

            // set camera further away!
            r.camera.position = [0, 0, 1555]

            // render everything!

            r.render();

};
    </script>
</head>
<body>
    <h1>CS460 Assignment 2</h1>
    <div id="logo"><img style="height:60px" src="gfx/cs460.png"></div>
</body>
</html>
