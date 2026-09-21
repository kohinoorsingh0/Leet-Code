// LeetCode 2011
// Final Value of Variable After Performing Operations
// Difficulty: Easy
// Tags: Array, String, Simulation

/*

Pattern:
Simulation + Conditional Checking

Approach:
1. Initialize `sum` to 0.
2. Traverse every operation in the array.
3. If the operation is `"X++"` or `"++X"`, increase `sum` by 1.
4. Otherwise, decrease `sum` by 1.
5. Return the final value of `sum`.

Example:
operations = ["--X", "X++", "X++"]

- "--X" -> sum = -1
- "X++" -> sum = 0
- "X++" -> sum = 1

Output:
1

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I initialized `sum` to 0 and traversed the operations array.

For each operation, I checked whether it was an increment
operation or a decrement operation.

If it was `"X++"` or `"++X"`, I added 1 to `sum`.
Otherwise, I subtracted 1 from `sum`.

Finally, I returned the final value of `sum`.
*/

// Solution

var finalValueAfterOperations = function(operations) {

    let sum = 0

    for(let i = 0; i < operations.length; i++){

        if(operations[i] === "X++" || operations[i] === "++X"){
            sum += 1
        }
        else{
            sum -= 1
        }

    }

    return sum
};


// Test Cases

console.log(finalValueAfterOperations(["++X", "++X", "X++"]))
// Output: 3

console.log(finalValueAfterOperations(["--X", "X++", "X++"]))
// Output: 1

console.log(finalValueAfterOperations(["X++", "++X", "--X", "X--"]))
// Output: 0

console.log(finalValueAfterOperations(["--X", "X--"]))
// Output: -2

console.log(finalValueAfterOperations([]))
// Output: 0