////////////////////////////////////////////
////     Classes for the OpModes        ////
////////////////////////////////////////////
class DcMotor {
    constructor(wheelNumber){
        this.wheelNumber = wheelNumber;
    }

    setPower(power){
        if(power < -1 || power > 1){
            console.log("DcMotor.power expects values from -1 to 1.");
        } else if(this.wheelNumber >= myRobot.numberOfWheels){
            console.log("Build Failed: Too many DcMotors initialized.");
        } else {
            wheels[this.wheelNumber].setPower(power);
        }
    }
}

class Gamepad{
    constructor(){
        this.left_stick_x = 0;
        this.left_stick_y = 0;
        this.right_stick_x = 0;
        this.right_stick_y = 0;

        this.dpad_up = false;
        this.dpad_down = false;
        this.dpad_left = false;
        this.dpad_right = false;
        this.button_a = false;
        this.button_b = false;
        this.button_x = false;
        this.button_y = false;
        this.left_bumper = false;
        this.right_bumper = false;

        this.left_trigger = 0;
        this.right_trigger = 0;
    }

    display(){
        fill(255);
        rect(20,20,500,300);
        fill(0,0,100);
        ellipse(200,280,50,50);
        ellipse(340,280,50,50);
        ellipse(160,190,100,100);
        ellipse(380,190,100,100);
        rect(130, 95, 60, 30);
        rect(130, 40, 60, 40);
        rect(350, 95, 60, 30);
        rect(350, 40, 60, 40);
        fill(0,0,0,0);
        rect(145,145,30,90);
        rect(115,175,90,30);
        fill(255,0,0);
        ellipse(405,190,25,25);
        fill(255,255,0);
        ellipse(380,165,25,25);
        fill(0,0,255);
        ellipse(355,190,25,25);
        fill(0,100,0);
        ellipse(380,215,25,25);
        fill(0,255,0);
        text("5",155,65);
        text("6",155,115);
        text("8",375,115);
        text("9",375,65);
        text("H",180,195);
        text("T",155,170);
        text("F",130,195);
        text("G",155,220);
        text("L",400,195);
        text("I",375,170);
        text("J",350,195);
        text("K",375,220);
        text("D",210,285);
        text("W",195,270);
        text("A",180,285);
        text("S",195,300);
        text("R",350,285);
        text("U",335,270);
        text("L",320,285);
        text("D",335,300);
        
        // // display current stick values
        // text(`lx: ${gamepad1.left_stick_x}
        //               ly: ${gamepad1.left_stick_y}
        //               rx: ${gamepad1.right_stick_x}
        //               ry: ${gamepad1.right_stick_y}`, 100, 350);
    }

    triggerInput(keyPressed){
        switch(keyPressed){
        case 53://5
            this.left_trigger = 1;
        break;
        case 57://9
            this.right_trigger = 1;
        break;
        case 54://6
            this.left_bumper = true;
        break;
        case 56://8
            this.right_bumper = true;
        break;
        case 'w':
            this.left_stick_y = 1;
        break;
        case 's':
            this.left_stick_y = -1;
        break;
        case 'a':
            this.left_stick_x = -1;
        break;
        case 'd':
            this.left_stick_x = 1;
        break;
        case 't':
            this.dpad_up = true;
        break;
        case 'g':
            this.dpad_down = true;
        break;
        case 'f':
            this.dpad_left = true;
        break;
        case 'h':
            this.dpad_right = true;
        break;
        case 'i':
            this.button_y = true;
        break;
        case 'k':
            this.button_a = true;
        break;
        case 'j':
            this.button_x = true;
        break;
        case 'l':
            this.button_b = true;
        break;
        }
        switch(keyPressed){
        case 'ArrowUp':
            this.right_stick_y = 1;
        break;
        case 'ArrowDown':
            this.right_stick_y = -1;
        break;
        case 'ArrowLeft':
            this.right_stick_x = -1;
        break;
        case 'ArrowRight':
            this.right_stick_x = 1;
        break;
        }
        this.display();
    }

    resetInput(){
        this.left_stick_x = 0;
        this.left_stick_y = 0;
        this.right_stick_x = 0;
        this.right_stick_y = 0;
        this.dpad_up = false;
        this.dpad_down = false;
        this.dpad_left = false;
        this.dpad_right = false;
        this.button_a = false;
        this.button_b = false;
        this.button_x = false;
        this.button_y = false;
        this.left_bumper = false;
        this.right_bumper = false;
        this.left_trigger = 0;
        this.right_trigger = 0;
    }
}

