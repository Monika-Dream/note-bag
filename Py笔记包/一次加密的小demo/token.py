import time

import jwt
import datetime

dic = {
    'iat': datetime.datetime.utcnow(),  #  开始时间
    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=5),  # 过期时间
    'iss': 'lianzong',  # 签名
    'data': {  # 内容，一般存放该用户id和开始时间
        'a': 1,
        'b': 2,
    },
}
# print(datetime.datetime.utcnow())
# print(datetime.datetime.utcnow() + datetime.timedelta(minutes=5))

s = jwt.encode(dic, "123456", algorithm='HS256')  # 加密生成字符串
print(s)
s = jwt.decode(s, "123456", issuer='lianzong', algorithms=['HS256'])  # 解密，校验签名
print(s)
# print(type(s))



