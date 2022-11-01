function animation(obj, long, speed, callback) {
    //清除之前定时器(防止手贱)
    clearInterval(obj.EA)
    //判断用户是否没有输入速度
    if (typeof (arguments[2]) == "function") {
        //那么应当是回调函数，将引用传给callback
        callback = arguments[2]
    }

    //判断速度是否为数字，不是的话就给 speed 默认值
    if (typeof (speed) != "number") {
        speed = 15
    }
    //将速度化为整数
    speed = parseInt(speed)
    //使用现在定时器
    obj.EA = setInterval(function () {
        //公式: (目标点 - 现在位置)/10
        var shoud_go = (long - window.pageYOffset) / 10
        //判断目标值为正或负值
        shoud_go = shoud_go > 0 ? Math.ceil(shoud_go) : Math.floor(shoud_go)
        //如果目标达到预期效果则清除定时器并判断实参是否拥有回调函数
        if (window.pageYOffset == long) {
            //清除当前定时器
            clearInterval(obj.EA)
            //执行回调函数
            if (callback) {
                callback()

            }
        }
        //目标移动
        // window.pageYOffset = window.pageYOffset + shoud_go + "px"
        window.scroll(0, window.pageYOffset + shoud_go)

    }, speed)

}