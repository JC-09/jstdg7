class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance = () => Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

let point = new Point(3, 4);
console.log(point.distance())