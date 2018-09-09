var wheels = new Array();
var myRobot = new Robot(4, 20); // 4 wheels, with a radius of 20
var gamepad1 = new Gamepad();

function setup(){
    //size(width, height);
    document.addEventListener('keyup', 
    () => gamepad1.resetInput() );
    document.addEventListener('keydown', 
    (event) => gamepad1.triggerInput(event.key) );
    
    start();
}

function draw(){
    requestAnimationFrame(draw);
    
    background(100);
    gamepad1.display();//updateInput();
    loop();
    myRobot.display();
}

setup();
draw();