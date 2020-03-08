
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var car = new Car(0, 0, 30, 50);

function render() {
    canvas.width = document.getElementById("canvas").clientWidth;
    canvas.height = document.getElementById("canvas").clientHeight;

    var transX = canvas.width * 0.5,
        transY = canvas.height * 0.5;
    ctx.translate(transX, transY);
    ctx.scale(1, -1);

    ctx.fillStyle = 'black';
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(-2, -2, 4, 4);

    car.update(0, 0);
    car.draw(ctx);
    car.drawDR(ctx);

    tick();
}


var keyDown = {},
    keyMap = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

document.addEventListener("keydown", event => { keyDown[keyMap[event.which]] = true; });
document.addEventListener("keyup", event => { keyDown[keyMap[event.which]] = false; });

var tick = function () {
    var steer = 0;
    var gas = 0;
    if (keyDown['down'])
        gas = -1;
    else if (keyDown['up'])
        gas = 1;

    if (keyDown['left'])
        steer = 1;
    else if (keyDown['right'])
        steer = -1;

    car.feedControls(steer, gas);
};

setInterval(render, 10);
