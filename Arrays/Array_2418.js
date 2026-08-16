// LeetCode 2418
// Sort the People
// Difficulty: Easy
// Tags: Array, Sorting, Bubble Sort

/*
LeetCode 2418 - Sort the People

Problem:
Given an array of names and an array of heights, return the names
sorted in descending order by their heights.

Pattern:
Bubble Sort + Parallel Array Swapping

Approach:
1. Use Bubble Sort to sort the people by height.
2. Compare heights[j] with heights[j + 1].
3. If heights[j] is smaller than heights[j + 1]:
   - Swap both heights.
   - Swap their corresponding names.
4. Continue until the array is sorted in descending order.
5. Return only the names array.

Example:

names:
["Mary", "John", "Emma"]

heights:
[180, 165, 170]

Compare:
165 < 170

Swap both the heights and names:

names:
["Mary", "Emma", "John"]

heights:
[180, 170, 165]

Answer:
["Mary", "Emma", "John"]

Important Observation:
Names and heights are connected.

Mary -> 180
John -> 165
Emma -> 170

Therefore, whenever two heights are swapped, their corresponding
names must also be swapped.

Time Complexity:
O(n²)

Reason:
We are using Bubble Sort with nested loops.

Space Complexity:
O(1) extra space

My Approach:
I initially tried swapping only the names based on the height
comparison.

That was incorrect because the names and heights would no longer
remain connected.

Then I realized that I need to swap both the name and height
together whenever two people are reordered.

Important Observation:
If heights[j] < heights[j + 1], then the person at j + 1
should come before the person at j.

So I swap:

heights[j]       <-> heights[j + 1]
names[j]         <-> names[j + 1]

The height array is only used internally to perform the sorting.
The final answer only requires the names array.
*/


var sortPeople = function(names, heights) {

    // Bubble Sort in descending order of height
    for(let i = 0; i < names.length; i++) {

        for(let j = 0; j < names.length - 1; j++) {

            // If the next person is taller, swap them
            if(heights[j] < heights[j + 1]) {

                [heights[j], names[j], heights[j + 1], names[j + 1]] =
                [heights[j + 1], names[j + 1], heights[j], names[j]]
            }
        }
    }

    return names
}


// Test Cases

console.log(
    sortPeople(["Mary", "John", "Emma"], [180, 165, 170])
)
// Output: ["Mary", "Emma", "John"]

console.log(
    sortPeople(["Alice", "Bob", "Charlie"], [155, 185, 170])
)
// Output: ["Bob", "Charlie", "Alice"]

console.log(
    sortPeople(["Bob", "Alice"], [190, 180])
)
// Output: ["Bob", "Alice"]