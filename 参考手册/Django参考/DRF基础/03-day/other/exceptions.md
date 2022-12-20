# 异常处理 Exceptions {#异常处理-exceptions}

[文档](http://www.django-rest-framework.org/api-guide/settings/#exception_handler)

REST framework提供了异常处理，我们可以自定义异常处理函数。例如处理关于数据库的异常

```py
from rest_framework.views import exception_handler
from rest_framework import status
from django.db import DatabaseError
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    #exc 当前异常的对象
    #context 哪个地方出的问题

    #先调用REST framework默认的异常处理方法获得标准错误响应对象
    response = exception_handler (exc, context)
    #在此处补充自定义的异常处理
    if response is None:
        view = context['view']
        if isinstance(exc, DatabaseError):
            print('[%s]: %s' % (view, exc))
            response = Response({'detail': '服务器内部错误'}, status=status.HTTP_507_INSUFFICIENT_STORAGE)

    return response
```

在配置文件中声明自定义的异常处理

```py
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'book.exceptions.custom_exception_handler'
}
```

如果未声明，会采用默认的方式，如下

```py
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler'
}
```

手动触发异常

```py
from book.models import BookInfo
from book.serializers import BookInfoModelSerializer
from rest_framework.viewsets import ModelViewSet

class BookModelViewSet(ModelViewSet):
    # queryset = BookInfo.objects.all()
    def get_queryset(self):
        #人为抛出异常
        from django.db import DatabaseError
        raise DatabaseError('error')

        return BookInfo.objects.all()
    serializer_class = BookInfoModelSerializer
```

### REST framework定义的异常 {#rest-framework定义的异常}

* APIException 所有异常的父类
* ParseError 解析错误
* AuthenticationFailed 认证失败
* NotAuthenticated 尚未认证
* PermissionDenied 权限决绝
* NotFound 未找到
* MethodNotAllowed 请求方式不支持
* NotAcceptable 要获取的数据格式不支持
* Throttled 超过限流次数
* ValidationError 校验失败



