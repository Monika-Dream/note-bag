//数组必须为有序
let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]

function Search(arr,num){
  let start = 0
  let end = arr.length - 1
  while(start <= end){
    let middle = Math.floor((start+end)/2)
    let guess = arr[middle]
    if(guess === num){
      return middle
    }
    if(guess > num){
      end = middle
    }
    if(guess < num){
      start = middle+1
    }
  }
  return ""
}



console.log(Search(arr,19),"win")












