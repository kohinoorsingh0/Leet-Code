// LeetCode 1672
// Richest Customer Wealth
// Difficulty: Easy
// Tags: Array, Matrix, Traversal

/*

Pattern:
Nested Loop + Maximum Sum

Approach:
1. Initialize `sum` to 0 and `max` to 0.
2. Traverse each customer's account array.
3. Calculate the total wealth of the current customer.
4. Compare the current customer's wealth with `max`.
5. If the current wealth is greater, update `max`.
6. Return `max`.

Example:
accounts = [
    [1, 5],
    [7, 3],
    [3, 5]
]

Customer 1:
1 + 5 = 6

Customer 2:
7 + 3 = 10

Customer 3:
3 + 5 = 8

Maximum wealth = 10

Output:
10

Time Complexity: O(m * n)
Space Complexity: O(1)

My Approach:
I used nested loops to calculate the total wealth of every
customer.

For each customer, I added all the values in their account
array and stored the result in `sum`.

Then, I compared `sum` with `max` and updated `max` whenever
the current customer's wealth was greater.

Finally, I returned `max`.
*/

// Solution

var maximumWealth = function(accounts) {

    let sum = 0
    let max = 0

    for(let i = 0; i < accounts.length; i++){

        sum = 0

        for(let j = 0; j < accounts[i].length; j++){
            sum += accounts[i][j]
        }

        if(sum > max){
            max = sum
        }

    }

    return max
};

// Test Cases

console.log(maximumWealth([
    [1, 5],
    [7, 3],
    [3, 5]
]))
// Output: 10

console.log(maximumWealth([
    [1, 2, 3],
    [3, 2, 1]
]))
// Output: 6

console.log(maximumWealth([
    [1, 5],
    [7, 3],
    [3, 5]
]))
// Output: 10

console.log(maximumWealth([
    [10],
    [20],
    [30]
]))
// Output: 30

console.log(maximumWealth([
    [1, 1],
    [1, 1]
]))
// Output: 2