let obj = {
  val:"a",
  children:[
    {val:"b",children:[
      {val:"d",children:[
        {val:"h",children:[]}
      ]},
      {val:"e",children:[]}
    ]},
    {val:"c",children:[
      {val:"f",children:[]},
      {val:"g",children:[]}
    ]}
  ]
}

const fun2 = (root)=>{
  const arr = [root]
  while(arr.length>0){
    const o = arr.shift()
    o.children.forEach(val=>{
      arr.push(val)
    })
    console.log(o)
  }

}
fun2(obj)




