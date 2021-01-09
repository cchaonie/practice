exports.WarnLamp = class WarnLamp {
    on() {
        console.error("Warn warn warn: lamp is on......");
    }
}

exports.WarnAccelerate = class WarnAccelerate {
    on(speed) {
        console.error(`Warn warn warn: accelerating...... speed is ${speed} now`);
    }
}