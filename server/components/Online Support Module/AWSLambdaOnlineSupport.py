import json
import pymysql

DB_HOST = 'serverless-project.ckwpe1lbmfqz.us-east-1.rds.amazonaws.com'
DB_USER = 'root'
DB_PASS = 'rootuser'
DB_NAME = 'DALServerlessLMS'
SELECT_ONLINE_USERS_QUERY = "SELECT username FROM Users WHERE username != %s and userState = 1"
SELECT_USERS_COUNT_QUERY = "SELECT COUNT(username) FROM Users"

def get_database_connection():
    try:
        connection = pymysql.connect(DB_HOST, user=DB_USER, passwd=DB_PASS, db=DB_NAME, connect_timeout=5)
    except pymysql.MySQLError as error:
        print(error)
    return connection

def get_slots(intent_request):
    return intent_request['currentIntent']['slots']

def elicit_slot(session_attributes, intent_name, slots, slot_to_elicit, message):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ElicitSlot',
            'intentName': intent_name,
            'slots': slots,
            'slotToElicit': slot_to_elicit,
            'message': message
        }
    }

def delegate(session_attributes, slots):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Delegate',
            'slots': slots
        }
    }

def build_validation_result(is_valid, violated_slot, message_content):
    if message_content is None:
        return {
            "isValid": is_valid,
            "violatedSlot": violated_slot,
        }

    return {
        'isValid': is_valid,
        'violatedSlot': violated_slot,
        'message': {'contentType': 'PlainText', 'content': message_content}
    }

def validate_chat_with_users(is_okay, answer):
    print("came to validate chat with users")
    print(is_okay)
    if is_okay is not None:
        if is_okay.lower() == "no" :
            print("came to message")
            return build_validation_result(False, 'IsOkay', "I am sorry, but you cannot chat with the users who are offline")
        elif ( is_okay.lower() == "yes" or is_okay.lower() == "yep" or is_okay.lower() == "yeah" ):
            return build_validation_result(True, None, None)
        elif ( is_okay.lower().__contains__('thank')):
            return build_validation_result(False, 'DataTask', "You're welcome!")
    return build_validation_result(True, None, "I don't understand what you are saying, can you please repeat?")

def validate_data_processing(data_task):
    print("came to validate data processing")
    print(data_task)
    if data_task is not None:
        if data_task.lower() == "process" :
            print("came to process")
            return build_validation_result(False, 'DataTask', "goto data processing module, you will find a button for uploading and processing")
        elif ( data_task.lower() == "analyze" or data_task.lower() == "analyse"):
            return build_validation_result(False, 'DataTask', "goto analysis 2 module, you will find a button for uploading the file and analyzing.")
        elif (data_task.lower().__contains__("thank")):
            return build_validation_result(False, 'DataTask', "You're welcome!")
        else:
            return build_validation_result(False, 'DataTask', "sorry I do not understand, can you please select the valid option?")

    return build_validation_result(True, None, "I don't understand what you are saying, can you please repeat?")

def validate_online_users(user_name):
    print("came to online users query method")
    if user_name is not None:
        db = get_database_connection()
        cursor = db.cursor()
        cursor.execute(SELECT_ONLINE_USERS_QUERY, user_name)
        result = cursor.fetchall()
        names = ""
        for record in result:
            names += record[0] + ", "
        names = names.strip(", ")
        print(names)
        return build_validation_result(False, 'UserName', "The following users are online: " + names)
    return build_validation_result(True, None, "I don't understand what you are saying, can you please repeat?")

def validate_user_count(users_name):
    if users_name is not None:
        db = get_database_connection()
        cursor = db.cursor()
        cursor.execute(SELECT_USERS_COUNT_QUERY)
        result = cursor.fetchone()
        print(result[0])
        return build_validation_result(False, 'UsersName', "The count of users in your organization is: " + str(result[0]))
    return build_validation_result(True, None, "I don't understand what you are saying, can you please repeat?")

