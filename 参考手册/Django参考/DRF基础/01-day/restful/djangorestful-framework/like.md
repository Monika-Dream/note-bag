# 见识DRF的魅力 {#见识drf的魅力}

## 1. 创建序列化器 {#1--创建序列化器}

在应用中创建`serializers.py`文件，并创建`BookInfoModelSerializer类`。

```py
from rest_framework import serializers
from book.models import BookInfo

class BookInfoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookInfo
        fields = '__all__'
```

* **model**指明该序列化器处理的数据字段从模型类BookInfo参考生成
* **fields**指明该序列化器包含模型类中的哪些字段，'\_\_all\_\_'指明包含所有字段

## 2. 编写视图 {#2--编写视图}

在book应用的views.py中创建视图`BookInfoViewSet`这是一个视图集合，让他继承自`ModelViewSet`。

```py
from book.models import BookInfo
from book.serializers import BookInfoModelSerializer
from rest_framework.viewsets import ModelViewSet

class BookInfoViewSet(ModelViewSet):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoModelSerializer
```

* **queryset**指明该视图集在查询数据时使用的查询集
* **serializer\_class**指明该视图在进行序列化或反序列化时使用的序列化器

## 3. 定义路由 {#3--定义路由}

在book应用的urls.py中定义路由信息。

```py
from django.urls import re_path
from book import views
urlpatterns = [
    # re_path(r'^books/$', views.BookListView.as_view()),
    # re_path(r'^books/(?P<id>\d+)$', views.BookDetailView.as_view()),
]

from rest_framework.routers import DefaultRouter
# 可以处理视图的路由器
router = DefaultRouter()  
# 向路由器中注册视图集
router.register(r'books', views.BookInfoViewSet,basename='')  
#追加路由
urlpatterns += router.urls
```

## 4. 运行测试 {#4---运行测试}

运行当前程序（与运行Django一样）

```
python manage.py runserver
```

在浏览器中输入网址127.0.0.1:8000，可以看到DRF提供的API Web浏览页面：

![](/assets/index.png)

1）点击链接127.0.0.1:8000/books/ 可以访问**获取所有数据的接口**，呈现如下页面：

![](/assets/books.png)

2）在页面底下表单部分填写图书信息，可以访问**添加新图书的接口**，保存新书：

![](/assets/books_post.png)

点击POST后，返回如下页面信息：

![](/assets/books_post_after.png)

3）在浏览器中输入网址127.0.0.1:8000/books/8/，可以访问**获取单一图书信息的接口**（id为1的图书），呈现如下页面：

![](/assets/book_detail.png)

4）在页面底部表单中填写图书信息，可以访问**修改图书的接口**：

![](/assets/put.png)

点击PUT，返回如下页面信息：

![](/assets/put_after.png)

5）点击DELETE按钮，可以访问**删除图书的接口**：

![](/assets/books_delete.png)

返回，如下页面：

![](/assets/delete_after.png)

至此，是不是发现Django REST framework很好用！

