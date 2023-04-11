var majorityElement = function(nums) {
    if(nums.length <= 1) return nums

    let middle = Math.floor(nums.length/2)
    let resultArr = []
    let curt = (leftNum,rightNum)=>{
      // if(leftNum === rightNum){
      //   resultArr.push(leftNum)
      // }
      console.log(leftNum,rightNum)
    }
    curt(majorityElement(nums.slice(0,middle)),majorityElement(nums.slice(middle)))
    // console.log(resultArr)
};



console.log(majorityElement([5,1,1,2,5,5,52,3,3,5,5,53,3,5,8]))
