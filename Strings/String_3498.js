// LeetCode 3498
// Reverse Degree of a String
// Difficulty: Easy
// Tags: String, Hash Table, Math

/*

Pattern:
Reverse Alphabet Value + Position Multiplication

Approach:
1. Create an object containing the reverse alphabetical value
   of every lowercase letter.
2. Initialize `sum` to 0.
3. Traverse the string from left to right.
4. Get the reverse alphabetical value of the current character.
5. Multiply the value by its 1-based position.
6. Add the result to `sum`.
7. Return the final sum.

Example:
s = "zaza"

Reverse alphabetical values:
z = 1
a = 26
z = 1
a = 26

Calculate:
1 * 1 + 26 * 2 + 1 * 3 + 26 * 4

= 1 + 52 + 3 + 104
= 160

Output:
160

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I created an object containing the reverse alphabetical
value of every lowercase letter, where `a = 26` and
`z = 1`.

Then, I traversed the string and multiplied the reverse
alphabetical value of each character by its 1-based index.

Finally, I added all the calculated values to `sum` and
returned it.
*/

// Solution

var reverseDegree = function(s) {

    let alphabets = {
        a: 26,
        b: 25,
        c: 24,
        d: 23,
        e: 22,
        f: 21,
        g: 20,
        h: 19,
        i: 18,
        j: 17,
        k: 16,
        l: 15,
        m: 14,
        n: 13,
        o: 12,
        p: 11,
        q: 10,
        r: 9,
        s: 8,
        t: 7,
        u: 6,
        v: 5,
        w: 4,
        x: 3,
        y: 2,
        z: 1
    }

    let sum = 0

    for(let i = 0; i < s.length; i++){

        let index = alphabets[s[i]]

        sum += index * (i + 1)

    }

    return sum
};

// Test Cases

console.log(reverseDegree("zaza"))
// Output: 160

console.log(reverseDegree("abc"))
// Output: 26 + 50 + 72 = 148

console.log(reverseDegree("a"))
// Output: 26

console.log(reverseDegree("z"))
// Output: 1

console.log(reverseDegree("abcde"))
// Output: 26 + 50 + 72 + 88 + 90 = 326