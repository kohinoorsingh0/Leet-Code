// LeetCode 414
// Third Maximum Number
// Difficulty: Easy
// Tags: Array, Sorting, Three Pointers

/*

Pattern:
Track Three Distinct Maximum Values

Approach:
1. Use three variables:
   - first -> largest number.
   - second -> second largest distinct number.
   - third -> third largest distinct number.
2. Initialize `second` and `third` with `-Infinity`.
3. Skip the current number if it is already equal to
   `first`, `second`, or `third`.
4. If the current number is greater than `first`:
   - Move `second` to `third`.
   - Move `first` to `second`.
   - Store the current number in `first`.
5. Else if the current number is greater than `second`:
   - Move `second` to `third`.
   - Store the current number in `second`.
6. Else if the current number is greater than `third`:
   - Store the current number in `third`.
7. If there is no third distinct maximum, return `first`.
8. Otherwise, return `third`.

Example:
[3,2,1] -> 1
[1,2] -> 2
[2,2,2] -> 2
[2,2,3,1] -> 1

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used three variables to keep track of the three largest
distinct numbers while traversing the array only once.

I skip duplicate values so that `first`, `second`, and `third`
always represent distinct maximum values.

If a third distinct maximum does not exist, I return the
largest number instead.
*/

// Solution

var thirdMax = function (nums) {

    let first = nums[0]
    let second = -Infinity
    let third = -Infinity
    let n = nums.length

    for(let i = 1; i < n; i++){

        // Skip duplicate values
        if(nums[i] === first || nums[i] === second || nums[i] === third){
            continue
        }

        // Current number becomes the largest
        else if(nums[i] > first){
            third = second
            second = first
            first = nums[i]
        }

        // Current number becomes the second largest
        else if(nums[i] > second){
            third = second
            second = nums[i]
        }

        // Current number becomes the third largest
        else if(nums[i] > third){
            third = nums[i]
        }
    }

    // If there is no third distinct maximum
    if(third === -Infinity){
        return first
    }
    else{
        return third
    }
};


// Test Cases

console.log(thirdMax([3,2,1]))
// Output: 1

console.log(thirdMax([1,2]))
// Output: 2

console.log(thirdMax([2,2,2]))
// Output: 2

console.log(thirdMax([2,2,3,1]))
// Output: 1

console.log(thirdMax([1,2,3,4,5]))
// Output: 3