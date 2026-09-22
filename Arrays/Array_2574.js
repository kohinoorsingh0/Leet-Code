// LeetCode 2574
// Left and Right Sum Differences
// Difficulty: Easy
// Tags: Array, Prefix Sum, Suffix Sum

/*

Pattern:
Left Sum + Right Sum

Approach:
1. Create three arrays:
   - `left` -> stores the sum of elements to the left.
   - `right` -> stores the sum of elements to the right.
   - `ans` -> stores the final differences.
2. Traverse the array from left to right and calculate the
   left sum for every index.
3. Traverse the array from right to left and calculate the
   right sum for every index.
4. Traverse the `left` and `right` arrays.
5. Calculate the absolute difference between `left[i]`
   and `right[i]`.
6. Store the result in `ans` and return it.

Example:
nums = [10, 4, 8, 3]

left  = [0, 10, 14, 22]
right = [15, 11, 3, 0]

Difference:
[15, 1, 11, 22]

Output:
[15, 1, 11, 22]

Time Complexity: O(n²)
Space Complexity: O(n)

My Approach:
I created separate `left` and `right` arrays.

For the `left` array, I traversed from left to right and
calculated the sum of all elements before the current index.

For the `right` array, I traversed from right to left and
calculated the sum of all elements after the current index.

Finally, I traversed both arrays and calculated the absolute
difference between the corresponding left and right sums.
*/

// Solution

var leftRightDifference = function(nums) {

    let left = new Array()
    let right = new Array()
    let ans = new Array()

    for(let i = 0; i < nums.length; i++){

        let sum = 0

        if(i === 0){
            sum = 0
        }
        else{
            for(let j = i - 1; j >= 0; j--){
                sum += nums[j]
            }
        }

        left[i] = sum
    }

    for(let i = nums.length - 1; i >= 0; i--){

        let sum = 0

        if(i === nums.length - 1){
            sum = 0
        }
        else{
            for(let j = i + 1; j < nums.length; j++){
                sum += nums[j]
            }
        }

        right[i] = sum
    }

    for(let i = 0; i < left.length; i++){
        ans[i] = Math.abs(left[i] - right[i])
    }

    return ans
};

// Test Cases

console.log(leftRightDifference([10, 4, 8, 3]))
// Output: [15, 1, 11, 22]

console.log(leftRightDifference([1]))
// Output: [0]

console.log(leftRightDifference([1, 2, 3, 4, 5]))
// Output: [14, 11, 6, 1, 10]

console.log(leftRightDifference([5, 5]))
// Output: [5, 5]

console.log(leftRightDifference([1, 2]))
// Output: [2, 1]