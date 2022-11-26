import base64
import os
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as PKCS1_cipher

Path = os.path.join(os.path.abspath(__file__),"../","../",'.\RSA_KEY')

class DeData_RSA():

	def get_key(self,key_file):
		with open(key_file) as f:
			data = f.read()
			key = RSA.importKey(data)

		return key

	def encrypt_data(self,msg):
		public_key = self.get_key(f'{Path}/public.pem')
		cipher = PKCS1_cipher.new(public_key)
		encrypt_text = base64.b64encode(cipher.encrypt(bytes(msg.encode("utf8"))))
		return encrypt_text.decode('utf-8')


	def decrypt_data(self,encrypt_msg):
		private_key = self.get_key(f'{Path}/private.pem')
		cipher = PKCS1_cipher.new(private_key)
		back_text = cipher.decrypt(base64.b64decode(encrypt_msg), 0)
		return back_text.decode('utf-8')


if __name__ == '__main__':
	dedata_rsa = DeData_RSA()
	result_endata = dedata_rsa.encrypt_data("12346")
	result_dedata = dedata_rsa.decrypt_data(result_endata)
	print(result_endata)
	print(result_dedata)
