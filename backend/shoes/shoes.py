from shoes.models import ShoeModel
import json


def list_shoes_response(limit=100):
    shoe_scan = ShoeModel.scan(
        limit=limit,
    )
    shoes = [shoe.to_dict() for shoe in shoe_scan]
    return json.dumps(shoes)


def get_shoe_response(shoe_id):
    shoe = ShoeModel.get(shoe_id).to_dict()

    return json.dumps(shoe)
