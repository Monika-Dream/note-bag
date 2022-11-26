import jwt
import datetime
from Crypto import Random
from Crypto.PublicKey import RSA

class Token():
    instance = None
    def __new__(cls, *args, **kwargs):
        if cls.instance is None:
            cls.instance = super().__new__(cls)
        return cls.instance

    # TODO             签名      AES偏移量  AES密钥
    def __init__(self, iss: str, iv:str, key:str) -> None:
        self.data = None
        self.iv = iv.encode()
        self.key = key.encode()
        self.iss = iss,
        self.token_data = None
        self.RSA_Key()

    def RSA_Key(self):
        random_generator = Random.new().read
        rsa = RSA.generate(2048, random_generator)
        # 私钥
        with open("RSA密钥/private.pem", "wb") as f:
            f.write(rsa.exportKey())
        # 公钥
        with open("RSA密钥/public.pem", "wb") as f:
            f.write(rsa.publickey().exportKey())

    def flushed_time(self,Minutes=5):
        if (type(self.iss) == tuple):
            self.iss = list(self.iss)[0]
        self.exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=Minutes)

    def Synthetic_Tokens(self,Minutes: int, Data:object)->object:
        self.flushed_time(Minutes=Minutes)

        self.token_data = {
            'iat': datetime.datetime.utcnow(),  # 开始时间
            'exp': self.exp,  # 过期时间
            'iss': self.iss,  # 签名
            'key': self.key.decode(),
            'data': Data,
        }
        return self.token_data

    def Encode_Token(self,Minutes: int, Data:object):
        token = self.Synthetic_Tokens(Minutes, Data)
        for tokenKey in token:
            if tokenKey == "data":continue
            token_value = token.get(tokenKey)
            print(token_value)




token = Token(iss="Monika",iv="123456",key="13456")
data = {
    'name':"Monika",
    'gender':'女',
    'super':'true',
    'age':18
}

token.Encode_Token(Minutes=5, Data=data)




# {'iat': datetime.datetime(2022, 11, 25, 14, 41, 14, 923469),
#  'exp': datetime.datetime(2022, 11, 25, 14, 46, 14, 923469),
#  'iss': ('Monika',),
#  'data': {'name': 'Monika', 'gender': '女', 'super': 'true', 'age': 18}
#  }
