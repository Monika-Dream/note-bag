# 用户总量统计

### 接口分析 {#接口分析}

**请求方式**： GET`/meiduo_admin/statistical/total_count/`

**请求参数**： 通过请求头传递jwt token数据。

**返回数据**： JSON

```
{
        "count": "总用户量",
        "date": "日期"
}
```

| 返回值 | 类型 | 是否必须 | 说明 |
| :--- | :--- | :--- | :--- |
| count | int | 是 | 总用户量 |
| date | date | 是 | 日期 |

### 后端实现 {#后端实现}

创建数据统计视图文件

![](/assets/views_statistical.png)

实现代码

```py
from datetime import date
from users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

class UserTotalCountView(APIView):
    #管理员权限
    permission_classes = [IsAdminUser]

    def get(self,request):
        # 获取当前日期
        now_date = date.today()
        # 获取所有用户总数
        count = User.objects.all().count()
        return Response({
            'count': count,
            'date': now_date
        })
```

请求

![](/assets/total_count_result.png)

