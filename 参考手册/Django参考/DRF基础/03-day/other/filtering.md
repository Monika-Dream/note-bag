# 过滤Filtering {#过滤filtering}

[文档](http://www.django-rest-framework.org/api-guide/filtering/#djangofilterbackend)

![](/assets/过滤.png)

对于列表数据可能需要根据字段进行过滤，我们可以通过添加django-fitlter扩展来增强支持。

```
pip install django-filter
```

安装应用:

```py
INSTALLED_APPS = [
    ...
    'django_filters',
    ...
]
```

在配置文件中增加过滤后端的设置：

```py
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',)
}
```

在视图中添加filter\_fields属性，指定可以过滤的字段

```py
from book.models import BookInfo
from book.serializers import BookInfoModelSerializer
from rest_framework.viewsets import ModelViewSet


class BookModelViewSet(ModelViewSet):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoModelSerializer
    #添加过滤字段
    filterset_fields  = ['id', 'name', 'pub_date']
```



