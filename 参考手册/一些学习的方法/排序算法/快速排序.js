// let arr = [10,85,89,521,8874,26,841,588,5314,562,5875,181,682,58,1,12,48,4,2,9]
let arr = [6,5,4,3,2,1]

function quickSort(arr){
  if(arr.length <= 1) return arr
  let mid = Math.floor(arr.length/2)
  let pivot = arr.splice(mid,1)[0]
  let left = []
  let right = []
  for(i of arr){
    if(pivot > i){
      left.push(i)
    }else{
      right.push(i)
    }
  }
  
  return quickSort(left).concat([pivot],quickSort(right))
}



console.log(quickSort(arr))













