let arr = [10,85,89,521,8874,26,841,588,5314,562,5875,181,682,58,1,12,48,4,2,9]
// let arr = [11,2,3,4,5,6]

function insertSort(arr){
  let len = arr.length
  for(let i = 0 ; i < len; i++){
    let temp = arr[i]
    let j = i - 1
    while(j>=0 && arr[j]>temp){
      arr[j+1] = arr[j]
      j--
    }
    arr[j+1] = temp
  }
  return arr
}
console.log(insertSort(arr))

















