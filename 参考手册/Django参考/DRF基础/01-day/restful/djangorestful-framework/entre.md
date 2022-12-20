# Django REST framework入门 {#见识drf的魅力}

## 1. 创建序列化器 {#1--创建序列化器}

在`book`目录中创建一个文件`serializers.py`并添加以下内容

    from rest_framework import serializers
    from Book.models import BookInfo

    class BookInfoSerializer(serializers.Serializer):
        """图书数据序列化器"""
        id = serializers.IntegerField(label='ID', read_only=True)
        name = serializers.CharField(label='名称', max_length=20)
        pub_date = serializers.DateField(label='发布日期', required=False)
        readcount = serializers.IntegerField(label='阅读量', required=False)
        commentcount = serializers.IntegerField(label='评论量', required=False)
        image = serializers.ImageField(label='图片', required=False)

        def create(self, validated_data):
            """
            给定验证的数据，创建并返回一个新的`BookInfo`实例
            """
            return BookInfo.objects.create(**validated_data)

        def update(self, instance, validated_data):
            """
            根据已验证的数据更新并返回现有的`BookInfo`实例
            """
            instance.name = validated_data.get('name', instance.name)
            instance.pub_date = validated_data.get('pub_date',instance.pub_date)
            instance.readcount = validated_data.get('readcount',instance.readcount)
            instance.commentcount = validated_data.get('commentcount',instance.commentcount)
            instance.image = validated_data.get('image',instance.image)
            instance.save()
            return instance

## 2. 编写视图 {#2--编写视图}

在`views`中的代码修改为一下内容

```
from django.views.generic import View
from book.models import BookInfo
from django.http import JsonResponse,HttpResponse
import json
from book.serializers import BookInfoSerializer

# Create your views here.
class BookListView(View):
    """
    查询所有图书、增加图书
    """
    def get(self, request):
        """
        查询所有图书
        路由：GET /books/
        """
        queryset = BookInfo.objects.all()
        serializer = BookInfoSerializer(instance=queryset,many=True)
        return JsonResponse(serializer.data, safe=False,status=200)

    def post(self, request):
        """
        新增图书
        路由：POST /books/
        """
        json_bytes = request.body
        json_str = json_bytes.decode()
        book_dict = json.loads(json_str)

        # 此处详细的校验参数省略

        serializer = BookInfoSerializer(data=book_dict)
        #必须要调用is_valid进行校验
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)
        return JsonResponse(serializer.errors,status=404)

class BookDetailView(View):
    """
    获取单个图书信息
    修改图书信息
    删除图书
    """
    def get(self, request, id):
        """
        获取单个图书信息
        路由： GET  /books/<pk>/
        """
        try:
            book = BookInfo.objects.get(id=id)
        except BookInfo.DoesNotExist:
            return HttpResponse(status=404)

        serializer = BookInfoSerializer(instance=book)

        return JsonResponse(serializer.data,status=200)

    def put(self, request, id):
        """
        修改图书信息
        路由： PUT  /books/<pk>
        """
        try:
            book = BookInfo.objects.get(id=id)
        except BookInfo.DoesNotExist:
            return HttpResponse(status=404)

        json_bytes = request.body
        json_str = json_bytes.decode()
        book_dict = json.loads(json_str)

        # 此处详细的校验参数省略

        serializer = BookInfoSerializer(instance=book,validated_data=book_dict)
        if serializer.is_valid():
            seriaizer.save()
        return JsonResponse(serializer.data)


    def delete(self, request, id):
        """
        删除图书
        路由： DELETE /books/<pk>/
        """
        try:
            book = BookInfo.objects.get(id=id)
        except BookInfo.DoesNotExist:
            return HttpResponse(status=404)

        book.delete()

        return HttpResponse(status=204)
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



