# 展示用户注册界面 {#展示用户注册界面}

### 1. 准备用户注册模板文件 {#1-准备用户注册模板文件}

![](/assets/10准备注册模板文件.png)

### 2. 定义用户注册视图 {#2-定义用户注册视图}

```
from django.views import View

class RegisterView(View):
    """用户注册"""

    def get(self, request):
        """
        提供注册界面
        :param request: 请求对象
        :return: 注册界面
        """
        return render(request, 'register.html')
```

### 3. 定义用户注册路由 {#3-定义用户注册路由}

> **1.总路由**

```
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # users
    url(r'^', include('apps.users.urls', namespace='users')),
]
```

> **2.子路由**

```
from django.conf.urls import url
from . import views

urlpatterns = [
    # 注册
    url(r'^register/$', views.RegisterView.as_view(), name='register'),
]
```

加载页面静态文件

```
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>美多商城-注册</title>
    <link rel="stylesheet" type="text/css" href="{{ static('css/reset.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ static('css/main.css') }}">
</head>
```

> 编辑器报错问题
>
> ![](/assets/模板问题.png)这个不是代码问题，而是编辑器的问题
>
> 1。选择pycharm的设置
>
> ![](/assets/模板设置1.png)
>
> 2。选择语言中的模板语言
>
> ![](/assets/模板设置2.png)



