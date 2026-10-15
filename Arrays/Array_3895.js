// LeetCode 3895
// Count Digit Occurrences
// Difficulty: Easy
// Tags: Array, String, Counting

/*

Pattern:
Array to String + Digit Counting

Approach:
1. Join all elements of `nums` into a single string using
   `join("")`.
2. Split the resulting string into individual characters.
3. Initialize `count` to 0.
4. Traverse every character in the array.
5. Convert each character into a number using `Number()`.
6. If the number equals `digit`, increment `count`.
7. Return the total count.

Example:
nums = [12, 54, 32, 22]
digit = 2

After joining:
"12543222"

Occurrences of digit 2:
- 12 -> one occurrence
- 32 -> one occurrence
- 22 -> two occurrences

Output:
4

Time Complexity: O(n * d)
Space Complexity: O(n * d)

Where:
n = Number of elements in `nums`
d = Maximum number of digits in an element

My Approach:
I converted the entire `nums` array into a string using
`join("")` and split it into individual characters.

Then, I traversed the characters and converted each one
into a number.

Whenever a digit matched the given `digit`, I increased
`count`.

Finally, I returned the total number of occurrences.
*/

// Solution

var countDigitOccurrences = function(nums, digit) {

    let arr = nums.join("").split("")
    let count = 0

    for(let i = 0; i < arr.length; i++){

        if(Number(arr[i]) === digit){
            count++
        }

    }

    return count
};

// Test Cases

console.log(countDigitOccurrences([12, 54, 32, 22], 2))
// Output: 4

console.log(countDigitOccurrences([1, 2, 3, 4, 5], 3))
// Output: 1

console.log(countDigitOccurrences([11, 22, 33, 44], 1))
// Output: 2

console.log(countDigitOccurrences([100, 200, 300], 0))
// Output: 6

console.log(countDigitOccurrences([123, 456, 789], 5))
// Output: 1