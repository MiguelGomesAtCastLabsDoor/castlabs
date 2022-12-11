from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute, ListAttribute
from dynamo.conf import aws_conf


class ShoeModel(Model):
    class Meta:
        table_name = "shoes"
        aws_access_key_id = aws_conf["aws_access_key_id"]
        aws_secret_access_key = aws_conf["aws_secret_access_key"]
        region = aws_conf["region_name"]

    id = UnicodeAttribute(null=True, hash_key=True)
    brand = UnicodeAttribute(null=True)
    friendlyName = UnicodeAttribute(null=True)
    image = UnicodeAttribute(null=True)
    price = NumberAttribute(null=True)
    sizes = ListAttribute(null=True)

    def to_dict(self):
        rval = {}
        for key in self.attribute_values:
            rval[key] = self.__getattribute__(key)
        return rval
