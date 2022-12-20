# 短信验证码前端逻辑 {#短信验证码前端逻辑}

### 1. Vue绑定短信验证码界面 {#1-vue绑定短信验证码界面}

> **1.register.html**

```
<li>
    <label>短信验证码:</label>
    <input type="text" v-model="sms_code" @blur="check_sms_code" name="sms_code" id="msg_code" class="msg_input">
    <a @click="send_sms_code" class="get_msg_code">[[ sms_code_tip ]]</a>
    <span class="error_tip" v-show="error_sms_code">[[ error_sms_code_message ]]</span>
</li>
```

> **2.register.js**

```
check_sms_code(){
    if(this.sms_code.length != 6){
        this.error_sms_code_message = '请填写短信验证码';
        this.error_sms_code = true;
    } else {
        this.error_sms_code = false;
    }
},
```

### 2. axios请求短信验证码 {#2-axios请求短信验证码}

> **1.发送短信验证码事件处理**

```
send_sms_code(){
    // 避免重复点击
    if (this.sending_flag == true) {
        return;
    }
    this.sending_flag = true;

    // 校验参数
    this.check_mobile();
    this.check_image_code();
    if (this.error_mobile == true || this.error_image_code == true) {
        this.sending_flag = false;
        return;
    }

    // 请求短信验证码
    let url = '/sms_codes/' + this.mobile + '/?image_code=' + this.image_code+'&uuid='+ this.uuid;
    axios.get(url, {
        responseType: 'json'
    })
        .then(response => {
            if (response.data.code == '0') {
                // 倒计时60秒
                var num = 60;
                var t = setInterval(() => {
                    if (num == 1) {
                        clearInterval(t);
                        this.sms_code_tip = '获取短信验证码';
                        this.sending_flag = false;
                    } else {
                        num -= 1;
                        // 展示倒计时信息
                        this.sms_code_tip = num + '秒';
                    }
                }, 1000, 60)
            } else {
                if (response.data.code == '4001') {
                    this.error_image_code_message = response.data.errmsg;
                    this.error_image_code = true;
                } else { // 4002
                    this.error_sms_code_message = response.data.errmsg;
                    this.error_sms_code = true;
                }
                this.generate_image_code();
                this.sending_flag = false;
            }
        })
        .catch(error => {
            console.log(error.response);
            this.sending_flag = false;
        })
},
```

> **2.发送短信验证码效果展示**

![](/assets/22短信验证码效果展示.png)

