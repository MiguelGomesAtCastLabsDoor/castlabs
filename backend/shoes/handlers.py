from shoes.shoes import list_shoes_response, get_shoe_response
from helpers.helpers import extract_parameter_from_path


def list_shoes_handler(event, context):
    response = list_shoes_response()

    try:
        if len(response) > 0:
            return {"statusCode": 200, "body": response}
        else:
            return {"statusCode": 404}
    except Exception as exception:
        return {"statusCode": 500, "body": str(exception)}


def get_shoe_handler(event, context):
    shoe_id = extract_parameter_from_path(event, "shoe_id")
    response = get_shoe_response(shoe_id)
    try:
        if len(response) > 0:
            return {"statusCode": 200, "body": response}
        else:
            return {"statusCode": 404}
    except Exception as exception:
        return {"statusCode": 500, "body": str(exception)}
