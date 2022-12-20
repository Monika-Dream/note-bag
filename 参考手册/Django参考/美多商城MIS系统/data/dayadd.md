## 日增用户统计 {#日增用户统计}

### 接口分析 {#接口分析}

**请求方式**： GET`/meiduo_admin/statistical/day_increment/`

**请求参数**： 通过请求头传递jwt token数据。

**返回数据**： JSON

```
{
        "count": "新增用户量",
        "date": "日期"
}
```

| 返回值 | 类型 | 是否必须 | 说明 |
| :--- | :--- | :--- | :--- |
| count | int | 是 | 新增用户量 |
| date | date | 是 | 日期 |

### 后端实现 {#后端实现}

```py
class UserDailyCountView(APIView):

    permission_classes = [IsAdminUser]

    def get(self,request):
        # 获取当前日期
        now_date = date.today()
        # 获取日增用户总数
        count = User.objects.filter(date_joined__gte=now_date).count()
        return Response({
            'count': count,
            'date': now_date
        })
```



