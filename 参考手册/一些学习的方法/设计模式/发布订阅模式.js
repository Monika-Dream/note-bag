class Manager {
  messages = {}
  on(msgName, callback) {
    if (this.messages[msgName]) {
      this.messages[msgName].push(callback)
    } else {
      this.messages[msgName] = [callback]
    }
  }
  emit(msgName, ...param) {
    if (this.messages[msgName]) {
      this.messages[msgName].forEach(callback => callback.call(this, ...param))
    }
  }
}

let manager = new Manager()
manager.on("王煦博消息", (msg) => {
  console.log(`Monika 收到了 王煦博 消息: ${msg}`)
})
manager.on("Jack消息", (msg) => {
  console.log(`Sayori 收到了 Jack 消息: ${msg}`)
})
manager.on("Monika消息", (msg) => {
  console.log(msg)
  console.log(`Natsuki 收到了 Monika 消息: ${msg}`)
})

setTimeout(() => {
  manager.emit("Monika消息", {name:"Monika",age:18})
}, 2000)