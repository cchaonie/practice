const Car = require("./models/car");
const { WarnLamp, WarnAccelerate } = require("./models/warning");

const warnLamp = new WarnLamp();
const warnAccelerate = new WarnAccelerate();
const myCar = new Car();

// console.log(myCar);

myCar.hooks.accelerate.tap("acceleratePlugin", speed =>
    warnAccelerate.on(speed)
);

myCar.hooks.brake.tap("warningLampPlugin", () => warnLamp.on());

myCar.setSpeed(100);

myCar.startBrake();
