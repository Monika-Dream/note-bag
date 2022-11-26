import base64
import os
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA
from Crypto.Signature import PKCS1_v1_5 as PKCS1_signature
Path = os.path.join(os.path.abspath(__file__),"../","../",'.\RSA_KEY')

class Signature():

    def get_key(self,key_file):
        with open(key_file) as f:
            data = f.read()
            key = RSA.importKey(data)
        return key

    def rsa_private_sign(self,data):
        private_key = self.get_key(f'{Path}/private.pem')
        signer = PKCS1_signature.new(private_key)
        digest = SHA.new()
        digest.update(data.encode("utf8"))
        sign = signer.sign(digest)
        signature = base64.b64encode(sign)
        signature = signature.decode('utf-8')
        return signature

    def rsa_public_check_sign(self, text, sign):
        publick_key = self.get_key(f'{Path}/public.pem')
        verifier = PKCS1_signature.new(publick_key)
        digest = SHA.new()
        digest.update(text.encode("utf8"))
        return verifier.verify(digest, base64.b64decode(sign))




if __name__ == '__main__':
    msg = 'coolpython.net'
    signature = Signature()
    sign = signature.rsa_private_sign(msg)
    print(signature.rsa_public_check_sign(msg, sign))

