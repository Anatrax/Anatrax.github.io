let frontRight;
let frontLeft;
let backLeft;
let backRight;

function start(){
  frontRight = new DcMotor(0);
  frontLeft = new DcMotor(1);
  backLeft = new DcMotor(2);
  backRight = new DcMotor(3);
}

function loop(){
  let FR = 0;
  let FL = 0;
  let BL = 0;
  let BR = 0;
  let FBmove = gamepad1.left_stick_y;
  let LRmove = gamepad1.left_stick_x;
  let LRslide = gamepad1.right_stick_x;
  
  FR = FBmove; // forward & backwards
  FL = -FBmove;
  BR = FBmove;
  BL = -FBmove;
  
  if (Math.abs(LRslide) > Math.abs(LRmove)) { // slide left & right
    FR += -LRslide;
    FL += -LRslide;
    BR += LRslide;
    BL += LRslide;
  }
  
  if (Math.abs(LRmove) > Math.abs(LRslide)) { // turn & rotate
    FR -= LRmove/5;
    FL -= LRmove/5;
    BR -= LRmove/5;
    BL -= LRmove/5;
  }
  /*
  if(){
    FR =; //pivoting around front & back
    FL =;
    BR =;
    BL =;
  }
  */
  if(gamepad1.dpad_up && gamepad1.dpad_left) { // pivoting movements
    FR = 0;
    FL = 0;
    BR = -1;
    BL = -1;
  } else if (gamepad1.dpad_up && gamepad1.dpad_right) {
    FR = 0;
    FL = 0;
    BR = 1;
    BL = 1;
  } else if (gamepad1.dpad_down && gamepad1.dpad_right) {
    FR = 1;
    FL = 1;
    BR = 0;
    BL = 0;
  } else if (gamepad1.dpad_down && gamepad1.dpad_right) {
    FR = -1;
    FL = -1;
    BR = 0;
    BL = 0;
  }
  
  FR = clip(FR, -1, 1); // trim values
  FL = clip(FL, -1, 1);
  BR = clip(BR, -1, 1);
  BL = clip(BL, -1, 1);
  
  frontRight.setPower(FR); // Sends the final values to the motors
  frontLeft.setPower(FL);
  backRight.setPower(BR);
  backLeft.setPower(BL);
}

var clip = (variable, min, max) => {
  if(variable < min){
    variable = min;
  } else if(variable > max){
    variable = max;
  }
  return variable;
}