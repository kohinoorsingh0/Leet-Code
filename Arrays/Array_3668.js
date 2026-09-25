// LeetCode 3668
// Restore Finishing Order
// Difficulty: Easy
// Tags: Array, Nested Loop

/*

Pattern:
Order Preservation + Array Matching

Approach:
1. Create an answer array with the same length as `friends`.
2. Traverse the `order` array from left to right.
3. For every element in `order`, check every element in `friends`.
4. If a match is found, add that friend ID to `ans`.
5. Return `ans`.

Example:
order = [3, 1, 2, 5, 4]
friends = [1, 3, 4]

Traverse `order`:
- 3 -> friend -> add 3
- 1 -> friend -> add 1
- 2 -> not a friend
- 5 -> not a friend
- 4 -> friend -> add 4

Output:
[3, 1, 4]

Time Complexity: O(n * m)
Space Complexity: O(m)

My Approach:
I created an answer array with the same size as `friends`.

I traversed the `order` array and, for every element,
checked whether it existed in the `friends` array.

Whenever a match was found, I stored that element in `ans`.
Since I traverse `order` from left to right, the elements
are automatically stored in their finishing order.

Finally, I returned `ans`.
*/

// Solution

var recoverOrder = function(order, friends) {

    let ans = new Array(friends.length)
    let k = 0

    for(let i = 0; i < order.length; i++) {

        for(let j = 0; j < friends.length; j++) {

            if(order[i] === friends[j]) {
                ans[k++] = order[i]
            }

        }

    }

    return ans
};

// Test Cases

console.log(recoverOrder([3, 1, 2, 5, 4], [1, 3, 4]))
// Output: [3, 1, 4]

console.log(recoverOrder([1, 4, 5, 3, 2], [2, 5]))
// Output: [5, 2]

console.log(recoverOrder([5, 3, 1, 2, 4], [1, 4]))
// Output: [3, 1, 4]  // WRONG - see note below