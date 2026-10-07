// LeetCode 3894
// Check Traffic Signal
// Difficulty: Easy
// Tags: Conditional Statements, Simulation

/*

Pattern:
Conditional Checking

Approach:
1. Check if `timer` is 0.
   - Return `"Green"`.
2. Check if `timer` is 30.
   - Return `"Orange"`.
3. Check if `timer` is greater than 30 and less than or equal
   to 90.
   - Return `"Red"`.
4. If none of the conditions match, return `"Invalid"`.

Example:
timer = 60

Since:
30 < 60 <= 90

Output:
"Red"

Time Complexity: O(1)
Space Complexity: O(1)

My Approach:
I used `if-else if-else` conditions to check the value of
`timer`.

If `timer` is 0, I return `"Green"`.
If `timer` is 30, I return `"Orange"`.
If `timer` is between 30 and 90, I return `"Red"`.

For any other value, I return `"Invalid"`.
*/

// Solution

var trafficSignal = function(timer) {

    if(timer == 0){
        return "Green"
    }
    else if(timer == 30){
        return "Orange"
    }
    else if(timer <= 90 && timer > 30){
        return "Red"
    }
    else{
        return "Invalid"
    }

};

// Test Cases

console.log(trafficSignal(0))
// Output: "Green"

console.log(trafficSignal(30))
// Output: "Orange"

console.log(trafficSignal(60))
// Output: "Red"

console.log(trafficSignal(90))
// Output: "Red"

console.log(trafficSignal(100))
// Output: "Invalid"

console.log(trafficSignal(20))
// Output: "Invalid"