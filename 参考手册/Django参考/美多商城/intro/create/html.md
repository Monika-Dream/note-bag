# 配置前端静态文件 {#配置前端静态文件}

### 1. 准备静态文件 {#1-准备静态文件}

![](/assets/29添加静态文件.png)

### 2. 指定静态文件加载路径 {#2-指定静态文件加载路径}

```
STATIC_URL = '/static/'

# 配置静态文件加载路径
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
```

> 配置完成后：运行程序，测试结果。

* [http://127.0.0.1:8000/static/index.html](http://127.0.0.1:8008/static/index.html)



