const SNAKE_DISPLACEMENT_VECTOR = {'x': 0.0, 'y': 0.0, 'z': -1.1}
const SNAKE_BODY = [Body, Tail]

const SNAKE_REACH = 1;
var score = 0;

var R_DTHETA = -10;
var L_DTHETA = +10; 

var GAME_OVER = false;

function getPosition(position) {
    return {'x': position.x, 'y': position.y, 'z': position.z};
}

function getDisplacedPosition(position, displacement) {
    return {
        'x': position.x + displacement.x,
        'y': position.y + displacement.y,
        'z': position.z + displacement.z
    }
}

function intersectOnXZProjection(position1, position2) {
    return position1.x === position2.x && position1.z === position2.z;
}

function distance(point1, point2) {
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;
    var dz = point1.z - point2.z;

    return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

function updateScore() {
    score += 1;
    ScoreText.setText(`Score: ${score}`);

    PointScored.stopSound();
    PointScored.playSound();
}

function consumeFood() {
    growSnakeAtNeck();
    updateScore();

    var newRandomX = Hatch.getRandomNumber(-50, 50);
    var newRandomZ = Hatch.getRandomNumber(-50, 50);

    Food.setPosition(newRandomX, Food.getWorldPositionY(), newRandomZ);
}

function updateSnakePosition() {
    if(GAME_OVER) { return; }
    
    var prevPosition = getPosition(Head.getPosition());
    var prevRotation = Head.getRotationY();

    var currPosition = getDisplacedPosition(
        prevPosition, SNAKE_DISPLACEMENT_VECTOR);

    Head.setPosition(
        currPosition.x, currPosition.y, currPosition.z);
    
    if(distance(currPosition, Food.getWorldPosition()) < SNAKE_REACH) {
        consumeFood();
    }

    for(var i = 0; i < SNAKE_BODY.length; i++) {
        var bodyPart = SNAKE_BODY[i];

        currPosition = getPosition(prevPosition);
        currRotation = prevRotation;

        if(intersectOnXZProjection(Head.getPosition(), currPosition)) {
            Hatch.log("Game Over!");  // for debugging
            gameOver();
        }

        prevPosition = getPosition(bodyPart.getPosition());
        prevRotation = bodyPart.getRotationY();

        bodyPart.setPosition(currPosition.x, currPosition.y, currPosition.z);
        bodyPart.setRotationY(currRotation);

    }
}

function rotateDisplacementVectorR(displacement) {
    var oldX = displacement.x;
    var oldZ = displacement.z;

    displacement.x = -oldZ;
    displacement.z = oldX;
}

function rotateDisplacementVectorL(displacement) {
    var oldX = displacement.x;
    var oldZ = displacement.z;

    displacement.x = oldZ;
    displacement.z = -oldX;
}

function abs(x) {
    if(x < 0) {
        return -x;
    }

    return x;
}

function pokeSnake() {
    Hatch.createTimer('snakePositionUpdater', 200, updateSnakePosition);
}

function haltSnake() {
    Hatch.removeTimer('snakePositionUpdater');
}

function animateSnakeRotation(dTheta, timerName) {
    var oldRotY = Head.getRotationY();
    var dtheta = 0;

    haltSnake(); 

    Hatch.createTimer(timerName, 1, function () {
        dtheta += dTheta;
        
        if(abs(dtheta) >= 90) {
            pokeSnake();
            Hatch.removeTimer(timerName);
        }
        Head.setRotationY(oldRotY + dtheta);
    });
}

function turnSnake(dTheta) {
    var rotationTimerName = `SnakeRotation:${dTheta}`

    if(dTheta < 0) {
        rotateDisplacementVectorR(SNAKE_DISPLACEMENT_VECTOR);
    } else {
        rotateDisplacementVectorL(SNAKE_DISPLACEMENT_VECTOR);
    }

    animateSnakeRotation(dTheta, rotationTimerName);
}

function growSnakeAtNeck() {
    Hatch.cloneObject(Body, function(newBodySegment) {
        var position = SNAKE_BODY[0].getPosition();  // position of neck
        newBodySegment.setPosition(position.x, position.y, position.z);
        SNAKE_BODY.unshift(newBodySegment);
        Hatch.log(SNAKE_BODY.length);  // for debugging purposes
    })
}

Hatch.onKeyDown(function (event) {
    if (event.key == 'ArrowRight') {
        turnSnake(R_DTHETA);
    } else if (event.key == 'ArrowLeft') {
        turnSnake(L_DTHETA);
    }
})

function initGame() {
    pokeSnake();
}

function gameOver() {
    GAME_OVER = true;
    Game_over.stopSound();
    Game_over.playSound();
    haltSnake();
    var gameOverText = `Game Over! ${ScoreText.getText()}`;
    ScoreText.setText(gameOverText);   
}

initGame();