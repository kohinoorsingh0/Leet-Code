// LeetCode 2114
// Maximum Number of Words Found in Sentences
// Difficulty: Easy
// Tags: String, Array, Split

/*

Pattern:
String Split + Maximum

Approach:
1. Initialize `max` to 0.
2. Traverse every sentence in the `sentences` array.
3. Split the current sentence into words using `" "`.
4. Check the number of words using the array's `length`.
5. If the current sentence has more words than `max`, update
   `max`.
6. Return `max`.

Example:
sentences = [
    "alice and bob love leetcode",
    "i think so too",
    "this is great thanks very much"
]

Word counts:
- "alice and bob love leetcode" -> 5
- "i think so too" -> 4
- "this is great thanks very much" -> 6

Output:
6

Time Complexity: O(n * m)
Space Complexity: O(m)

My Approach:
I traversed every sentence and split it into an array of words
using `split(" ")`.

Then, I compared the length of each word array with `max`.
If the current sentence had more words, I updated `max`.

Finally, I returned the maximum number of words found in any
sentence.
*/

// Solution

var mostWordsFound = function(sentences) {

    let max = 0

    for(let i = 0; i < sentences.length; i++){

        let arr = sentences[i]

        let temp = arr.split(" ")

        if(temp.length > max){
            max = temp.length
        }

    }

    return max
};

// Test Cases

console.log(mostWordsFound([
    "alice and bob love leetcode",
    "i think so too",
    "this is great thanks very much"
]))
// Output: 6

console.log(mostWordsFound([
    "please wait",
    "continue to fight",
    "continue to win"
]))
// Output: 3

console.log(mostWordsFound([
    "hello"
]))
// Output: 1

console.log(mostWordsFound([
    "I love JavaScript",
    "I am learning web development"
]))
// Output: 5

console.log(mostWordsFound([
    "one two",
    "one two three four"
]))
// Output: 4