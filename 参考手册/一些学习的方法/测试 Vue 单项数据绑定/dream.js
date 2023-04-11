class Dream{
  constructor(obj){
    this.$data = obj.data
    Observer(this.$data,this)
    Render(obj,this)
  }
}

function Observer(data,dm){
  obj = {
    get(obj,objName){
      if( typeof obj[objName] === "object"){
        return new Proxy(obj[objName],obj)
      }
      console.log(`读取了 ${objName} 中的 ${obj[objName]}`)
      return obj[objName]
    },
    set(obj,objValue,newvalue){
      Reflect.set(obj,objValue,newvalue)
    }
  }
  dm.$data = new Proxy(data,obj)
}


function Render(obj,dm){
  dm.$el = document.querySelector(obj.el)
  let Fragment = document.createDocumentFragment()
  let person
  while((person = dm.$el.firstChild)){
    Fragment.append(person)
  }
  // console.log(Fragment.childNodes)
  Renders(Fragment,dm)
  function Renders(node,dm){
    if(node.nodeType === 3){
      let MyReg = /\{\{\s*(\S+)\s*\}\}/
      let newNode = MyReg.exec(node.nodeValue)
      if(newNode){
        //______________-----------------_______________
        newNode[1].split(".").reduce((valueAll,value)=>valueAll[value],dm.$data)
      }
    }
    node.childNodes.forEach(reNode => Renders(reNode,dm))
  }
}












