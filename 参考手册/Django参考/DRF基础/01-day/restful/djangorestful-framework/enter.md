# Django REST framework精通 {#见识drf的魅力}

## 1. 创建序列化器 {#1--创建序列化器}

我们的`BookInfoSerializer`像是复制`BookInfo` 模型中的大量信息。如果我们可以保持我们的代码更简洁一点，那将是非常好的。让我们看看使用`ModelSerializer`该类重构我们的序列化程序。`serializers.py`再次打开该文件，并用`BookInfoSerializer`下列内容替换该类

```
class BookInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookInfo
        fields = ('id', 'name', 'pub_date', 'readcount', 'commentcount', 'is_delete','image')
```

## 2. 编写视图 {#2--编写视图}

我们使用`APIView`该类重构我们的视图程序。`views`再次打开该文件并用下列内容替换

```
from book.models import BookInfo
from django.http import JsonResponse,HttpResponse,Http404
from book.serializers import BookInfoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class BookListView(APIView):
    """
    查询所有图书、增加图书
    """
    def get(self, request):
        """
        查询所有图书
        路由：GET /books/
        """
        books = BookInfo.objects.all()
        serializer = BookInfoSerializer(instance=books,many=True)
        return Response(serializer.data, safe=False,status=200)

    def post(self, request):
        """
        新增图书
        路由：POST /books/
        """
        serializer = BookInfoSerializer(data=request.data)
        #必须要调用is_valid进行校验
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=404)

class BookDetailView(APIView):
    """
    获取单个图书信息
    修改图书信息
    删除图书
    """

    def get_object(self,id):
        try:
            return BookInfo.objects.get(id=id)
        except BookInfo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUNT)

    def get(self, request, id):
        """
        获取单个图书信息
        路由： GET  /books/<pk>/
        """
        book = self.get_object(id)

        serializer = BookInfoSerializer(instance=book)

        return Response(serializer.data,status=200)

    def put(self, request, id):
        """
        修改图书信息
        路由： PUT  /books/<pk>
        """
        book = self.get_object(id)


        serializer = BookInfoSerializer(instance=book,validated_data=book_dict)
        if serializer.is_valid():
            seriaizer.save()

        return Response(serializer.data)


    def delete(self, request, id):
        """
        删除图书
        路由： DELETE /books/<pk>/
        """
        book = self.get_object(id)

        book.delete()

        return Response(status=204)
```

## 3. 定义路由 {#3--定义路由}

在book应用的urls.py中定义路由信息。

```
from Book import views
from django.conf.urls import url
urlpatterns = [
     url(r'^books/$',views.BookListView.as_view()),
     url(r'^books/(?P<id>\d+)$',views.BookDetailView.as_view()),
]
```

## 4. 运行测试 {#4---运行测试}



