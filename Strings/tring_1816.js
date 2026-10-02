// LeetCode 1816
// Truncate Sentence
// Difficulty: Easy
// Tags: String, Array, Split, Join

/*

Pattern:
String Split + Array Slicing

Approach:
1. Split the sentence into an array of words using `" "`.
2. Create an array `ans` with size `k`.
3. Traverse the first `k` words.
4. Store each word in the `ans` array.
5. Join the words using a space.
6. Return the resulting string.

Example:
s = "Hello how are you Contestant"
k = 4

Words:
["Hello", "how", "are", "you", "Contestant"]

First 4 words:
["Hello", "how", "are", "you"]

Output:
"Hello how are you"

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I first split the sentence into an array of words.

Then, I created an answer array of size `k` and copied the
first `k` words into it.

Finally, I used `join(" ")` to convert the array back into
a sentence and returned it.
*/

// Solution

var truncateSentence = function(s, k) {

    let temp = s.split(" ")
    let ans = new Array(k)

    for(let i = 0; i < k; i++){

        ans[i] = temp[i]

    }

    return ans.join(" ")
};

// Test Cases

console.log(truncateSentence("Hello how are you Contestant", 4))
// Output: "Hello how are you"

console.log(truncateSentence("What is the solution to this problem", 4))
// Output: "What is the solution"

console.log(truncateSentence("chopper is not a tanuki", 5))
// Output: "chopper is not a tanuki"

console.log(truncateSentence("Hello World", 1))
// Output: "Hello"

console.log(truncateSentence("I love JavaScript", 2))
// Output: "I love"