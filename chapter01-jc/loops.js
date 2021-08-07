let outputStr1 = "";
for (let i = 0; i < 11; i++) { // This for-loop prints numbers from 0 to 10
    outputStr1 = outputStr1.concat(i, " ");
}
console.log(outputStr1);


let outputStr2 = "";
var counter = 0;
while (true) {
    outputStr2 = outputStr2.concat(counter, " ");
    if (counter === 10) { break; };
    counter++;
}
console.log(outputStr2);