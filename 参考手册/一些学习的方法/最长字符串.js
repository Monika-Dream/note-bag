//滑动窗口
const map = new Map()
  let l = 0 
  let num = 0
  for(let i = 0 ; i < s.length ; i++){
      if(map.has(s[i]) && map.get(s[i])>=l){
          l = map.get(s[i])+1
      }
      num = Math.max(num,i+1-l)
      map.set(s[i],i)
  }
  return num