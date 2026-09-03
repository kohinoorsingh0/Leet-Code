// LeetCode 238
// Product of Array Except Self
// Difficulty: Medium
// Tags: Array, Prefix Product, Zero Handling

/*

Pattern:
Total Product + Zero Count

Approach:
1. Count the number of zeros in the array.
2. Calculate the product of all non-zero elements.
3. Traverse the array again.
4. If there are 2 or more zeros:
   - Every answer will be 0.
5. If there is exactly 1 zero:
   - The position containing 0 gets the product of all
     non-zero elements.
   - Every other position gets 0.
6. If there are no zeros:
   - For each element, divide the total product by
     the current element.
7. Return the answer array.

Example:
[1,2,3,4] -> [24,12,8,6]
[1,2,0,4] -> [0,0,8,0]
[0,0,3] -> [0,0,0]

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I first counted the zeros and calculated the product of
all non-zero elements.

Then I handled three cases:
- 2 or more zeros -> every answer is 0.
- Exactly 1 zero -> only the zero's position gets the
  product of all non-zero elements.
- No zeros -> divide the total product by each element.

This allows me to solve the problem without using nested
loops.
*/

// Solution

var productExceptSelf = function (nums) {

    let zeroCount = 0
    let ans = new Array(nums.length)
    let product = 1

    for(let i = 0; i < nums.length; i++){

        if(nums[i] === 0){
            zeroCount++
        }
        else{
            product *= nums[i]
        }
    }

    for(let i = 0; i < nums.length; i++){

        // If there are 2 or more zeros
        if(zeroCount >= 2){
            ans[i] = 0
        }

        // If there is exactly 1 zero
        else if(zeroCount === 1){
            ans[i] = 0

            if(nums[i] === 0){
                ans[i] = product
            }
        }

        // If there are no zeros
        else{
            ans[i] = product / nums[i]
        }
    }

    return ans
};


// Test Cases

console.log(productExceptSelf([1,2,3,4]))
// Output: [24,12,8,6]

console.log(productExceptSelf([-1,1,0,-3,3]))
// Output: [0,0,-9,0,0]

console.log(productExceptSelf([1,2,0,4]))
// Output: [0,0,8,0]

console.log(productExceptSelf([0,0,3]))
// Output: [0,0,0]

console.log(productExceptSelf([5]))
// Output: [1]