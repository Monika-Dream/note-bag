

function login(fun,user){
  return (userName)=>{
    console.log("验证成功",user)
    fun(userName)
  }
}

function ask(userName){
  console.log("登陆成功",userName)
}

ask = login(ask,"Jack")

ask("Monika")