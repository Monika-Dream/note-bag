# 详情页展示评价信息 {#详情页展示评价信息}

![](/assets/17商品详情页显示评价信息1.png)

---

![](/assets/17商品详情页显示评价信息2.png)

> **1.请求方式**

| 选项 | 方案 |
| :--- | :--- |
| **请求方法** | POST |
| **请求地址** | /comments/\(?P&lt;sku\_id&gt;\d+\)/ |

> **2.请求参数：查询参数**

| 参数名 | 类型 | 是否必传 | 说明 |
| :--- | :--- | :--- | :--- |
| **sku\_id** | int | 是 | 商品SKU编号 |

> **3.响应结果：JSON**

| 字段 | 说明 |
| :--- | :--- |
| **code** | 状态码 |
| **errmsg** | 错误信息 |
| **comment\_list\[ \]** | 评价列表 |
| **username** | 发表评价的用户 |
| **comment** | 评价内容 |
| **score** | 分数 |

```
{
    "code":"0",
    "errmsg":"OK",
    "comment_list":[
        {
            "username":"itcast",
            "comment":"这是一个好手机！",
            "score":4
        }
    ]
}
```

> **4.后端接口定义和实现**

```
class GoodsCommentView(View):
    """订单商品评价信息"""

    def get(self, request, sku_id):
        # 获取被评价的订单商品信息
        order_goods_list = OrderGoods.objects.filter(sku_id=sku_id, is_commented=True).order_by('-create_time')[:30]
        # 序列化
        comment_list = []
        for order_goods in order_goods_list:
            username = order_goods.order.user.username
            comment_list.append({
                'username': username[0] + '***' + username[-1] if order_goods.is_anonymous else username,
                'comment':order_goods.comment,
                'score':order_goods.score,
            })
        return http.JsonResponse({'code':RETCODE.OK, 'errmsg':'OK', 'comment_list': comment_list})
```

> **5.渲染商品评价信息**

```
<div @click="on_tab_content('comment')" class="tab_content" :class="tab_content.comment?'current':''">
    <ul class="judge_list_con">
        <li class="judge_list fl" v-for="comment in comments">
            <div class="user_info fl">
                <b>[[comment.username]]</b>
            </div>
            <div class="judge_info fl">
                <div :class="comment.score_class"></div>
                <div class="judge_detail">[[comment.comment]]</div>
            </div>
        </li>
    </ul>
</div>
```

```
<li @click="on_tab_content('comment')" :class="tab_content.comment?'active':''">商品评价([[ comments.length ]])</li>
```

```
<div class="price_bar">
    <span class="show_pirce">¥<em>{{ sku.price }}</em></span>
    <a href="javascript:;" class="goods_judge">[[ comments.length ]]人评价</a>
</div>
```

> 提示：订单商品评价完成后，一个订单的流程就结束了，订单状态修改为`已完成`。

![](/assets/18评价完成.png)

