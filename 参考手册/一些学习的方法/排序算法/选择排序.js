let arr = [10,85,89,521,8874,26,841,588,5314,562,5875,181,682,58,1,12,48,4,2,9]

Array.prototype.swar = function(num1,num2){
  let temp = this[num2]
  this[num2] = this[num1]
  this[num1] = temp
}



function sortMin(arr){
  let indexMin = 0;
  for(let i = 0 ; i < arr.length-1 ; i++){
    indexMin = i
    for(let j = i+1;j<arr.length ; j++){
      if(arr[j] < arr[indexMin]){
        indexMin = j
      }
    }
    arr.swar(i,indexMin)
  }
  return arr
}




console.log(sortMin(arr))


















