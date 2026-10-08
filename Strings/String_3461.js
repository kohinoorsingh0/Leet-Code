// LeetCode 3461
// Check If Digits Are Equal in String After Operations
// Difficulty: Easy
// Tags: String, Array, Simulation

/*

Pattern:
Simulation + Adjacent Digit Calculation

Approach:
1. Convert the string `s` into an array of numbers using
   `Array.from(s, Number)`.
2. Continue the process while the array contains more than
   two digits.
3. Create a new array `ans` for the next round.
4. Traverse adjacent pairs of digits.
5. Add each pair and take `% 10` to get the new digit.
6. Replace `arr` with the newly created array.
7. When only two digits remain, compare them.
8. Return true if they are equal, otherwise return false.

Example:
s = "3902"

First operation:
3 + 9 = 12 -> 2
9 + 0 = 9  -> 9
0 + 2 = 2  -> 2

arr = [2, 9, 2]

Second operation:
2 + 9 = 11 -> 1
9 + 2 = 11 -> 1

arr = [1, 1]

Since both digits are equal:

Output:
true

Time Complexity: O(n²)
Space Complexity: O(n)

My Approach:
I first converted the string into an array of numbers.

While there were more than two digits, I created a new array
and calculated every adjacent pair using `(arr[i] + arr[i + 1]) % 10`.

After each round, I replaced `arr` with the newly generated
array.

When only two digits remained, I compared them and returned
true if they were equal.
*/

// Solution

var hasSameDigits = function(s) {

    let arr = Array.from(s, Number)

    while(arr.length > 2){

        let ans = []

        for(let i = 0; i < arr.length - 1; i++){

            let digit = (arr[i] + arr[i + 1]) % 10

            ans.push(digit)
        }

        arr = ans
    }

    if(arr[0] === arr[1]){
        return true
    }
    else{
        return false
    }

};

// Test Cases

console.log(hasSameDigits("3902"))
// Output: true

console.log(hasSameDigits("34789"))
// Output: false

console.log(hasSameDigits("00"))
// Output: true

console.log(hasSameDigits("11"))
// Output: true

console.log(hasSameDigits("12"))
// Output: false