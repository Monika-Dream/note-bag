# 我的订单 {#我的订单}

![](/assets/06我的订单.png)

> **1.请求方式**

| 选项 | 方案 |
| :--- | :--- |
| **请求方法** | GET |
| **请求地址** | /orders/info/\(?P&lt;page\_num&gt;\d+\)/ |

> **2.请求参数：路径参数**

| 参数名 | 类型 | 是否必传 | 说明 |
| :--- | :--- | :--- | :--- |
| **page\_num** | int | 是 | 当前页码 |

> **3.响应结果：HTML**

```
user_center_order.html
```

> **4.后端接口定义和实现**

```
class UserOrderInfoView(LoginRequiredMixin, View):
    """我的订单"""

    def get(self, request, page_num):
        """提供我的订单页面"""
        user = request.user
        # 查询订单
        orders = user.orderinfo_set.all().order_by("-create_time")
        # 遍历所有订单
        for order in orders:
            # 绑定订单状态
            order.status_name = OrderInfo.ORDER_STATUS_CHOICES[order.status-1][1]
            # 绑定支付方式
            order.pay_method_name = OrderInfo.PAY_METHOD_CHOICES[order.pay_method-1][1]
            order.sku_list = []
            # 查询订单商品
            order_goods = order.skus.all()
            # 遍历订单商品
            for order_good in order_goods:
                sku = order_good.sku
                sku.count = order_good.count
                sku.amount = sku.price * sku.count
                order.sku_list.append(sku)

        # 分页
        page_num = int(page_num)
        try:
            paginator = Paginator(orders, constants.ORDERS_LIST_LIMIT)
            page_orders = paginator.page(page_num)
            total_page = paginator.num_pages
        except EmptyPage:
            return http.HttpResponseNotFound('订单不存在')

        context = {
            "page_orders": page_orders,
            'total_page': total_page,
            'page_num': page_num,
        }
        return render(request, "user_center_order.html", context)
```

> **5.渲染我的订单信息**

```
<div class="right_content clearfix">
    <h3 class="common_title2">全部订单</h3>
    {% for order in page_orders %}
    <ul class="order_list_th w978 clearfix">
        <li class="col01">{{ order.create_time.strftime('%Y-%m-%d %H:%M:%S') }}</li>
        <li class="col02">订单号：{{ order.order_id }}</li>
    </ul>
    <table class="order_list_table w980">
        <tbody>
            <tr>
                <td width="55%">
                    {% for sku in order.sku_list %}
                    <ul class="order_goods_list clearfix">
                        <li class="col01"><img src="{{ sku.default_image.url }}"></li>
                        <li class="col02"><span>{{ sku.name }}</span><em>{{ sku.price }}元</em></li>
                        <li class="col03">{{ sku.count }}</li>
                        <li class="col04">{{ sku.amount }}元</li>
                    </ul>
                    {% endfor %}
                </td>
                <td width="15%">{{ order.total_amount }}元<br>含运费：{{ order.freight }}元</td>
                <td width="15%">{{ order.pay_method_name }}</td>
                <td width="15%">
                    <a @click="oper_btn_click('{{ order.order_id }}', {{ order.status }})" class="oper_btn">{{ order.status_name }}</a>
                </td>
            </tr>
        </tbody>
    </table>
    {% endfor %}
    <div class="pagenation">
        <div id="pagination" class="page"></div>
    </div>
</div>
```



