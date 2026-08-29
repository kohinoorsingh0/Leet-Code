// LeetCode 575
// Distribute Candies
// Difficulty: Easy
// Tags: Array, Sorting, Counting

/*

Pattern:
Sorting + Counting Unique Elements

Approach:
1. Sort the candy array so that duplicate candy types
   become adjacent.
2. Use a variable `count` to count the number of unique
   candy types.
3. Compare each element with the next element.
4. If they are different, increment `count`.
5. Alice can receive only n / 2 candies.
6. Therefore, return the smaller value between:
   - Number of unique candy types.
   - n / 2 candies.

Example:
[1,1,2,2,3,3] -> 3
[1,1,1,1] -> 1
[1,2,3,4] -> 2

Time Complexity: O(n log n)
Space Complexity: O(1)

My Approach:
I first sorted the array so that duplicate candy types
come together. Then I counted the unique candy types by
comparing adjacent elements.

Finally, since Alice can only receive n / 2 candies,
I returned the minimum between the number of unique types
and n / 2.
*/

// Solution

var distributeCandies = function(candyType) {

    candyType.sort((a,b) => {
        return a - b
    })
    
    let count = 1
    let n = candyType.length

    for(let i = 0; i < n - 1; i++){
        if(candyType[i] !== candyType[i + 1]){
            count++
        }
    }

    if(count > n / 2){
        return n / 2
    }
    else{
        return count
    }
};


// Test Cases

console.log(distributeCandies([1,1,2,2,3,3]))
// Output: 3

console.log(distributeCandies([1,1,1,1]))
// Output: 1

console.log(distributeCandies([1,2,3,4]))
// Output: 2

console.log(distributeCandies([1,1,2,3]))
// Output: 2