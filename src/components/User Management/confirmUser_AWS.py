# Author - Jigar Makwana B00842568
def lambda_handler(event, context):
    event['response']['autoConfirmUser'] = True
    return event
