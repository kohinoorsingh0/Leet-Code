// LeetCode 66
// Plus One
// Difficulty: Easy
// Tags: Array

/*
LeetCode 66 - Plus One

Pattern:
Array + Carry

Approach:
1. Start from the last digit.
2. If the digit is 9:
   - Make it 0.
   - Continue to the previous digit.
3. If the digit is not 9:
   - Add 1.
   - Stop the loop.
4. If every digit was 9, add 1 at the beginning.

Example:
[1,2,9] -> [1,3,0]
[9,9,9] -> [1,0,0,0]

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used a count variable to check whether all digits were 9.
*/

var plusOne = function(digits) {

    let count = 0

    // Start from the last digit
    for(let i = digits.length - 1; i >= 0; i--) {

        // If digit is 9, it becomes 0 and carry continues
        if(digits[i] === 9) {
            digits[i] = 0
            count++
            continue
        }

        // If digit is not 9, add 1 and stop
        else {
            digits[i] = digits[i] + 1
            break
        }
    }

    // If all digits were 9
    if(count === digits.length) {
        digits.unshift(1)
    }

    return digits
};


// Test Cases

console.log(plusOne([1,2,3]))
// Output: [1,2,4]

console.log(plusOne([1,2,9]))
// Output: [1,3,0]

console.log(plusOne([9,9,9]))
// Output: [1,0,0,0]