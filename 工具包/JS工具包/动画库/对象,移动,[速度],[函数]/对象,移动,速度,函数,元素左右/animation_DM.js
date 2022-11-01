//需要传递
//动画对象     要走多长     速度(毫秒)[可选,默认15毫秒]     函数[可选] = 在动画完成时的动作

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
    //将速度化为整数与绝对值
    speed = parseInt(Math.abs(speed))
    //使用现在定时器
    obj.EA = setInterval(function () {
        //公式: (目标点 - 现在位置)/10
        var shoud_go = (long - obj.offsetLeft) / 10
        //判断目标值为正或负值
        shoud_go = shoud_go > 0 ? Math.ceil(shoud_go) : Math.floor(shoud_go)
        //如果目标达到预期效果则清除定时器并判断实参是否拥有回调函数
        if (obj.offsetLeft == long) {
            //清除当前定时器
            clearInterval(obj.EA)
            //执行回调函数
            callback && callback()
        }
        //目标移动
        obj.style.left = obj.offsetLeft + shoud_go + "px"

    }, speed)

}

//使用案例
/*
btn800.onclick = function () {
    animation(span,How_long)
    animation(span, 800, 50)
        }
*/


