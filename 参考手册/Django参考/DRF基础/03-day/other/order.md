# 排序OrderingFilter {#分页pagination}

[文档](http://www.django-rest-framework.org/api-guide/filtering/#orderingfilter)

对于列表数据，REST framework提供了**OrderingFilter**过滤器来帮助我们快速指明数据按照指定字段进行排序。

#### 使用方法： {#使用方法：}

在类视图中设置filter\_backends，使用`rest_framework.filters.OrderingFilter`过滤器，REST framework会在请求的查询字符串参数中检查是否包含了ordering参数，如果包含了ordering参数，则按照ordering参数指明的排序字段对数据集进行排序。

前端可以传递的ordering参数的可选字段值需要在ordering\_fields中指明。

示例：

```py

from book.models import BookInfo
from book.serializers import BookInfoModelSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter


class BookModelViewSet(ModelViewSet):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoModelSerializer
    #设置排序filter_backends 
    filter_backends = [OrderingFilter]
    #设置排序字段
    ordering_fields = ['id','readcount','commentcount']



```



