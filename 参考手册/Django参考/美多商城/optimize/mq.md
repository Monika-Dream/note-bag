# RabbitMQ介绍和使用 {#rabbitmq介绍和使用}

> 思考：
>
> * 如何将`发送短信`从主业务中`解耦`出来。

### 1. 生产者消费者设计模式 {#1-生产者消费者设计模式}

* 最常用的解耦方式之一，寻找**中间人\(broker\)**搭桥，**保证两个业务没有直接关联**。
* 我们称这一解耦方式为：**生产者消费者设计模式**

![](file:///D:/BaiduNetdiskDownload/美多商城讲义+代码+大纲/meiduonote/_book/user-verification-code/images/34生产者消费者模式.png)

> 总结：
>
> * 生产者生成消息，缓存到消息队列中，消费者读取消息队列中的消息并执行。
> * 由美多商城生成发送短信消息，缓存到消息队列中，消费者读取消息队列中的发送短信消息并执行。

### 2. RabbitMQ介绍 {#2-rabbitmq介绍}

* **消息队列**是消息在传输的过程中保存消息的**容器**。
* 现在主流消息队列有：`RabbitMQ`、`ActiveMQ`、`Kafka`等等。
  * **RabbitMQ**和**ActiveMQ**比较
    * 系统吞吐量：`RabbitMQ`好于`ActiveMQ`
    * 持久化消息：`RabbitMQ`和`ActiveMQ`都支持
    * 高并发和可靠性：`RabbitMQ`好于`ActiveMQ`
  * **RabbitMQ**和**Kafka**：
    * 系统吞吐量：`RabbitMQ`弱于`Kafka`
    * 可靠性和稳定性：`RabbitMQ`好于`Kafka`比较
    * 设计初衷：`Kafka`是处理日志的，是日志系统，所以并没有具备一个成熟MQ应该具备的特性。
* 综合考虑，选择**RabbitMQ**作为消息队列。

### 3. 安装RabbitMQ（Docker\) {#3-安装rabbitmq（ubuntu-1604）}

* 下载带管理工具的rabbitmq镜像

```
sudo docker pull rabbitmq:3-management
```

![](/assets/docker_rabbitmq_pull.png)

* 运行，创建容器

```
sudo docker run -d --name rabbit1 --hostname rabbit1 -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

![](/assets/docker_rabbitmq_container.png)

* 在celery中连接配置

```
broker_url= 'amqp://guest:guest@127.0.0.1:5672'
```

![](/assets/docker_rabbitmq.png)

* 在浏览器中查看管理工具地址

```
http://127.0.0.1:15672
```

> user:guest
>
> password:guest



