#### REST framework提供的validators {#3）validators}

[验证器](http://www.django-rest-framework.org/api-guide/validators/)

> **注意: 在进行唯一性校验时,如果提交一本已经存在的书籍,就不用实现对应的create方法;**
>
> **如果第一次提交一本不存在的书籍会报错,需要按照笔记中的操作**

* UniqueValidator单字段唯一，如

```
from rest_framework.validators import UniqueValidator

class BookInfoSerializer(serializers.Serializer):

    """图书数据序列化器"""
    id = serializers.IntegerField(label='ID', read_only=True)
    # name = serializers.CharField(label='名称', max_length=20,validators=[custom_validate])
    pub_date = serializers.DateField(label='发布日期', required=False)
    readcount = serializers.IntegerField(label='阅读量', required=False)
    commentcount = serializers.IntegerField(label='评论量', required=False)
    image = serializers.ImageField(label='图片', required=False)
    peopleinfo_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)  # 新增
    #这里
    name = serializers.CharField(max_length=20,validators=[UniqueValidator(queryset=BookInfo.objects.all())])

    def create(self, validated_data):
        return BookInfo.objects.create(**validated_data)
```

测试：第一次数据保存

```
>>> from book.serializers import BookInfoSerializer
>>> data = {'pub_date':'2010-1-1','name':'python高级'}
>>> serializer = BookInfoSerializer(data=data)
>>> serializer.is_valid(raise_exception=True)
True
>>> serializer.errors
{}
>>> serializer.validated_data
OrderedDict([('pub_date', datetime.date(2010, 1, 1)), ('name', 'python高级')])
>>> serializer.save()
<BookInfo: python高级>
```

第二次操作

```
>>> from book.serializers import BookInfoSerializer
>>> data = {'pub_date':'2010-1-1','name':'python高级'}
>>> serializer = BookInfoSerializer(data=data)
>>> serializer.is_valid(raise_exception=True)
Traceback (most recent call last):
  File "<console>", line 1, in <module>
  File "/Users/yangjianmei/.virtualenvs/py3_django_1.11/lib/python3.5/site-packages/rest_framework/serializers.py", line 244, in is_valid
    raise ValidationError(self.errors)
rest_framework.exceptions.ValidationError: {'name': [ErrorDetail(string='This field must be unique.', code='unique')]}
>>> serializer.errors
{'name': [ErrorDetail(string='This field must be unique.', code='unique')]}
>>> serializer.validated_data
{}
>>>
```

* UniqueTogetherValidation联合唯一，如

* ```
  from rest_framework.validators import UniqueTogetherValidator

  class BookInfoSerializer(serializers.Serializer):

      """图书数据序列化器"""
      id = serializers.IntegerField(label='ID', read_only=True)
      name = serializers.CharField(label='名称', max_length=20)
      pub_date = serializers.DateField(label='发布日期', required=False)
      readcount = serializers.IntegerField(label='阅读量', required=False)
      commentcount = serializers.IntegerField(label='评论量', required=False)
      image = serializers.ImageField(label='图片', required=False)
      peopleinfo_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)  # 新增

      class Meta:
          validators = [
              UniqueTogetherValidator(
                  queryset=BookInfo.objects.all(),
                  fields= ('name','pub_date')
              )
          ]

      def create(self, validated_data):
          return BookInfo.objects.create(**validated_data)
  ```

  测试：第一次插入 `data={'pub_date':'2010-1-1','name':'go语言'}`

  ```
  >>> from book.serializers import BookInfoSerializer
  >>> data = {'pub_date':'2010-1-1','name':'go语言'}
  >>> serializer = BookInfoSerializer(data=data)
  >>> serializer.is_valid(raise_exception=True)
  True
  >>> serializer.errors
  {}
  >>> serializer.validated_data
  OrderedDict([('name', 'go语言'), ('pub_date', datetime.date(2010, 1, 1))])
  >>> serializer.save()
  <BookInfo: go语言>
  ```

  第二次插入

* ```
  >>> 
  >>> from book.serializers import BookInfoSerializer
  >>> data = {'pub_date':'2010-2-1','name':'go语言'}
  >>> serializer = BookInfoSerializer(data=data)
  >>> serializer.is_valid(raise_exception=True)
  True
  >>> serializer.errors
  {}
  >>> serializer.validated_data
  OrderedDict([('name', 'go语言'), ('pub_date', datetime.date(2010, 2, 1))])
  >>> serializer.save()
  <BookInfo: go语言>
  ```

  第三次插入

* ```
  >>> from book.serializers import BookInfoSerializer
  >>> data = {'pub_date':'2010-2-1','name':'go语言'}
  >>> serializer = BookInfoSerializer(data=data)
  >>> serializer.is_valid(raise_exception=True)
  Traceback (most recent call last):
    File "<console>", line 1, in <module>
    File "/Users/yangjianmei/.virtualenvs/py3_django_1.11/lib/python3.5/site-packages/rest_framework/serializers.py", line 244, in is_valid
      raise ValidationError(self.errors)
  rest_framework.exceptions.ValidationError: {'non_field_errors': [ErrorDetail(string='The fields name, pub_date must make a unique set.', code='unique')]}
  >>> serializer.errors
  {'non_field_errors': [ErrorDetail(string='The fields name, pub_date must make a unique set.', code='unique')]}
  >>> serializer.validated_data
  {}
  >>>
  ```



