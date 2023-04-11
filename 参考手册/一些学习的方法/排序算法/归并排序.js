let arr = [10,85,89,521,8874,26,841,588,5314,562,5875,181,682,58,1,12,48,4,2,9]




function mergeSort(arr){
  if(arr.length < 2) return arr
  let mid = Math.floor(arr.length/2)
  let shell = function(leftArr,rightArr){
    // console.log(leftArr,rightArr)
    let resultArr = []
    while(leftArr.length && rightArr.length){
      resultArr.push(leftArr[0] <= rightArr[0] ? 
        leftArr.shift()
        :rightArr.shift()
        )
      }
      return resultArr.concat(leftArr).concat(rightArr)
  }
  return shell(mergeSort(arr.slice(0,mid)),mergeSort(arr.slice(mid)))
} 




console.log(mergeSort(arr))