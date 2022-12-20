# 限流Throttling {#限流throttling}

[文档](https://www.django-rest-framework.org/api-guide/throttling/)

[微博限流文档](http://open.weibo.com/wiki/接口访问频次权限)

可以对接口访问的频次进行限制，以减轻服务器压力。

## 1.使用 {#使用}

可以在配置文件中，使用`DEFAULT_THROTTLE_CLASSES`和`DEFAULT_THROTTLE_RATES`进行全局配置，

```py
REST_FRAMEWORK = {
    # 节流的配置列表
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle', #匿名未认证用户，使用IP区分用户
        'rest_framework.throttling.UserRateThrottle' #使用User id 来区分
    ),
    #节流率
    'DEFAULT_THROTTLE_RATES': {
        'anon': '3/day',
        'user': '5/day'
    }
}
```

`DEFAULT_THROTTLE_RATES`可以使用`second`,`minute`,`hour`或`day`来指明周期。

## 2.可选限流类

1） AnonRateThrottle限制所有匿名未认证用户，使用IP区分用户。

使用`DEFAULT_THROTTLE_RATES['anon']`来设置频次

2）UserRateThrottle限制认证用户，使用User id 来区分。

使用`DEFAULT_THROTTLE_RATES['user']`来这是频次

3）ScopedRateThrottle限制用户对于每个视图的访问频次，使用ip或user id。

例如：

```py
class ContactListView(APIView):
    throttle_scope = 'contacts'
    ...

class ContactDetailView(APIView):
    throttle_scope = 'contacts'
    ...

class UploadView(APIView):
    throttle_scope = 'uploads'
    ...
```

```py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.ScopedRateThrottle',
    ),
    'DEFAULT_THROTTLE_RATES': {
        'contacts': '1000/day',
        'uploads': '20/day'
    }
}
```

## 3.指定视图设置

```py
from book.models import BookInfo
from book.serializers import BookInfoModelSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.throttling import AnonRateThrottle

class BookModelViewSet(ModelViewSet):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoModelSerializer
    #限流设置
    throttle_classes = [AnonRateThrottle]
```



