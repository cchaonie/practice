const { SyncHook, AsyncParallelHook } = require("tapable");
const RoutesList = require("./routesList");

module.exports = class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]),
            brake: new SyncHook(),
            calculateRoutes: new AsyncParallelHook([
                "source",
                "target",
                "routeList",
            ]),
        };
    }

    startBrake() {
        console.log("start brake ......");
        this.hooks.brake.call();
    }

    setSpeed(newSpeed) {
        this.hooks.accelerate.call(newSpeed);
    }

    useNaviagationSystemPromise(source, target) {
        const routesList = new RoutesList();
        return this.hooks.accelerate
            .promise(source, target, routesList)
            .then(res => routesList.getRoutes());
    }

    useNaviagationSystemAsync(source, target, callback) {
        const routesList = new RoutesList();
        this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
            if (err) return callback(err);
            callback(null, routesList.getRoutes());
        });
    }
};
