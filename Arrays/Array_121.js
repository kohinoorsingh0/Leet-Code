// LeetCode 121 - Best Time to Buy and Sell Stock
// Difficulty: Easy
// Topic: Array



/*
Problem:
Given an array of stock prices, find the maximum profit
by buying once and selling once.

Rules:
- Buy before selling.
- If no profit is possible, return 0.

Example:
Input:  [7, 1, 5, 3, 6, 4]
Output: 5

Buy at 1 and sell at 6.
Profit = 6 - 1 = 5
*/


var maxProfit = function (prices) {

    // Cheapest price seen so far
    let min = prices[0];

    // Maximum profit found so far
    let maxProfit = 0;

    // Traverse the array only once
    for (let i = 1; i < prices.length; i++) {

        let currentPrice = prices[i];

        // Update minimum buying price
        if (currentPrice < min) {
            min = currentPrice;
        }

        else {
            // Calculate profit if we sell today
            let profit = currentPrice - min;

            // Store the best profit
            if (profit > maxProfit) {
                maxProfit = profit;
            }
        }
    }

    return maxProfit;
};


// Example
console.log(maxProfit([7, 1, 5, 3, 6, 4]));


// Output:
// 5


// Time Complexity: O(n)
// Space Complexity: O(1)


// Key Learning:
// Instead of finding the global minimum and maximum,
// keep track of the minimum price seen so far and
// calculate the profit for every possible selling price.
//
// One loop is enough.