/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {

    let count = 0

    

    for(let i = 2; i * i < n; i++){
        let isPrime = true;
        for(let j = i * i; j < n; j++){
            
        }
        count++
        
    }

    console.log(count)
};

countPrimes(10);
