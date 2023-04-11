let arr = [45, 126, 848, 51, 8, 4, 91, 80, 52, 90, 22, 10, 1, 6]

Array.prototype.swap = function (num1, num2) {
  let old = this[num1]
  this[num1] = this[num2]
  this[num2] = old
}

function arrSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for(let j = 0 ; j < arr.length-1-i ;j++){
      if(arr[j] > arr[j+1]){
        arr.swap(j,j+1)
      }
    }
  }
  return arr
}

console.log(arrSort(arr))
