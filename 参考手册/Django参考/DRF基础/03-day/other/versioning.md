# 版本Versioning {#版本versioning}

[文档](http://www.django-rest-framework.org/api-guide/versioning/)

REST framework提供了版本号的支持。

在需要获取请求的版本号时，可以通过`request.version`来获取。

默认版本功能未开启，`request.version`返回None。

开启版本支持功能，需要在配置文件中设置`DEFAULT_VERSIONING_CLASS`

```
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning'
}
```

其他可选配置：

* **DEFAULT\_VERSION**默认版本号，默认值为None
* **ALLOWED\_VERSIONS**允许请求的版本号，默认值为None
* **VERSION\_PARAM**识别版本号参数的名称，默认值为'version'

## 支持的版本处理方式 {#支持的版本处理方式}

**1） AcceptHeaderVersioning**

请求头中传递的Accept携带version

```
GET /bookings/ HTTP/1.1
Host: example.com
Accept: application/json; version=1.0
```

**2）URLPathVersioning**

URL路径中携带

```
urlpatterns = [
    url(
        r'^(?P<version>(v1|v2))/bookings/$',
        bookings_list,
        name='bookings-list'
    ),
    url(
        r'^(?P<version>(v1|v2))/bookings/(?P<pk>[0-9]+)/$',
        bookings_detail,
        name='bookings-detail'
    )
]
```

**3）NamespaceVersioning**

命名空间中定义

```
# bookings/urls.py
urlpatterns = [
    url(r'^$', bookings_list, name='bookings-list'),
    url(r'^(?P<pk>[0-9]+)/$', bookings_detail, name='bookings-detail')
]

# urls.py
urlpatterns = [
    url(r'^v1/bookings/', include('bookings.urls', namespace='v1')),
    url(r'^v2/bookings/', include('bookings.urls', namespace='v2'))
]
```

**4）HostNameVersioning**

主机域名携带

```
GET /bookings/ HTTP/1.1
Host: v1.example.com
Accept: application/json
```

**5）QueryParameterVersioning**

查询字符串携带

```
GET /something/?version=0.1 HTTP/1.1
Host: example.com
Accept: application/json
```

### 示例 {#示例}

```
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.QueryParameterVersioning'
}
```

```
from rest_framework  import serializers
from .models import BookInfo

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookInfo
        fields = '__all__'

class BookSerializer2(serializers.ModelSerializer):

    class Meta:
        model = BookInfo
        fields = ('id','name')

from rest_framework.viewsets import ModelViewSet
from .serializers import BookSerializer,BookSerializer2
from .models import BookInfo
# Create your views here.


class BookModelViewSet(ModelViewSet):
    """
    图书管理视图
    """

    def get_serializer_class(self):
        if self.request.version == '1.0':
            #http://127.0.0.1:8000/books/?version=1.0
            return BookSerializer2
        else:
            return BookSerializer
    def get_queryset(self):

        return BookInfo.objects.all()



# 127.0.0.1:8000/books/
# 127.0.0.1:8000/books/?version=1.0
```



