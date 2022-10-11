var c, gl;
var v_shader, f_shader, shaderprogram;
var vertices, indices, v_buffer, i_buffer;

var step_x = 0.001;
var step_y = 0.001;
var obstacle_factor = 3; // Hint for the bonus!
var direction_y = 1;
var direction_x = -1;
var objdir = 1
var objspeed = 0.0025;


window.onload = function() {

    //************************************************************//
    //
    // INITIALIZE WEBGL
    //
    c = document.getElementById( 'c' ); // setup canvas
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    gl = c.getContext( 'webgl' ); // setup GL context
    gl.viewport(0, 0, c.width, c.height );

    //************************************************************//
    //
    // SHADERS
    //
    v_shader = gl.createShader( gl.VERTEX_SHADER );
    f_shader = gl.createShader( gl.FRAGMENT_SHADER );

    src_vertex = 
    "attribute vec3 a_position; \
    uniform vec3 u_offset; \
    void main(void) { \
      vec3 final_position = a_position; \
      final_position.x += u_offset.x; \
      final_position.y += u_offset.y; \
      final_position.z += u_offset.z; \
      gl_PointSize = 20.0; \
      gl_Position = vec4( final_position, 1.); \
    }"
    
    // compile vertex shader
    gl.shaderSource( v_shader, src_vertex);
    gl.compileShader( v_shader );

    if (!gl.getShaderParameter( v_shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog( v_shader ));
    }

    src_fragment =
    "precision mediump float; \
    uniform vec4 u_color; \
    void main(void) { \
      gl_FragColor = vec4(u_color); \
    }"

    // compile fragment shader
    gl.shaderSource( f_shader, src_fragment );
    gl.compileShader( f_shader );

    if (!gl.getShaderParameter( f_shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog( f_shader ));
    }

    // attach and link the shaders
    shaderprogram = gl.createProgram();
    gl.attachShader( shaderprogram, v_shader );
    gl.attachShader( shaderprogram, f_shader );

    gl.linkProgram( shaderprogram );

    gl.useProgram( shaderprogram );


    // create multiple objects
    objects = [];
    objects.push( createAirplane());
    objects.push( createObstacle());
    objects.push( createObstacle());
    objects.push( createObstacle());
    objects.push( createObstacle());
    objects.push( createObstacle());
    objects.push( createObstacle());
    objects.push( createObstacle());
    objects.push( createObstacle());
    objects.push( createObstacle());

    animate();

};



function createAirplane() {

    //
    // Part 1 Starts
    //

    /*
        _______
    |\  2  /\
    |1\   /3 \
    | / \/____\ 
    |/
    */
    var vertices = new Float32Array( 
    [
        /* triangle 1 (rear) */
        -1.0, -0.55, 0.0,
        -1.0, 0.55, 0.0,
        0.25, -0.25, 0.0,

        /* triangle 2 (middle) */
        -1.0, 0.25, 0.0,
        0.40, 0.25, 0.0,
        0.25, -0.25, 0.0,

        /* triangle 3 (front) */
        0.25, -0.25, 0.0,
        0.40, 0.25, 0.0,
        1.0, -0.35, 0.0 
    ] 
    );
    var scale = 0.1;
    for(i = 0; i < 27; i++)
    vertices[i] *= scale

    var v_buffer = gl.createBuffer(); // create
    gl.bindBuffer( gl.ARRAY_BUFFER, v_buffer ); // bind
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW ); // put data in
    gl.bindBuffer( gl.ARRAY_BUFFER, null ); // unbind

    //
    // Part 1 Ends
    //

    var offset = [0.,0.,0.];
    var color = [1.,0.,0.,1.];

    //
    // Bonus Part 3!
    //

    var indices = new Int16Array([
    0, 1, 2, /* triangle 1 (rear) */
    3, 4, 5, /* triangle 2 (middle) */
    6, 7, 8, /* triangle 3 (front) */
    ]);

    var i_buffer = gl.createBuffer(); 
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, i_buffer ); // bind
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW ); // put data in
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null ); // unbind

    return ['airplane', v_buffer, vertices, offset, color, gl.TRIANGLES, i_buffer];
}



function createObstacle() {

    var vertices = new Float32Array( [ 0.0, 0.0, 0.0 ]);

    var v_buffer = gl.createBuffer(); // create
    gl.bindBuffer( gl.ARRAY_BUFFER, v_buffer ); // bind
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW ); // put data in
    gl.bindBuffer( gl.ARRAY_BUFFER, null ); // unbind

    //
    // Part 2 Starts
    //
    var x = Math.random()
    var y = Math.random()
    var chance = Math.random()
    const chance_min = 0.25, chance_max = 0.75
    if(chance > chance_max)
    x *= -1.0;
    if(chance < chance_min)
    y *= -1.0
    if(chance > chance_min && chance < chance_max)
    {
    x *= -1.0
    y *= -1.0
    }
    var offset = [x, y, 0.];


    //
    // Part 2 Ends
    //

    var color = [Math.random(),Math.random(),Math.random(),1.];

    return ['obstacle', v_buffer, vertices, offset, color, gl.POINTS];

}



