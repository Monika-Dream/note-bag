let arr = [4, 445, 4451, 5642, 1654, 8456, 15, 48, 44, 15, 121, 21, 655, 64, 894, 941, 651, 51, 6549, 84, 84, 984, 65, 123, 21, 6598, 48]
    Array.prototype.swap = function(firstval, secondval){
      let num = this[firstval]
      this[firstval] = this[secondval]
      this[secondval] = num
    }
    function shell(arr) {
      for (let i = Math.floor((arr.length - 1) / 2); i >= 1; i = Math.floor(i / 2)){
        for(j = i ; j<arr.length ; j++){
          while(arr[j-i] > arr[j]){
            arr.swap(j-i,j)
            j -= 1
          }
        }
      }
      return arr
    }
    console.log(shell(arr))