////////////////////////////////////////////
////     Classes for the Simulator      ////
////////////////////////////////////////////
class Robot{
    constructor(numberOfWheels, size){
        if(this.numberOfWheels < 2 || this.numberOfWheels > 10){
            console.log("Robot.numberOfWheels expects values from 2 to 10.");
        } else {
            this.numberOfWheels = numberOfWheels;
            this.x = width/2;
            this.y = height/2;

            var angle = 0;
            var dif = 2 * Math.PI / this.numberOfWheels;
            for(let i = 0; i < this.numberOfWheels; i++){
                wheels.push( new Wheel(size, angle, this.x, this.y) );
                angle += dif;
            }
        }
    }

    display(){
        this.update();
        for(let i = 0; i < this.numberOfWheels; i++){
            if(i < this.numberOfWheels / 2){
                fill(255, 255, 0);
            } else {
                fill(255, 0, 0);
            }
            wheels[i].display();
        }
        fill(200); //robot color
        ellipse(this.x, this.y, 20, 20);
    }

    update(){
        var newX = 0;
        var newY = 0;
        var deltaX = 0;
        var deltaY = 0;
        var deltaAngle = 0;
        for(let i = 0; i < this.numberOfWheels; i++){
            newX += wheels[i].requestX;
            newY += wheels[i].requestY;
            deltaAngle += wheels[i].requestAngle;
        }
        newX /= this.numberOfWheels;
        newY /= this.numberOfWheels;
        deltaX = newX - this.x;
        deltaY = newY - this.y;
        this.x = newX;
        this.y = newY;
        for(let i = 0; i < this.numberOfWheels; i++){
            // console.log(`dx: ${deltaX} dy: ${deltaY}
            //             angle-delta: ${deltaAngle} `);
            // console.log(`x: ${this.x} `);
            // console.log(`y: ${this.y} `);
            wheels[i].update(deltaX, deltaY, deltaAngle, this.x, this.y);
        }
    }
}

class Wheel{
    constructor(magnitude, direction, robotX, robotY){
        this.magnitude = magnitude;
        this.direction = direction;
        this.robotX = robotX;
        this.robotY = robotY;
        this.x = this.magnitude * Math.cos(-this.direction) + this.robotX;
        this.y = this.magnitude * Math.sin(-this.direction) + this.robotY;
        this.pivotX = this.magnitude * Math.cos(-(this.direction + Math.PI)) + this.robotX;
        this.pivotY = this.magnitude * Math.sin(-(this.direction + Math.PI)) + this.robotY;

        this.power = 0;
        this.reqX = 0;
        this.reqY = 0;
        this.reqA = 0;
    }

    display(){
        //fill(0);    //wheel color
        line(this.x, this.y, this.robotX, this.robotY);
        ellipse(this.x, this.y, 10, 10);
    }

    setPower(speed){
        this.power = speed * 5;
        this.reqA = this.direction + this.power * Math.PI / 180;
    }

    update(deltaX, deltaY, deltaAngle, robotX, robotY){
        this.robotX = robotX;
        this.robotY = robotY;
        this.direction += deltaAngle * Math.PI / 180;
        this.pivotX += deltaX;
        this.pivotY += deltaY;
        this.x = this.robotX + (this.magnitude) * Math.cos(-this.direction);
        this.y = this.robotY + (this.magnitude) * Math.sin(-this.direction);
        this.pivotX = this.robotX + (this.magnitude) * Math.cos(-this.direction + Math.PI);
        this.pivotY = this.robotY + (this.magnitude) * Math.sin(-this.direction + Math.PI);
    }

    set x_pos(updated_x){
        this.x = updated_x;
    }

    set y_pos(updated_y){
        this.y = updated_y;
    }

    get requestX(){
        this.reqX = ((this.pivotX - this.robotX) + this.robotX + (2 * this.magnitude) * Math.cos(-this.reqA));
        return this.reqX;
    }

    get requestY(){
        this.reqY = ((this.pivotY - this.robotY) + this.robotY + (2 * this.magnitude) * Math.sin(-this.reqA));
        return this.reqY;
    }

    get requestAngle(){
        return this.power;
    }
}