//
// Part 3 Starts (no coding required, just explanations in PDF)
//
function calculateBoundingBox(vertices, offset) {

    var minx = 1000;
    var maxx = -1000;
    var miny = 1000;
    var maxy = -1000;
    var minz = 1000;
    var maxz = -1000;

    for (var v=0; v<vertices.length; v+=3) {

    var currentx = vertices[v] + offset[0];
    var currenty = vertices[v+1] + offset[1];
    var currentz = vertices[v+2] + offset[2];

    minx = Math.min( minx, currentx );
    miny = Math.min( miny, currenty );
    minz = Math.min( minz, currentz );

    maxx = Math.max( maxx, currentx );
    maxy = Math.max( maxy, currenty );
    maxz = Math.max( maxz, currentz );

    }

    return [minx, maxx, miny, maxy, minz, maxz];

}

function detectCollision(bbox, point) {

    var collision = false;

    if (point[0] >= bbox[0] && point[0] <= bbox[1]) {
    if (point[1] >= bbox[2] && point[1] <= bbox[3]) {
        if (point[2] >= bbox[4] && point[2] <= bbox[5]) {

        collision = true;

        }
    }
    }

    return collision;

}
/*
1. calculateBoundingBox:
- takes parameters of vertices of object and offset in the screen
- it calculates a box to fit all the vertices of the object by finding the minimum and maximum vertex positions and their added offsets
- Each x, y, z vertex position component is checked and and a minimum and maximum is used to build the box and returns a 6 element array (min and max for x, y, and z)
2. detectCollision
- it takes parameters of an existing bounding box and a collision point.
- it then proceeds to check if the box is overlapping with the point by evaluating each x, y and z components of each max and min point in the bounding box is equal or in range with each x, y and z of the said collision point
- if all x, y and z of the collision point are in range, i.e overlapping with the bounding box, it returns true, else false
*/

//
// Part 3 Ends
//



//
// Part 4 Starts
//
window.onkeyup = function(e) {
    const speed = 0.005
    if ( e.keyCode == 38 ) {
    // player pressed up
    step_y = speed
    direction_y = 1
    } else if (e.keyCode == 40 ) {
    // player pressed down
    step_y = speed
    direction_y = -1

    } else if (e.keyCode == 37 ) {
    // player pressed left
    step_x = speed
    direction_x = -1

    } else if (e.keyCode == 39 ) {
    // player pressed right
    step_x = speed
    direction_x = 1
    }

};
//
// Part 4 Ends
//

var framecounter = 0;

function animate() {

    framecounter += 1;
    

    if (framecounter > 150) {

    // roughly every five seconds with 30 FPS

    // update score
    document.getElementById('scoreboard').innerHTML = parseInt(document.getElementById('scoreboard').innerHTML) + 100;

    //
    // Bonus Part 2!
    //
    objspeed += 0.0002


    framecounter = 0;

    }

    gl.clearColor( 0., 0., 0., 0.)
    gl.clear( gl.COLOR_BUFFER_BIT);


    xxx = 0
    for( var o = 0; o < objects.length; o++ ) {

    var current_objecttype = objects[o][0];
    var current_v_buffer = objects[o][1];
    var current_vertices = objects[o][2];
    var current_offset = objects[o][3];
    var current_color = objects[o][4];
    var current_drawtype = objects[o][5];
    var current_i_buffer = objects[o][6];

    var current_v_count = current_vertices.length;

    if (current_objecttype == 'airplane') {

        // update offsets
        if ( current_offset[0] <= -1. ) {
        // bumped into left end of screen
        direction_x = 1;
        } else if ( current_offset[0] >= 1. ) {
        // bumped into right end of screen
        direction_x = -1;
        }
        current_offset[0] += direction_x*step_x;

        if ( current_offset[1] <= -1. ) {
        // bumped into left end of screen
        direction_y = 1;
        } else if ( current_offset[1] >= 1. ) {
        // bumped into right end of screen
        direction_y = -1;
        }
        current_offset[1] += direction_y*step_y;


        // get the bounding box of this airplane
        var bbox_plane = calculateBoundingBox( current_vertices, current_offset);
    } else if (current_objecttype == 'obstacle') {


        //
        // Bonus Part 1!
        //
        if ( current_offset[0] <= -1. ) {
        // bumped into left end of screen
        objdir = 1;
        } else if ( current_offset[0] >= 1. ) {
        // bumped into right end of screen
        objdir = -1;
        }
        current_offset[0] += objdir*objspeed;

        // collision detection using the bounding box of this airplane
        if (detectCollision(bbox_plane, current_offset)) {

        document.getElementById('scoreboard').innerHTML += ' AND...GAME OVER!'

        return;

        }
    }


    //************************************************************//
    //
    // CONNECT SHADER WITH GEOMETRY
    //
    
    gl.bindBuffer( gl.ARRAY_BUFFER, current_v_buffer );

    if(current_i_buffer != undefined){
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, current_i_buffer );
    }

    // find the attribute in the shader source
    var a_position = gl.getAttribLocation( shaderprogram, 'a_position' );

    gl.vertexAttribPointer( a_position, 3, gl.FLOAT, false, 0, 0 );

    gl.enableVertexAttribArray ( a_position );

    // find the uniform in the shader source
    var u_offset = gl.getUniformLocation( shaderprogram, 'u_offset' );

    gl.uniform3fv( u_offset, current_offset)

    var u_color = gl.getUniformLocation( shaderprogram, 'u_color' );
    
    gl.uniform4fv( u_color, new Float32Array(current_color) );

    //************************************************************//
    //
    // DRAW!
    //
    
    //
    // Bonus Part 3!
    //
    if(current_i_buffer != undefined){
        gl.drawElements(current_drawtype, 9, gl.UNSIGNED_SHORT, 0)
    }else{
        gl.drawArrays( current_drawtype, 0, current_v_count/3, 0 );
    }
    
    }


    requestAnimationFrame(animate);

};
