// LeetCode 500
// Keyboard Row
// Difficulty: Easy
// Tags: String, Array, Hash Set

/*

Pattern:
String Validation + Array Includes

Approach:
1. Create three arrays representing the three keyboard rows.
2. Create an empty array `ans` to store valid words.
3. Traverse every word in the input array.
4. Convert the current word to lowercase.
5. Determine the keyboard row using the first character of the word.
6. Check every character of the word:
   - If a character is not present in the selected row, mark the word as invalid.
7. If the word is valid, add the original word to `ans`.
8. Return the result array.

Example:
words = ["Hello", "Alaska", "Dad", "Peace"]

- "Hello" uses multiple rows.
- "Alaska" uses only the second row.
- "Dad" uses only the second row.
- "Peace" uses multiple rows.

Output:
["Alaska", "Dad"]

Time Complexity: O(n * m)
Space Complexity: O(1) auxiliary space

My Approach:
I created three arrays for the three keyboard rows.

For each word, I converted it to lowercase and selected the
keyboard row based on its first character.

Then, I checked whether every character of the word existed
in that selected row. If all characters were present, I added
the original word to the answer array.

*/

// Solution

var findWords = function(words) {

    let row1 = ['q','w','e','r','t','y','u','i','o','p']
    let row2 = ['a','s','d','f','g','h','j','k','l']
    let row3 = ['z','x','c','v','b','n','m']

    let ans = new Array()
    let k = 0

    for(let i = 0; i < words.length; i++){

        let word = words[i]
        word = word.toLowerCase()

        let row

        if(row1.includes(word[0])){
            row = row1
        }
        else if(row2.includes(word[0])){
            row = row2
        }
        else{
            row = row3
        }

        let valid = true

        for(let j = 0; j < word.length; j++){

            if(!row.includes(word[j])){
                valid = false
                break
            }

        }

        if(valid === true){
            ans[k++] = words[i]
        }

    }

    return ans
};


// Test Cases

console.log(findWords(["Hello", "Alaska", "Dad", "Peace"]))
// Output: ["Alaska", "Dad"]

console.log(findWords(["omk"]))
// Output: []

console.log(findWords(["adsdf", "sfd"]))
// Output: ["adsdf", "sfd"]

console.log(findWords(["A", "b", "Z"]))
// Output: ["A", "b", "Z"]

console.log(findWords(["qwerty", "asdf", "zxcv"]))
// Output: ["qwerty", "asdf", "zxcv"]