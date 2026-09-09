// LeetCode 48
// Rotate Image
// Difficulty: Medium
// Tags: Array, Matrix, Simulation

/*

Pattern:
Matrix Rotation + Temporary Matrix

Approach:
1. Create an empty `temp` matrix with the same size as
   the original matrix.
2. Traverse every element of the original matrix using
   row `i` and column `j`.
3. Place `matrix[i][j]` into:
   `temp[j][n - 1 - i]`
4. This mapping moves each element to its position after
   a 90-degree clockwise rotation.
5. Traverse the temporary matrix and copy every element
   back into the original matrix.
6. The original matrix is now rotated by 90 degrees.

Example:
[1,2,3]       [7,4,1]
[4,5,6]  ->   [8,5,2]
[7,8,9]       [9,6,3]

Time Complexity: O(n²)
Space Complexity: O(n²)

My Approach:
I created a temporary matrix and used the rotation formula:

temp[j][n - 1 - i] = matrix[i][j]

Here, `i` represents the row and `j` represents the column
of the original element.

For example, for:
matrix[0][0] = 1

The new position becomes:
temp[0][2] = 1

So `1` moves from the top-left corner to the top-right
corner, which is exactly what happens during a 90-degree
clockwise rotation.

Finally, I copied the temporary matrix back into the
original matrix.
*/

// Solution

var rotate = function(matrix) {

    let temp = new Array()

    for(let i = 0; i < matrix.length; i++){
        temp[i] = new Array()
    }

    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            temp[j][matrix.length - 1 - i] = matrix[i][j]
        }
    }

    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            matrix[i][j] = temp[i][j]
        }
    }
};


// Test Cases

let matrix1 = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

rotate(matrix1)
console.log(matrix1)
// Output:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]


let matrix2 = [
    [1,2],
    [3,4]
]

rotate(matrix2)
console.log(matrix2)
// Output:
// [
//   [3,1],
//   [4,2]
// ]


let matrix3 = [
    [1]
]

rotate(matrix3)
console.log(matrix3)
// Output: [[1]]