# 创建用户模块应用 {#创建用户模块应用}

### 1. 创建用户模块应用 {#1-创建用户模块应用}

> **在**`apps`**包下创建应用**`users`

```
$ python ../manage.py startapp users
```

![](/assets/users.png)

###  {#2-查看项目导包路径}

### 2. 注册用户模块应用 {#3-注册用户模块应用}

```
INSTALLED_APPS = [
    ...
    
    'apps.users',
]
```

> 注册完users应用后，运行测试程序。



