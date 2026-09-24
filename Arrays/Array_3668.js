// LeetCode 3427
// Recover Order
// Difficulty: Easy
// Tags: Array, Nested Loop

/*

Pattern:
Order Preservation + Array Matching

Approach:
1. Create an answer array with the same length as `friends`.
2. Traverse the `order` array.
3. For every element in `order`, traverse the `friends` array.
4. If the current element exists in `friends`, add it to `ans`.
5. Return `ans`.

Example:
order = [1, 4, 5, 3, 2]
friends = [2, 5]

Traverse `order`:
- 1 -> not a friend
- 4 -> not a friend
- 5 -> friend -> add 5
- 3 -> not a friend
- 2 -> friend -> add 2

Output:
[5, 2]

Time Complexity: O(n * m)
Space Complexity: O(m)

My Approach:
I created an answer array with the same size as `friends`.

I traversed the `order` array and, for every element, checked
whether it existed in the `friends` array.

Whenever a match was found, I stored that element in `ans`.
This keeps the same order as the original `order` array.

Finally, I returned `ans`.
*/

// Solution

var recoverOrder = function(order, friends) {

    let ans = new Array(friends.length)
    let k = 0

    for(let i = 0; i < order.length; i++){

        for(let j = 0; j < friends.length; j++){

            if(order[i] === friends[j]){
                ans[k++] = order[i]
            }

        }

    }

    return ans
};

// Test Cases

console.log(recoverOrder([1, 4, 5, 3, 2], [2, 5]))
// Output: [5, 2]

console.log(recoverOrder([5, 3, 1, 2, 4], [1, 4]))
// Output: [1, 4]

console.log(recoverOrder([2, 1, 3, 4], [4, 2]))
// Output: [2, 4]

console.log(recoverOrder([1, 2, 3], [1, 2, 3]))
// Output: [1, 2, 3]

console.log(recoverOrder([1, 2, 3], [3]))
// Output: [3]