# /*@Author - Jigar Makwana B00842568*/
import boto3
import hmac
import hashlib
import base64
import pymysql

USER_POOL_ID = 'us-east-1_le8dNA92z'
CLIENT_ID = 'bqmkiejhn94c8mlfo6mvd5krc'
CLIENT_SECRET = 'jr3o443m2gnob1rmla79rhcm6rj80b4vp26ddgd1ecsqt5kpep9'

DB_HOST = 'serverless-project.ckwpe1lbmfqz.us-east-1.rds.amazonaws.com'
DB_USER = 'root'
DB_PASS = 'rootuser'
DB_NAME = 'DALServerlessLMS'
INSERT_USER_QUERY = "INSERT INTO Users (username, email, password, instituteName, userState) VALUES (%s,%s,%s,%s,%s)"

def connectDatabase():
    try:
        connection = pymysql.connect(DB_HOST, user=DB_USER, passwd=DB_PASS, db=DB_NAME, connect_timeout=5)
    except pymysql.MySQLError as error:
        print(error)
    return connection

def hashPassword(unhashedPsswd):
    # SHA256 encryption used for generating the hash
    return hashlib.sha256(unhashedPsswd.encode('utf-8')).hexdigest()

def addUserToRDS(name, email, password, instituteName):
    db = connectDatabase()
    cursor = db.cursor()
    userState = str(0)
    hashedPsswd = hashPassword(password)
    values = (name, email, hashedPsswd, instituteName, userState)
    cursor.execute(INSERT_USER_QUERY, values)
    db.commit()
    print("Data added to RDS!")

def getHash(username):
    msg = username + CLIENT_ID
    digest = hmac.new(str(CLIENT_SECRET).encode('utf-8'),
                      msg = str(msg).encode('utf-8'), digestmod=hashlib.sha256).digest()
    hash = base64.b64encode(digest).decode()
    return hash

def lambda_handler(event, context):
    # Parse out body
    username = event['body']['email']
    email = event['body']["email"]
    password = event['body']['password']
    name = event['body']['username']
    instituteName = event['body']["instituteName"]

    client = boto3.client('cognito-idp')
    try:
        resp = client.sign_up(
            ClientId=CLIENT_ID,
            SecretHash=getHash(username),
            Username=username,
            Password=password,
            UserAttributes=[
                {
                    'Name': "email",
                    'Value': email
                },
                {
                    'Name': "name",
                    'Value': name
                }
            ],
            ValidationData=[
                {
                    'Name': "email",
                    'Value': email
                },

            ])
    except client.exceptions.UsernameExistsException as exp:
        return {"success": False,
                "error": True,
                "message": "The email already exists"}

    except client.exceptions.InvalidPasswordException as exp:
        return {"success": False,
                "error": True,
                "message": "Password should be at least 6 character long"}

    except Exception as exp:
        return {"success": False,
                "error": True,
                "message": str(exp)}

    addUserToRDS(name, email, password, instituteName)

    return {"success": True,
            "error": False,
            "message": "Sign Up Successful!"}
