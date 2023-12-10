//используем функиональный вариант создания класс

function ball(x, y, color, r, vx, vy, number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.r = r;
    this.number = number;
    this.vx = vx;
    this.vy = vy;
    this.v = Math.sqrt(vx * vx + vy * vy)
    this.angle = Math.asin(this.vy / this.v)


    this.draw = (ctx) => {
        var ctx = canvas_example.getContext('2d')

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
    }


    this.away = (w, h) => {
        if (this.x + this.r >= w) {
            DT = (this.x + this.r - w) / (this.vx)
            this.x -= this.vx * DT
            this.vx = -this.vx


        }
        if (this.x - this.r <= 0) {
            DTT = (this.x - this.r) / (this.vx)
            this.x -= this.vx * DTT

            this.vx = -this.vx
        }
        if (this.y - this.r <= 0) {
            DTTT = (this.y + this.r) / (this.vy)
            this.y += this.vy * DTTT

            this.vy = -this.vy

        }
        if (this.y + this.r >= h) {
            DTTT = (this.y + this.r - h) / (this.vy)
            this.y -= this.vy * DTTT

            this.vy = -this.vy
        }
    }


}