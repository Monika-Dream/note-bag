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

let deep = (element)=>{
  console.log(element.val)
  element.children.forEach(deep)
}

deep(obj)
