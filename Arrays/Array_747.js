// LeetCode 747
// Largest Number At Least Twice of Others
// Difficulty: Easy
// Tags: Array, Maximum, Two Pass

/*

Pattern:
Find Maximum + Check Twice Condition

Approach:
1. Find the maximum element in the array.
2. Find the index of the maximum element.
3. Traverse the array again.
4. Skip the maximum element itself.
5. For every other element, check:
   max >= nums[i] * 2
6. If any element fails this condition, return -1.
7. If every element satisfies the condition, return
   the index of the maximum element.

Example:
[3,6,1,0] -> 1
[1,2,3,4] -> -1
[1,0,0,0] -> 0

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I first found the maximum element and its index.
Then I checked every other element to make sure the maximum
is at least twice as large as that element.

I used a `checker` variable to track whether all elements
satisfy the condition. If even one element fails, I break
the loop and return -1.
*/

// Solution

var dominantIndex = function(nums) {

    let max = nums[0]
    let checker = false

    for(let i = 1; i < nums.length; i++){
        if(max < nums[i]){
            max = nums[i]
        }
    }

    let maxIndex = nums.indexOf(max)

    for(let i = 0; i < nums.length; i++){

        if(max === nums[i]){
            continue
        }

        else if(max >= nums[i] * 2){
            checker = true
        }

        else{
            checker = false
            break
        }
    }

    if(checker === true){
        return maxIndex
    }
    else{
        return -1
    }
};


// Test Cases

console.log(dominantIndex([3,6,1,0]))
// Output: 1

console.log(dominantIndex([1,2,3,4]))
// Output: -1

console.log(dominantIndex([1,0,0,0]))
// Output: 0

console.log(dominantIndex([0,0,0,1]))
// Output: 3