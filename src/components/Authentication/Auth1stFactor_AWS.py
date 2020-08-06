# Author - Jigar Makwana B00842568
import boto3
import hmac
import hashlib
import base64
from botocore.vendored import requests

USER_POOL_ID = 'us-east-1_le8dNA92z'
CLIENT_ID = 'bqmkiejhn94c8mlfo6mvd5krc'
CLIENT_SECRET = 'jr3o443m2gnob1rmla79rhcm6rj80b4vp26ddgd1ecsqt5kpep9'
cloudFuction_URL = "https://us-central1-dulcet-library-284522.cloudfunctions.net/Auth2ndFactor"

def getHash(username):
    msg = username + CLIENT_ID
    digest = hmac.new(str(CLIENT_SECRET).encode('utf-8'),
                      msg = str(msg).encode('utf-8'), digestmod=hashlib.sha256).digest()
    hash = base64.b64encode(digest).decode()
    return hash

def initiate_auth(client, username, password):
    secretHash = getHash(username)
    try:
        resp = client.admin_initiate_auth(
            UserPoolId=USER_POOL_ID,
            ClientId=CLIENT_ID,
            AuthFlow='ADMIN_NO_SRP_AUTH',
            AuthParameters={
                'USERNAME': username,
                'SECRET_HASH': secretHash,
                'PASSWORD': password,
            },
            ClientMetadata={
                'username': username,
                'password': password,
            })
    except client.exceptions.NotAuthorizedException:
        return None, "The username or password is incorrect"
    except client.exceptions.UserNotConfirmedException:
        return None, "User is not confirmed"
    except Exception as e:
        return None, e.__str__()

    return resp, None

def Auth2ndFactor(email, securityQue, securityAns):
    authData = {
        "email" : email,
        "securityQue" : securityQue,
        "securityAns" : securityAns
    }
    response = requests.post(cloudFuction_URL, data = authData)
    print("This is message: " +response.text)
    print("This is status: " + str(response.status_code))
    if response.status_code == 200:
        return True
    else:
        return False

def lambda_handler(event, context):
    client = boto3.client('cognito-idp')
    username = event['email']
    password = event['password']
    securityQue = event['securityQue']
    securityAns = event['securityAns']

    # Perform first factor Authentication using AWS Cognito
    resp, msg = initiate_auth(client, username, password)
    if msg != None:
        print("1st Factor Authentication failed.")
        return {'message': "1st Factor Authentication failed.",
                "error": True,
                "success": False}

    if resp.get("AuthenticationResult"):
        is1stFactorAuthPass = True
        # Perform second factor Authentication using GCP
        is2stFactorAuthPass = Auth2ndFactor(username, securityQue, securityAns)

    if is1stFactorAuthPass and is2stFactorAuthPass:
        print("Multi-Factor authentication successful!")
        return {'message': "Multi-Factor authentication successful!",
                "error": False,
                "success": True}
    else:
        print("2nd Factor Authentication failed")
        return {'message': "2nd Factor Authentication failed.",
                "error": True,
                "success": False}
    #   return {'message': "success",
    #           "error": False,
    #           "success": True,
    #           "data": {
    #           "id_token": resp["AuthenticationResult"]["IdToken"],
    #     "refresh_token": resp["AuthenticationResult"]["RefreshToken"],
    #     "access_token": resp["AuthenticationResult"]["AccessToken"],
    #     "expires_in": resp["AuthenticationResult"]["ExpiresIn"],
    #     "token_type": resp["AuthenticationResult"]["TokenType"]
    #         }}
