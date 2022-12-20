#### validators {#3）validators}

在字段中添加validators选项参数，也可以补充验证行为，如

```
class BookInfoSerializer(serializers.Serializer):

    def custom_validate(value):
        raise serializers.ValidationError('我就是来捣乱的')

    """图书数据序列化器"""
    id = serializers.IntegerField(label='ID', read_only=True)
    name = serializers.CharField(label='名称', max_length=20,validators=[custom_validate])
    pub_date = serializers.DateField(label='发布日期', required=False)
    readcount = serializers.IntegerField(label='阅读量', required=False)
    commentcount = serializers.IntegerField(label='评论量', required=False)
    image = serializers.ImageField(label='图片', required=False)
    peopleinfo_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)  # 新增
```

测试：

```
>>> from book.serializers import BookInfoSerializer
>>> data = {'pub_date':'2010-1-1','name':'python高级'}
>>> serializer = BookInfoSerializer(data=data)
>>> serializer.is_valid(raise_exception=True)
Traceback (most recent call last):
  File "<console>", line 1, in <module>
  File "/Users/yangjianmei/.virtualenvs/py3_django_1.11/lib/python3.5/site-packages/rest_framework/serializers.py", line 244, in is_valid
    raise ValidationError(self.errors)
rest_framework.exceptions.ValidationError: {'name': [ErrorDetail(string='我就是来捣乱的', code='invalid')]}
>>> serializer.errors
{'name': [ErrorDetail(string='我就是来捣乱的', code='invalid')]}
>>> serializer.validated_data
{}
```



