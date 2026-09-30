// LeetCode 3731
// Find Missing Elements
// Difficulty: Easy
// Tags: Array, Sorting, Simulation

/*

Pattern:
Sorting + Finding Missing Numbers

Approach:
1. Sort the `nums` array in ascending order.
2. Create an empty array `ans` to store the missing elements.
3. Initialize `k` to the smallest element plus 1.
4. Traverse the sorted array starting from index 1.
5. While `k` is smaller than the current element:
   - Add `k` to the answer array.
   - Increment `k`.
6. After processing the missing elements, increment `k`
   to move past the current element.
7. Return `ans`.

Example:
nums = [1, 4, 2, 5]

After sorting:
[1, 2, 4, 5]

Minimum = 1
Maximum = 5

Numbers between minimum and maximum:
1, 2, 3, 4, 5

Missing element:
3

Output:
[3]

Time Complexity: O(n log n + R)
Space Complexity: O(R)

Where:
n = Number of elements in the array.
R = Difference between maximum and minimum elements.

My Approach:
I first sorted the array in ascending order.

Then, I initialized `k` to the smallest element plus 1.

I traversed the sorted array and checked whether there were
any missing numbers before the current element.

Whenever `k` was smaller than the current element, I added
it to the answer array and incremented `k`.

After checking each element, I incremented `k` to continue
checking the next expected number.

Finally, I returned the array containing all missing elements.
*/

// Solution

var findMissingElements = function(nums) {

    nums.sort((a, b) => {
        return a - b
    })

    let ans = new Array()

    let min = nums[0]

    let k = min + 1
    let j = 0

    for(let i = 1; i < nums.length; i++){

        while(k < nums[i]){
            ans[j++] = k++
        }

        k++
    }

    return ans
};


// Test Cases

console.log(findMissingElements([1, 4, 2, 5]))
// Output: [3]

console.log(findMissingElements([1, 3, 5]))
// Output: [2, 4]

console.log(findMissingElements([1, 2, 3, 4]))
// Output: []

console.log(findMissingElements([5, 1]))
// Output: [2, 3, 4]

console.log(findMissingElements([10, 13, 15]))
// Output: [11, 12, 14]

console.log(findMissingElements([7]))
// Output: []