from orders.orders import (
    list_orders_response,
    get_order_response,
    create_order_response,
)
from helpers.helpers import extract_parameter_from_path
import json


def list_orders_handler(event, context):
    response = list_orders_response()

    try:
        if len(response) > 0:
            return {"statusCode": 200, "body": response}
        else:
            return {"statusCode": 404}
    except Exception as exception:
        return {"statusCode": 500, "body": str(exception)}


def get_order_handler(event, context):
    order_id = extract_parameter_from_path(event, "order_id")
    response = get_order_response(order_id)
    try:
        if len(response) > 0:
            return {"statusCode": 200, "body": response}
        else:
            return {"statusCode": 404}
    except Exception as exception:
        return {"statusCode": 500, "body": str(exception)}


def create_order_handler(event, context):
    order_data = json.loads(event.get("body"))
    if not order_data:
        return {"statusCode": 422, "body": "Invalid request: No incoming JSON found."}
    response = create_order_response(order_data)
    try:
        if len(response) > 0:
            return {"statusCode": 200, "body": response}
        else:
            return {
                "statusCode": 400,
                "body": "something went wrong, most likely with the order data being provided (I desperately need a validator)",
            }
    except Exception as exception:
        return {"statusCode": 500, "body": str(exception)}
