import jwt
import datetime
import json as JSON
from Crypto import Random
from Crypto.PublicKey import RSA
from .create_help_bag.AES import FileAES
from .create_help_bag.RSA import DeData_RSA
from .create_help_bag.随机数 import random_string
from .create_help_bag.RSA_Signature import Signature

class Token(FileAES):
    instance = None
    dedata_rsa = DeData_RSA()
    signature = Signature()
    def __new__(cls, *args, **kwargs):
        if cls.instance is None:
            cls.instance = super().__new__(cls)
            # 创建 RSA 公钥与私钥
            # cls.__RSA_Key()
        return cls.instance

    @classmethod
    def __RSA_Key(self):
        random_generator = Random.new().read
        rsa = RSA.generate(2048, random_generator)
        # 私钥
        with open("RSA_KEY/private.pem", "wb") as f:
            f.write(rsa.exportKey())
        # 公钥
        with open("RSA_KEY/public.pem", "wb") as f:
            f.write(rsa.publickey().exportKey())


    # TODO             AES偏移量
    def __init__(self, iv: str, Tokenkey:str) -> None:
        super().__init__(iv=iv)
        self.Token_WEB_key = Tokenkey

    def Send_Encode_Token(self, Data:object, Minutes:int=5):
        self.__Token = None                #TODO Token 数据
        self.__Token_Data=Data             #TODO Token_data 数据
        self.__Minutes = Minutes           #TODO Token 存活时间
        self.__EXP = None                  #TODO Token 结束时间
        self.__AES_KEY = random_string(16) #TODO AES加密密钥
        self.__Signature = None            #TODO 数据的签名( 防止篡改 )
        self.__encodeJWT = None            #TODO 网页传输用到的 Token

        def FLUSHED_TIME():
            self.__EXP = datetime.datetime.utcnow() + datetime.timedelta(minutes=Minutes)

        def Synthetic_Tokens():
            self.__Token = {
                'iat': datetime.datetime.utcnow(),  # 开始时间
                'exp': self.__EXP,  # 过期时间
                'signature': self.__Signature,  # 签名
                'key': self.__AES_KEY,
                'data': self.__Token_Data,
            }

        def Encode_Token():
            # print()
            token_data_str = JSON.dumps(self.__Token.get('data'),indent=2)
            token_key_str = self.__Token.get('key')
            def Change_Token_As_Decode():
                self.__Token['data'] = self.encrypt(Key=token_key_str,Text=token_data_str)
                self.__Token['key'] = self.dedata_rsa.encrypt_data(token_key_str)
                self.__Token['signature'] = self.signature.rsa_private_sign(token_data_str)
            return Change_Token_As_Decode

        def send_JWT():
            self.__encodeJWT = \
                jwt.encode(self.__Token, self.Token_WEB_key, algorithm='HS256')

        FLUSHED_TIME()
        Synthetic_Tokens()
        Encode_Token()()
        send_JWT()

        return self.__encodeJWT

    def Get_Decode_Token(self,DecodeToken, safe:bool=True):
        self.DecodeToken = None             #TODO 解开后的网页 Token
        self.Token_key = None               #TODO Token内部的 AESKey
        self.Token_data = None              #TODO Token内部的 Data

        def Decode_WEB_Token():
            try:
                self.DecodeToken = jwt.decode(DecodeToken, self.Token_WEB_key, algorithms=['HS256'])
            except jwt.exceptions.DecodeError as err:
                raise "兄啊, 你的加密 token/密钥 没传正确吧?"
            except jwt.exceptions.ExpiredSignatureError as err:
                raise "你这 Token 超时了"


        def Decode_Token_key():
            Token_key = self.DecodeToken.get('key')
            self.Token_key = self.dedata_rsa.decrypt_data(Token_key)

        def GetData_insecurity():
            Data = self.DecodeToken.get('data')
            DeData = self.decrypt(text=Data).strip(b'\x00'.decode())
            self.Token_data = JSON.loads(DeData)

        def GetData_safe():
            sign = self.DecodeToken.get('signature')
            Data = self.DecodeToken.get('data')
            data = self.decrypt(text=Data).strip(b'\x00'.decode())
            try:
                assert self.signature.rsa_public_check_sign(data, sign), "Token 数据被人动了"
            except AssertionError as err:
                print(err)
            else:
                self.Token_data = JSON.loads(data)
                return
            self.Token_data = None

        Decode_WEB_Token()
        Decode_Token_key()

        if(safe == False):
            GetData_insecurity()
        else:
            GetData_safe()

        return self.Token_data





if __name__ == '__main__':

    token = Token(iv="123456", Tokenkey="token密钥")
    data = {
        "name": "Monika",
        "gender": "woman",
        "super": "true",
        "age": "18"
    }

    en_Token = token.Send_Encode_Token(Minutes=5, Data=data)
    print(en_Token)
    de_token = token.Get_Decode_Token(DecodeToken=en_Token)
    print(de_token)





