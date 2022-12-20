# 用户注册前端逻辑 {#用户注册前端逻辑}

### 1. Vue绑定注册界面准备 {#1-vue绑定注册界面准备}

> **1.导入Vue.js库和ajax请求的库**

```
<script type="text/javascript" src="{{ static('js/vue-2.5.16.js') }}"></script>
<script type="text/javascript" src="{{ static('js/axios-0.18.0.min.js') }}"></script>
```

> **2.准备div盒子标签**

```
<div id="app" v-cloak></div>
```

> **3.准备register.js文件**

```
<script type="text/javascript" src="{{ static('js/register.js') }}"></script>
```

### 2. Vue绑定注册界面实现 {#2-vue绑定注册界面实现}

[Vue文档](https://cn.vuejs.org/v2/guide/)

* **重要提示：以Vue绑定注册表单及用户名和密码为例**

> **1.register.html**
>
> * 绑定内容：变量、事件、错误提示等

```
<form method="post" class="register_form" @submit="on_submit">
    {{ csrf_input }}
    <ul>
        <li>
            <label>用户名:</label>
            <input type="text" name="user_name" id="user_name" v-model="username" @blur="check_username">
            <span class="error_tip" v-show="error_username">[[error_username_message]]</span>
        </li>
        <li>
            <label>密码:</label>
            <input type="password" name="pwd" id="pwd" v-model="password" @blur="check_password">
            <span class="error_tip" v-show="error_password">[[error_password_message]]</span>
        </li>
        <li>
            <label>确认密码:</label>
            <input type="password" name="cpwd" id="cpwd" v-model="password2" @blur="check_confirm_password">
            <span class="error_tip" v-show="error_confirm">[[error_confirm_message]]</span>
        </li>
        <li>
            <label>手机号:</label>
            <input type="text" name="phone" id="phone" v-model="mobile" @blur="check_mobile">
            <span class="error_tip" v-show="error_mobile">[[error_mobile_message]]</span>
        </li>
        <li>
                            <label>图形验证码:</label>
                            <input type="text" name="pic_code" id="pic_code" class="msg_input">
                            <img src="/static/images/pic_code.jpg" alt="图形验证码" class="pic_code">
                            <span class="error_tip">请填写图形验证码</span>
                        </li>
        <li>
            <label>短信验证码:</label>
            <input type="text" name="msg_code" id="msg_code" class="msg_input">
            <a href="javascript:;" class="get_msg_code">获取短信验证码</a>
            <span class="error_tip">请填写短信验证码</span>
        </li>
        <li class="agreement">
            <input type="checkbox" name="allow" id="allow" checked="checked" v-model="allow">
            <label>同意”美多商城用户使用协议“</label>
            <span class="error_tip" v-show="error_allow">[[error_allow_message]]</span>
        </li>
        <li class="reg_sub">
            <input type="submit" value="注 册">
        </li>
    </ul>
    </form>
```

> **2.register.js**
>
> * 绑定内容：变量、事件、错误提示等

```
var vm = new Vue({
    el:'#app',
    delimiters:["[[","]]"],
    data:{
        //接收参数
        username:'',
        password:'',
        password2:'',
        mobile:'',
        allow:'',
        //提示标记
        error_username:false,
        error_password:false,
        error_confirm:false,
        error_mobile:false,
        error_allow:false,
        //错误信息展示
        error_username_message:'',
        error_password_message:'',
        error_confirm_message:'',
        error_mobile_message:'',
        error_captcha_message:'',
        error_allow_message:'',
    },
    methods:{
        //检测用户名
        check_username:function () {

        },
        //检测密码
        check_password:function () {

        },
        //检测确认密码
        check_confirm_password:function () {

        },
        //检测手机号
        check_mobile:function () {

        },
        //提交注册按钮
        on_submit:function () {

        },
    }
})
```

> **3.用户交互事件实现（register.js）**

```
var vm = new Vue({
    el:'#app',
    delimiters:["[[","]]"],
    data:{
        //接收参数
        username:'',
        password:'',
        password2:'',
        mobile:'',
        allow:'',
        //提示标记
        error_username:false,
        error_password:false,
        error_confirm:false,
        error_mobile:false,
        error_allow:false,
        //错误信息展示
        error_username_message:'',
        error_password_message:'',
        error_confirm_message:'',
        error_mobile_message:'',
        error_captcha_message:'',
        error_allow_message:'',
    },
    methods:{
        //检测用户名
        check_username:function () {
            let re = /^[a-zA-Z0-9_]{5,20}$/;
            if(re.test(this.username)){
                this.error_username=false;
            }else {
                this.error_username_message='请输入5-20个字符的用户';
                this.error_username=true;
            }
        },
        //检测密码
        check_password:function () {
            let re = /^[a-zA-Z0-9]{8,20}$/;
            if(re.test(this.password)){
                this.error_password=false;
            }else {
                this.error_password_message='请输入8-20个字符密码';
                this.error_password=true;
            }
        },
        //检测确认密码
        check_confirm_password:function () {
            if(this.password2 != this.password){
                this.error_confirm=true;
                this.error_confirm_message='两次输入的密码不一致'
            }else{
                this.error_confirm=false;
            }
        },
        //检测手机号
        check_mobile:function () {
            let re = /^1[3-9]\d{9}$/;
            if(re.test(this.mobile)){
                this.error_mobile=false;
            }else{
                this.error_mobile=true;
                this.error_mobile_message='请输入正确的手机号码';
            }
        },
        //提交注册按钮
        on_submit:function () {

            this.check_username();
            this.check_password();
            this.check_confirm_password();
            this.check_mobile();

            if(this.error_username==true||this.error_password==true||this.error_confirm==true||this.error_mobile==true){
                window.event.returnValue=false;
            }

        },
    }
})
```

### 4. 知识要点 {#4-知识要点}

1. Vue绑定界面的套路
   * 导入Vue.js库和ajax请求的库
   * 准备div盒子标签
   * 准备js文件
   * html页面绑定变量、事件等
   * js文件定义变量、事件等
2. 错误提示
   * 如果某项数据的错误提示信息是固定的，可以把错误提示信息写死，再通过绑定的变量控制是否展示
   * 如果某项数据的错误提示信息不是固定的，可以使用绑定的变量动态的展示错误提示信息，再通过绑定的v-show控制是否展示
3. 后续的界面中其他部分，也可按照此套路实现

> 针对于编辑器对 [axios](https://github.com/axios/axios)语法的支持问题
>
> ![](/assets/axios_question.png)
>
> 修改如下:
>
> 1,找到pychar的settings
>
> ![](/assets/pccharsettings.png)
>
> 2,ECMAScript6
>
> ![](/assets/pcchar_ok.png)



