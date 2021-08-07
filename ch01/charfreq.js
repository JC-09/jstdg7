/**
 * This Node program reads text from standard input, computes the frequency
 * of each letter in that text, and displays a histogram of the most
 * frequently used characters. It requires Node 12 or higher to run.
 *
 * In a Unix-type environment you can invoke the program like this:
 *    node charfreq.js < corpus.txt
 */

// This class extends Map so that the get() method returns the specified
// value instead of null when the key is not in the map
class DefaultMap extends Map {
    constructor(defaultValue) {
        super();                          // Invoke superclass constructor
        this.defaultValue = defaultValue; // Remember the default value
    }

    get(key) {
        if (this.has(key)) {              // If the key is already in the map
            return super.get(key);        // return its value from superclass.
        }
        else {
            return this.defaultValue;     // Otherwise return the default value  /*super.get() = get(key: K): V | undefined; */
        }
    }
}

// This class computes and displays letter frequency histograms
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0);  // Map from letters to counts
        this.totalLetters = 0;                  // How many letters in all
    }

    // This function updates the histogram with the letters of text.
    add(text) {
        // Remove whitespace from the text, and convert to upper case
        text = text.replace(/\s/g, "").toUpperCase();  /* /\s/g is all kind of space */

        // Now loop through the characters of the text
        for(let character of text) {
            let count = this.letterCounts.get(character); // Get old count
            this.letterCounts.set(character, count+1);    // Increment it
            this.totalLetters++;  // Increment the total letters to be used for percentage calcualtion later.
        }
    }

    // Convert the histogram to a string that displays an ASCII graphic
    toString() {
        // Convert the Map to an array of [key,value] arrays
        
        let entries = [...this.letterCounts];  // The ... operator spreads the letterCounts DefaultMap out
        /** entries = 
            [
             [ '/', 81 ],  [ '*', 14 ],  [ 'T', 305 ], [ 'H', 107 ],
            [ 'I', 126 ], [ 'S', 176 ], [ 'N', 160 ], [ 'O', 150 ],
            [ 'D', 64 ],  [ 'E', 287 ], [ 'P', 49 ],  [ 'R', 183 ],
            [ 'G', 44 ],  [ 'A', 163 ], [ 'M', 55 ],  [ 'X', 16 ],
            [ 'F', 57 ],  [ 'U', 85 ],  [ ',', 15 ],  [ 'C', 92 ],
            [ 'Q', 5 ],   [ 'Y', 38 ],  [ 'L', 92 ],  [ '.', 52 ],
            [ '1', 14 ],  [ '2', 2 ],   [ '-', 5 ],   [ 'V', 19 ],
            [ 'K', 17 ],  [ ':', 5 ],   [ 'J', 4 ],   [ '<', 2 ],
            [ '(', 40 ],  [ ')', 40 ],  [ 'W', 12 ],  [ '{', 20 ],
            [ ';', 27 ],  [ '=', 20 ],  [ 'B', 15 ],  [ '}', 20 ],
            [ '|', 1 ],   [ '0', 6 ],   [ '\\', 3 ],  [ '"', 8 ],
            [ '+', 3 ],   [ '[', 13 ],  [ ']', 13 ],  [ '>', 5 ],
            [ '?', 1 ],   [ '%', 2 ],   [ '`', 2 ],   [ '$', 3 ],
            [ '#', 1 ],   [ '8', 1 ]
            ]
         */

        // Sort the array by count, then alphabetically
        entries.sort((a,b) => {              // A function to define sort order.
            if (a[1] === b[1]) {             // If the counts are the same
                return a[0] < b[0] ? -1 : 1; // sort alphabetically.
            } else {                         // If the counts differ
                return b[1] - a[1];          // sort by largest count.
            }
        });

        // Convert the counts to percentages
        for(let entry of entries) {
            entry[1] = entry[1] / this.totalLetters*100;
        }

        // Drop any entries less than 1%
        entries = entries.filter(entry => entry[1] >= 1);

        // Now convert each entry to a line of text
        let lines = entries.map(
            ([l,n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );

        // And return the concatenated lines, separated by newline characters.
        return lines.join("\n");
    }
}

// This async (Promise-returning) function creates a Histogram object,  
// asynchronously reads chunks of text from standard input, and adds those chunks to
// the histogram. When it reaches the end of the stream, it returns this histogram
async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8"); // Read Unicode strings, not bytes
    let histogram = new Histogram();
    
    for await (let chunk of process.stdin) {// each chunk is a file passed in through stdin
        histogram.add(chunk);
    }
    return histogram;
}

// This one final line of code is the main body of the program.
// It makes a Histogram object from standard input, then prints the histogram.
histogramFromStdin().then(histogram => { console.log(histogram.toString()); });

