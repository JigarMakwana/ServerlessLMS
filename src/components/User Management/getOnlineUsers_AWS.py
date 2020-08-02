# Author - Jigar Makwana B00842568
import pymysql

DB_HOST = 'serverless-project.ckwpe1lbmfqz.us-east-1.rds.amazonaws.com'
DB_USER = 'root'
DB_PASS = 'rootuser'
DB_NAME = 'DALServerlessLMS'
GET_USER_QUERY = "SELECT username, email FROM Users where userState=1"

def connectDatabase():
    try:
        connection = pymysql.connect(DB_HOST, user=DB_USER, passwd=DB_PASS, db=DB_NAME, connect_timeout=5)
    except pymysql.MySQLError as error:
        print(error)
    return connection

def getOnlineUsers():
    db = connectDatabase()
    cursor = db.cursor()
    cursor.execute(GET_USER_QUERY)
    myresult = cursor.fetchall()
    return myresult

def lambda_handler(event, context):
    myresult = getOnlineUsers()
    for x in myresult:
        print(x)
    return { "success": True,
             "error": False,
             "message":"Succefully got the results!",
             "data": myresult}
