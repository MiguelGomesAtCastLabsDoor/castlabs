from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute,
    NumberAttribute,
    ListAttribute,
    MapAttribute,
)
from dynamo.conf import aws_conf


class OrderModel(Model):
    class Meta:
        table_name = "orders"
        aws_access_key_id = aws_conf["aws_access_key_id"]
        aws_secret_access_key = aws_conf["aws_secret_access_key"]
        region = aws_conf["region_name"]

    id = UnicodeAttribute(null=True, hash_key=True)
    userId = UnicodeAttribute(null=True)
    shoe = MapAttribute(null=True)
    shippingAddress = UnicodeAttribute(null=True)
    # order items are meant to be orderItem objects in the form of
    """'{
        "amount": 1,
        "size": {
            "name": "6(39)",
            "pairsInStock": 3
        }"""
    orderItems = ListAttribute(null=True)

    def to_dict(self):
        rval = {}
        for key in self.attribute_values:
            rval[key] = self.__getattribute__(key)
        return rval
