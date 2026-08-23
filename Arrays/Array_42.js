// LeetCode 42
// Trapping Rain Water
// Difficulty: Hard
// Tags: Array, Two Pointers, Prefix Sum

/*
LeetCode 42 - Trapping Rain Water

Pattern:
Prefix Maximum / Suffix Maximum

Approach:
1. Create a leftMax array.
2. Store the maximum height seen from the left at every index.
3. Create a rightMax array.
4. Store the maximum height seen from the right at every index.
5. For every index:
   - Find the smaller of leftMax[i] and rightMax[i].
   - Subtract the current height.
   - Add the result to ans.
6. Return the total trapped water.

Formula:

water[i] = Math.min(leftMax[i], rightMax[i]) - height[i]

Example:
[0,1,0,2,1,0,1,3,2,1,2,1] -> 6

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I used two extra arrays:
- leftMax -> stores the maximum height from the left.
- rightMax -> stores the maximum height from the right.

Then I calculate the water trapped at each index using the
minimum of the two maximum heights.
*/

var trap = function(height) {

    let ans = 0

    // Array to store maximum height from the left
    let leftMax = new Array(height.length)
    leftMax[0] = height[0]

    let left = height[0]

    // Array to store maximum height from the right
    let rightMax = new Array(height.length)
    rightMax[height.length - 1] = height[height.length - 1]

    let right = height[height.length - 1]


    // Build leftMax array
    for(let i = 1; i < height.length; i++) {

        if(left < height[i]) {
            leftMax[i] = height[i]
            left = height[i]
        }
        else {
            leftMax[i] = left
        }
    }


    // Build rightMax array
    for(let i = height.length - 2; i >= 0; i--) {

        if(right < height[i]) {
            rightMax[i] = height[i]
            right = height[i]
        }
        else {
            rightMax[i] = right
        }
    }


    // Calculate trapped water
    for(let i = 0; i < height.length; i++) {

        ans = ans + Math.min(leftMax[i], rightMax[i]) - height[i]
    }


    return ans
};


// Test Case

console.log(
    trap([0,1,0,2,1,0,1,3,2,1,2,1])
)

// Output: 6