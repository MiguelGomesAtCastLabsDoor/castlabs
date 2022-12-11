from orders.models import OrderModel
import uuid
import json


def list_orders_response(limit=100):
    order_scan = OrderModel.scan(
        limit=limit,
    )
    orders = [order.to_dict() for order in order_scan]
    return json.dumps(orders)


def get_order_response(order_id):
    order = OrderModel.get(order_id).to_dict()

    return json.dumps(order)


def create_order_response(order_data):
    order_id = uuid.uuid4()
    try:
        OrderModel(
            id=order_id,
            userId=order_data["userId"],
            shoe=order_data["shoe"],
            shippingAddress=order_data["shippingAddress"],
            orderItems=order_data["orderItems"],
        ).save()
        # return the created order id if creation went without issues
        return order_id
    except:
        # empty return otherwise
        return
