// LeetCode 888
// Fair Candy Swap
// Difficulty: Easy
// Tags: Array, Hash Set, Math

/*

Pattern:
Total Sum Difference + Hash Set

Approach:
1. Calculate the total number of candies Alice has.
2. Calculate the total number of candies Bob has.
3. Find the required difference using:
   difference = (bobTotal - aliceTotal) / 2
4. We need to find:
   bobCandy - aliceCandy = difference
5. Store Alice's candy sizes in a Set.
6. Traverse Bob's candy sizes and calculate the candy
   Alice needs to exchange.
7. If Alice has that candy, return the pair:
   [aliceCandy, bobCandy]

Example:
aliceSizes = [2]
bobSizes = [1,3]

Alice total = 2
Bob total = 4

difference = (4 - 2) / 2 = 1

Bob's candy = 3
Alice needs = 3 - 1 = 2

Output:
[2,3]

Time Complexity: O(n + m)
Space Complexity: O(n)

My Approach:
I first calculated the total candies of Alice and Bob.
Then I calculated how much more candy Bob has compared
to Alice and divided the difference by 2.

After that, I found a pair where:

bobCandy - aliceCandy = difference

My original approach used nested loops, which works but takes
O(n * m) time. A Set lets us find Alice's required candy in
O(1) average time, reducing the overall complexity.
*/

// Solution

var fairCandySwap = function (aliceSizes, bobSizes) {

    let aliceTotal = 0
    let bobTotal = 0

    for(const candy of aliceSizes){
        aliceTotal += candy
    }

    for(const candy of bobSizes){
        bobTotal += candy
    }

    let difference = (bobTotal - aliceTotal) / 2

    let aliceSet = new Set(aliceSizes)

    for(let i = 0; i < bobSizes.length; i++){

        let aliceCandy = bobSizes[i] - difference

        if(aliceSet.has(aliceCandy)){
            return [aliceCandy, bobSizes[i]]
        }
    }
};


// Test Cases

console.log(fairCandySwap([2], [1,3]))
// Output: [2,3]

console.log(fairCandySwap([1,2], [2,3]))
// Output: [1,2]

console.log(fairCandySwap([2,2], [1,3]))
// Output: [2,3]

console.log(fairCandySwap([1,1], [2,2]))
// Output: [1,2]