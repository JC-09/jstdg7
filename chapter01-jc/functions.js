function plus1(x) { return x + 1; };

let y = 1;

console.log(plus1(y));

const arrowPlus1 = (x) => {  // This is an arrow function
    return x + 1;
};
console.log(arrowPlus1(y));

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance = () => Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

let point = new Point(3, 4);
console.log(point.distance())