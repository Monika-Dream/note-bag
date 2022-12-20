# 配置Jinja2模板引擎 {#配置jinja2模板引擎}

[文档](http://jinja.pocoo.org/docs/2.10/)

### 1. 安装Jinja2扩展包 {#1-安装jinja2扩展包}

```
$ pip install Jinja2
```

### 2. 配置Jinja2模板引擎 {#2-配置jinja2模板引擎}

```
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',  # jinja2模板引擎
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

### 3. 补充Jinja2模板引擎环境 {#3-补充jinja2模板引擎环境}

> **1.Jinja2创建模板引擎环境配置文件**

![](/assets/Jinja2模板引擎环境.png)

> **2.编写Jinja2创建模板引擎环境配置代码**
>
> [文档](http://jinja.pocoo.org/docs/2.10/api/#the-global-namespace)
>
> [Django文档](https://docs.djangoproject.com/en/1.11/topics/templates/#module-django.template.backends.django)

```
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse
from jinja2 import Environment


def jinja2_environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse,
    })
    return env
```

![](/assets/30jinja2static语法.png)![](/assets/31jinja2url语法.png)

> **3.补充Jinja2模板引擎环境**

```
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',  # jinja2模板引擎
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            # 补充Jinja2模板引擎环境
            'environment': 'utils.jinja2_env.jinja2_environment', 
        },
    },
]
```

> 配置完成后：运行程序，测试结果。



