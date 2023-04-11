class Vue {
  constructor(dataAll) {
    this.$data = dataAll.data
    Observer(this.$data, this)
    Renders(dataAll, this)
  }
}

function Observer(dataAll, vm) {
  let wacher = new Wacher()
  obj = {
    get(valueAll, value) {
      if (typeof valueAll[value] === 'object') {
        return new Proxy(valueAll[value], obj)
      }
      Wacher.temp && wacher.addFun(Wacher.temp)
      // console.log(`访问${value}中的${valueAll[value]}`)
      return valueAll[value]
    },
    set(ValueAll, value, data) {
      if(Reflect.set(ValueAll, value, data)){
        wacher.useFun()
      }
    },
  }
  vm.$data = new Proxy(dataAll, obj)
}

function Renders(dataAll, vm) {
  vm.$el = document.querySelector(dataAll.el)
  let Fragment = document.createDocumentFragment()
  let i
  while((i = vm.$el.firstChild)){
    Fragment.append(i)
  }
  RenderDOM(Fragment,vm)
  function RenderDOM (Fragment,vm){
    if(Fragment.nodeType === 3){
      let myReg = /\{\{\s*(\S+)\s*\}\}/
      let newText = myReg.exec(Fragment.nodeValue)
      if(newText){
        let xxx = Fragment.nodeValue
        let text = newText[1].split(".").reduce((defValue,value)=>defValue[value],vm.$data)
        Fragment.nodeValue = xxx.replace(myReg,text)
        new See(vm,newText[1],(newValue)=>{
          Fragment.nodeValue = xxx.replace(myReg,newValue)
        })
      }
    }
  Fragment.childNodes.forEach(value => RenderDOM(value,vm))
  }
  vm.$el.appendChild(Fragment)
}


class Wacher{
  constructor(){
    this.observer = []
  }
  addFun(fun){
    this.observer.push(fun)
  }
  useFun(){
    this.observer.forEach(element => element.update())
  }
}


class See{
  constructor(vm,value,callback){
    this.vm = vm
    this.value = value
    this.callback = callback
    Wacher.temp = this
    value.split(".").reduce((defValue,value)=>defValue[value],vm.$data)
    Wacher.temp = null
  }

  update(){
    let data = this.value.split(".").reduce((defValue,value)=>defValue[value],this.vm.$data)
    this.callback(data)
  }
}












