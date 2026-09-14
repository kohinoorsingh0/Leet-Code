/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {

    let uniq = s[0]

    for(let i = 1; i < s.length; i++){
        if(uniq === s[i]){
            uniq = s[i]
        }
      
    }

    console.log(s.indexOf(uniq))

    
    
};

firstUniqChar("loveleetcode")