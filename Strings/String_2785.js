// LeetCode 2785
// Sort Vowels in a String
// Difficulty: Medium
// Tags: String, Sorting

/*

Pattern:
Extract + Sort + Replace Using Indexes

Approach:
1. Create an array `vovels` containing all lowercase and
   uppercase vowels.
2. Create two arrays:
   - `arr` stores the vowels found in the string.
   - `index` stores the positions of those vowels.
3. Traverse the string and check whether each character is
   a vowel.
4. If a character is a vowel, store it in `arr` and its
   position in `index`.
5. Sort the vowel array in ascending ASCII order.
6. Convert the original string into an array of characters.
7. Replace the vowel positions with the sorted vowels.
8. Join the character array and return the result.

Example:
s = "lEetcOde"

Vowels found:
["E", "e", "O", "e"]

Sorted vowels:
["E", "O", "e", "e"]

Replace vowels in their original positions.

Output:
"lEOtcede"

Time Complexity: O(n log n)
Space Complexity: O(n)

My Approach:
I created an array containing all vowels and traversed the
string to collect the vowels and their indexes.

Then, I sorted the collected vowels and converted the
original string into an array.

Finally, I replaced the characters at the stored vowel
indexes with the sorted vowels and joined the array back
into a string.
*/

// Solution

var sortVowels = function(s) {

    let vovels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]
    let arr = []
    let index = []

    for(let i = 0; i < s.length; i++){

        for(let j = 0; j < vovels.length; j++){

            if(vovels[j] === s[i]){
                arr.push(s[i])
                index.push(i)
            }

        }

    }

    arr = arr.sort()

    let sArray = s.split("")

    for(let j = 0; j < index.length; j++){
        sArray[index[j]] = arr[j]
    }

    return sArray.join("")
};

// Test Cases

console.log(sortVowels("lEetcOde"))
// Output: "lEOtcede"

console.log(sortVowels("lYmpH"))
// Output: "lYmpH"

console.log(sortVowels("aA"))
// Output: "Aa"

console.log(sortVowels("UOIEA"))
// Output: "AEIOU"

console.log(sortVowels("hello"))
// Output: "holle"