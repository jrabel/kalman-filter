class Car {
    constructor(xi, yi, width, height) {
        this.state = {
            x: xi,
            y: yi,
            theta: 0,
            dx: 0,
            dy: 0,
            dtheta: 0
        };

        this.drState = {
            x: xi,
            y: yi,
            theta: 0,
            dx: 0,
            dy: 0,
            dtheta: 0
        };

        this.stateError = 0.1;

        this.throttle = 0;
        this.throttleMax = 10;
        this.throttleGrowth = 0.1;
        this.throttleDecay = 0.3;

        this.steerAngle = 0;
        this.steerOmega = Math.PI / 200;
        this.steerAngleMax = Math.PI / 4;

        this.width = width;
        this.height = height;

        this.dt = 0.1;

        this.wheelWidth = this.width / 5;
        this.wheelHeight = this.height / 4;
    }

    update() {

        var throttleWithError = this.throttle + (this.stateError * (2 * Math.random() - 1));
        var steerAngleWithError = this.steerAngle + (this.stateError * (2 * Math.random() - 1));

        this.state.dx = throttleWithError * Math.sin(this.state.theta);
        this.state.dy = throttleWithError * Math.cos(this.state.theta);
        this.state.dtheta = -(throttleWithError / this.height) * Math.tan(steerAngleWithError);

        this.state.x += this.state.dx * this.dt;
        this.state.y += this.state.dy * this.dt;
        this.state.theta += this.state.dtheta * this.dt;

        this.drState.dx = this.throttle * Math.sin(this.drState.theta);
        this.drState.dy = this.throttle * Math.cos(this.drState.theta);
        this.drState.dtheta = -(this.throttle / this.height) * Math.tan(this.steerAngle);

        this.drState.x += this.drState.dx * this.dt;
        this.drState.y += this.drState.dy * this.dt;
        this.drState.theta += this.drState.dtheta * this.dt;

        console.log(this.state);
        console.log(this.drState);
        console.log();
    }

    feedControls(steer, gas) {
        if ((steer > 0 && (this.steerAngle < this.steerAngleMax)) ||
            (steer < 0 && (this.steerAngle > -this.steerAngleMax)))
            this.steerAngle += steer * this.steerOmega;

        if ((gas > 0) && (this.throttle < this.throttleMax) ||
            (gas < 0) && (this.throttle > -this.throttleMax))
            this.throttle += gas * this.throttleGrowth;

        else if (gas == 0) {
            if (this.throttle > 0)
                this.throttle -= this.throttleDecay;
            else if (this.throttle < 0)
                this.throttle += this.throttleDecay;
        }
    }

    draw(ctx) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;

        ctx.save();

        // body
        ctx.translate(this.state.x, this.state.y);
        ctx.rotate(-this.state.theta);
        ctx.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
        // ctx.restore();

        // front wheels
        ctx.save();
        ctx.translate((this.width / 2), (this.height / 2));
        ctx.rotate(this.steerAngle);
        ctx.strokeRect(-(this.wheelWidth / 2), -(this.wheelHeight / 2), this.wheelWidth, this.wheelHeight);
        ctx.restore();

        ctx.save();
        ctx.translate(-(this.width / 2), (this.height / 2));
        ctx.rotate(this.steerAngle);
        ctx.strokeRect(-(this.wheelWidth / 2), -(this.wheelHeight / 2), this.wheelWidth, this.wheelHeight);
        ctx.restore();

        // back wheels
        ctx.strokeRect(-(this.width / 2) - (this.wheelWidth / 2), -(this.height / 2) - (this.wheelHeight / 2),
            this.wheelWidth, this.wheelHeight);
        ctx.strokeRect((this.width / 2) - (this.wheelWidth / 2), -(this.height / 2) - (this.wheelHeight / 2),
            this.wheelWidth, this.wheelHeight);

        ctx.restore();
    }

    drawDR(ctx) {
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 1;

        ctx.save();

        // body
        ctx.translate(this.drState.x, this.drState.y);
        ctx.rotate(-this.drState.theta);
        ctx.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);

        // front wheels
        ctx.save();
        ctx.translate((this.width / 2), (this.height / 2));
        ctx.rotate(this.steerAngle);
        ctx.strokeRect(-(this.wheelWidth / 2), -(this.wheelHeight / 2), this.wheelWidth, this.wheelHeight);
        ctx.restore();

        ctx.save();
        ctx.translate(-(this.width / 2), (this.height / 2));
        ctx.rotate(this.steerAngle);
        ctx.strokeRect(-(this.wheelWidth / 2), -(this.wheelHeight / 2), this.wheelWidth, this.wheelHeight);
        ctx.restore();

        // back wheels
        ctx.strokeRect(-(this.width / 2) - (this.wheelWidth / 2), -(this.height / 2) - (this.wheelHeight / 2),
            this.wheelWidth, this.wheelHeight);
        ctx.strokeRect((this.width / 2) - (this.wheelWidth / 2), -(this.height / 2) - (this.wheelHeight / 2),
            this.wheelWidth, this.wheelHeight);

        ctx.restore();


    }
}