import pymysql

DB_HOST = 'serverless-project.ckwpe1lbmfqz.us-east-1.rds.amazonaws.com'
DB_USER = 'root'
DB_PASS = 'rootuser'
DB_NAME = 'DALServerlessLMS'
UPDATE_USER_QUERY = "UPDATE Users SET userState = %s WHERE email = %s"

def connectDatabase():
    try:
        connection = pymysql.connect(DB_HOST, user=DB_USER, passwd=DB_PASS, db=DB_NAME, connect_timeout=5)
    except pymysql.MySQLError as error:
        print(error)
    return connection

def updateuserState(email, value):
    db = connectDatabase()
    cursor = db.cursor()
    userState = str(value)
    values = (userState, email)
    cursor.execute(UPDATE_USER_QUERY, values)
    db.commit()
    print("Data updated to RDS!")

def lambda_handler(event, context):
    # Parse out body
    email = event["email"]
    value = event['value']
    print("email")
    print("value")
    print("email: " + email + " value: " + str(value))

    updateuserState(email, value)

    return { "success": True,
             "error": False,
             "message":"Record updated in database"}

