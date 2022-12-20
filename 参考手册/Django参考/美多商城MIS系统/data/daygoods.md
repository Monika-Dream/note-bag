# 统计分类商品访问量

## 项目1功能实现

> 提示：
>
> * 统计分类商品访问量 是统计一天内该类别的商品被访问的次数。
> * 需要统计的数据，包括商品分类，访问次数，访问时间。
> * 一天内，一种类别，统计一条记录。

![](/assets/统计分类商品访问量.png)

### 1. 统计分类商品访问量模型类 {#1-统计分类商品访问量模型类}

> 模型类定义在`goods.models.py`中，然后完成迁移建表。

```
class GoodsVisitCount(BaseModel):
    """统计分类商品访问量模型类"""
    category = models.ForeignKey(GoodsCategory, on_delete=models.CASCADE, verbose_name='商品分类')
    count = models.IntegerField(verbose_name='访问量', default=0)
    date = models.DateField(auto_now_add=True, verbose_name='统计日期')

    class Meta:
        db_table = 'tb_goods_visit'
        verbose_name = '统计分类商品访问量'
        verbose_name_plural = verbose_name
```

> python manage.py makemigrations
>
> python manage.py migrate

### 2. 统计分类商品访问量后端逻辑 {#2-统计分类商品访问量后端逻辑}

> **1.请求方式**

| 选项 | 方案 |
| :--- | :--- |
| **请求方法** | POST |
| **请求地址** | /detail/visit/\(?P&lt;category\_id&gt;\d+\)/ |

> **2.请求参数：路径参数**

| 参数名 | 类型 | 是否必传 | 说明 |
| :--- | :--- | :--- | :--- |
| **category\_id** | string | 是 | 商品分类ID，第三级分类 |

> **3.响应结果：JSON**

| 字段 | 说明 |
| :--- | :--- |
| **code** | 状态码 |
| **errmsg** | 错误信息 |

> **4.后端接口定义和实现**，
>
> * 如果访问记录存在，说明今天不是第一次访问，不新建记录，访问量直接累加。
> * 如果访问记录不存在，说明今天是第一次访问，新建记录并保存访问量。

```
class DetailVisitView(View):
    """详情页分类商品访问量"""

    def post(self, request, category_id):
        """记录分类商品访问量"""
        try:
            category = GoodsCategory.objects.get(id=category_id)
        except GoodsCategory.DoesNotExist:
            return http.HttpResponseBadRequest('缺少必传参数')

        # 获取今天的日期
        t = timezone.localtime()
        today_str = '%d-%02d-%02d' % (t.year, t.month, t.day)
        today_date = datetime.datetime.strptime(today_str, '%Y-%m-%d')
        try:
            # 查询今天该类别的商品的访问量
            counts_data = category.goodsvisitcount_set.get(date=today_date)
        except models.GoodsVisitCount.DoesNotExist:
            # 如果该类别的商品在今天没有过访问记录，就新建一个访问记录
            counts_data = GoodsVisitCount()

        try:
            counts_data.category = category
            counts_data.count += 1
            counts_data.save()
        except Exception as e:
            logger.error(e)
            return http.HttpResponseServerError('服务器异常')

        return http.JsonResponse({'code': RETCODE.OK, 'errmsg': 'OK'})
```

## 项目二实现 日分类商品访问量

![](/assets/daily_goods_view_count.png)

### 接口分析 {#接口分析}

**请求方式**： GET`/meiduo_admin/statistical/goods_day_views/`

**请求参数**： 通过请求头传递jwt token数据。

**返回数据**： JSON

```
[
        {
            "category": "分类名称",
            "count": "访问量"
        },
        {
            "category": "分类名称",
            "count": "访问量"
        },
        ...
    ]
```

| 返回值 | 类型 | 是否必须 | 说明 |
| :--- | :--- | :--- | :--- |
| category | int | 是 | 分类名称 |
| count | int | 是 | 访问量 |

### 后端实现 {#后端实现}

```py
from apps.goods.models import GoodsVisitCount
from apps.meiduo_admin.serializers.statistical import UserCategoryCountSerializer
class UserCategoryCountAPIView(APIView):
    #添加权限
    permission_classes = [IsAdminUser]

    def get(self,request):

        #获取当天日期
        today=date.today()

        #查询数据
        data = GoodsVisitCount.objects.filter(date__gte=today)

        serializer = UserCategoryCountSerializer(data,many=True)

        return Response(serializer.data)
```

序列化器

```py
from rest_framework import serializers
from apps.goods.models import GoodsVisitCount


class UserCategoryCountSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only=True)
    class Meta:
        model=GoodsVisitCount
        fields=['count','category']
```



