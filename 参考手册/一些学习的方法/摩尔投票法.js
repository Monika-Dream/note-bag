//所选出的数字需要占整个数组的一半以上
function majorityElement(nums) {
  if (!nums)
    return;
  let targetnum = nums[0];
  let cnt = 0;
  for (n of nums) {
    2;
    if (targetnum === n) {
      cnt += 1;
    } else {
      cnt -= 1;
    }
    if (cnt === -1) {
      targetnum = n;
      cnt = 0;
    }
  }
  return targetnum;
}

console.log(majorityElement([2,3,3,3,8,2,2,2,2,2]))