def chat_with_users(intent_request):
    is_okay = get_slots(intent_request)["IsOkay"]
    answer = get_slots(intent_request)["Answer"]
    source = intent_request['invocationSource']

    if source == 'DialogCodeHook':
        # Perform basic validation on the supplied input slots.
        # Use the elicitSlot dialog action to re-prompt for the first violation detected.
        slots = get_slots(intent_request)
        validation_result = validate_chat_with_users(is_okay, answer)

        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                               intent_request['currentIntent']['name'],
                               slots,
                               validation_result['violatedSlot'],
                               validation_result['message'])

        # Pass the price of the flowers back through session attributes to be used in various prompts defined
        # on the bot model.
        output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}
        return delegate(output_session_attributes, get_slots(intent_request))

    return close(intent_request['sessionAttributes'], 'Fulfilled', {'contentType': 'PlainText', 'content': 'I hope that helps, thank you!'})

def data_processing(intent_request):
    data_task = get_slots(intent_request)["DataTask"]
    
    source = intent_request['invocationSource']

    if source == 'DialogCodeHook':
        # Perform basic validation on the supplied input slots.
        # Use the elicitSlot dialog action to re-prompt for the first violation detected.
        slots = get_slots(intent_request)
        validation_result = validate_data_processing(data_task)

        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                               intent_request['currentIntent']['name'],
                               slots,
                               validation_result['violatedSlot'],
                               validation_result['message'])

        # Pass the price of the flowers back through session attributes to be used in various prompts defined
        # on the bot model.
        output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}
        return delegate(output_session_attributes, get_slots(intent_request))

    return close(intent_request['sessionAttributes'], 'Fulfilled', {'contentType': 'PlainText', 'content': 'I hope that helps, thank you!'})

def find_online_users(intent_request):
    user_name = get_slots(intent_request)["UserName"]
    
    source = intent_request['invocationSource']

    if source == 'DialogCodeHook':
        # Perform basic validation on the supplied input slots.
        # Use the elicitSlot dialog action to re-prompt for the first violation detected.
        slots = get_slots(intent_request)
        validation_result = validate_online_users(user_name)

        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                               intent_request['currentIntent']['name'],
                               slots,
                               validation_result['violatedSlot'],
                               validation_result['message'])

        # Pass the price of the flowers back through session attributes to be used in various prompts defined
        # on the bot model.
        output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}
        return delegate(output_session_attributes, get_slots(intent_request))

    return close(intent_request['sessionAttributes'], 'Fulfilled', {'contentType': 'PlainText', 'content': 'I hope that helps, thank you!'})

def find_user_count(intent_request):
    users_name = get_slots(intent_request)["UsersName"]
    
    source = intent_request['invocationSource']

    if source == 'DialogCodeHook':
        # Perform basic validation on the supplied input slots.
        # Use the elicitSlot dialog action to re-prompt for the first violation detected.
        slots = get_slots(intent_request)
        validation_result = validate_user_count(users_name)

        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                               intent_request['currentIntent']['name'],
                               slots,
                               validation_result['violatedSlot'],
                               validation_result['message'])

        # Pass the price of the flowers back through session attributes to be used in various prompts defined
        # on the bot model.
        output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}
        return delegate(output_session_attributes, get_slots(intent_request))
    return close(intent_request['sessionAttributes'], 'Fulfilled', {'contentType': 'PlainText', 'content': 'I hope that helps, thank you!'})

def dispatch(intent_request):
    intent_name = intent_request['currentIntent']['name']

    if intent_name == 'ChatWithUsers':
        return chat_with_users(intent_request)
    elif intent_name == 'DataProcessing':
        return data_processing(intent_request)
    elif intent_name == 'FindOnlineUsers':
        return find_online_users(intent_request)
    elif intent_name == 'FindUserCount':
        return find_user_count(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')

def lambda_handler(event, context):
    return dispatch(event)
