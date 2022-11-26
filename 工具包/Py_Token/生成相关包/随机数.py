import string
import secrets

def random_string(num):
    res = ''.join(secrets.choice(string.ascii_letters + string.digits) for x in range(num))
    return str(res)