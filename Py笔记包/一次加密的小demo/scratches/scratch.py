import os

from authlib.jose import jwt, JsonWebKey, JsonWebSignature

#TODO 对称密钥加密 哈希

# header = {'alg': 'HS256'}
# payload = b"Hello"
# secret = '123abc.dsfergergewfewgergrwgergerf不嗲u号都i哦菩萨空地和'
# token = jwt.encode(header, payload, secret)
# detoken = jwt.decode(token,secret)
# print(token)
# print(detoken)


#TODO 非对称密钥加密 RSA


# from authlib.jose import jwt
# header = {'alg': 'RS256'}
#
# payload = {'iss': 'Authlib', 'sub': '123','key':"Love_Monika"}
#
# private_key = open("./private.pem","r").read(-1)
# s = jwt.encode(header, payload, private_key)
# public_key = open("./public.pem","r").read(-1)
# claims = jwt.decode(s, public_key)
# print(s)
# print(claims)
# print(claims.header)
# claims.validate()

# 测试最终的加密
JWT_token = {
    'username':"Monika",
    'age':"18",
    'userBackground':'imagePath',
    'permissions':"root",
    'key':'123456'
}

from authlib.jose import JsonWebEncryption
from AES import FileAES
iv = os.urandom(16)
key = os.urandom(16)
aes_test = FileAES(key,iv)
for i in JWT_token:
    if i == 'key': continue
    JWT_token[i] = aes_test.encrypt(JWT_token.get(i))


jwe = JsonWebEncryption()
protected = {'alg': 'RSA-OAEP', 'enc': 'A256GCM'}
payload = JWT_token.get('key').encode()
with open('public.pem', 'rb') as f:
    key = f.read()

s = jwe.serialize_compact(protected, payload, key)
with open('private.pem', 'rb') as f:
    key = f.read()

JWT_token['key'] = s.decode()
# print(jwe.deserialize_compact(key=key,s=s))


# print(JWT_token)

# print(JWT_token)

from authlib.jose import jwt
header = {'alg': 'HS256'}
payload = JWT_token
secret = '123456'
token = jwt.encode(header, payload, secret)
detoken = jwt.decode(token,secret)
print(token)
# print(detoken)





