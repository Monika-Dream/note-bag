import os
from Crypto.Cipher import AES
import base64
import json as JSON

class FileAES:
    def __init__(self,iv):
        self.iv = self.add_some_trip(iv.encode())   #CBC 模式下的偏移量
        self.mode = AES.MODE_CBC  #操作模式选择CBC

    def encrypt(self,Key,Text):
        """加密函数"""

        self.key = Key.encode('utf-8')
        file_aes = AES.new(self.key,self.mode,self.iv)  #创建AES加密对象
        text = Text.encode('utf-8')  #明文必须编码成字节流数据，即数据类型为bytes
        text = self.add_some_trip(text)  # 如果字节型数据长度不是16倍整数就进行补充
        en_text = file_aes.encrypt(text)  #明文进行加密，返回加密后的字节流数据
        return str(base64.b64encode(en_text),encoding='utf-8')  #将加密后得到的字节流数据进行base64编码并再转换为unicode类型

    def decrypt(self,text):
        """解密函数"""
        file_aes = AES.new(self.key,self.mode,self.iv)
        text = bytes(text,encoding='utf-8')  #将密文转换为bytes，此时的密文还是由basen64编码过的
        text = base64.b64decode(text)   #对密文再进行base64解码
        de_text = file_aes.decrypt(text)  #密文进行解密，返回明文的bytes
        try:
            return str(de_text,encoding='utf-8').strip()  #将解密后得到的bytes型数据转换为str型，并去除末尾的填充
        except UnicodeDecodeError as error:
            return {'msg':"数据可能被人篡改, 请重新校验",'errmsg':f"{error}"}

    def add_some_trip(self,call):
        while len(call) % 16 != 0:  # 对字节型数据进行长度判断
            call += b'\x00'
        return call

if __name__ == '__main__':
    key = "DDLC_FOREVER"
    iv = "ahcn74mudh59plug"
    text = '你好哈哈哈哈哈'  # 需要加密的内容
    aes_test = FileAES(iv)
    cipher_text = aes_test.encrypt(Key=key,Text=text)
    init_text = aes_test.decrypt(cipher_text)
    print('加密后：'+cipher_text)
    print('解密后：'+init_text)
