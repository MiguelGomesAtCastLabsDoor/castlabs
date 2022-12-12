import { Shoe } from "../shoes/Shoe";

interface Size {
  name: string;
  pairsInStock: number;
}

export class OrderItem {
  amount: number | undefined;
  size: Size = { name: "", pairsInStock: 0 };
  shoe: Shoe = {
    id: 0,
    brand: "",
    friendlyName: "",
    image: "",
    sizes: [],
    price: 0,
    isNew: true,
  };
  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.amount) this.amount = initializer.amount;
    if (initializer.size) this.size = initializer.size;
    if (initializer.shoe) this.shoe = initializer.shoe;
  }
}

export class Order {
  id: number | undefined;
  userId: string = "";
  orderItems: Array<OrderItem> = [];
  shippingAddress: string = "";
  total: number = 0;
  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.userId) this.userId = initializer.userId;
    if (initializer.orderItems) this.orderItems = initializer.orderItems;
    if (initializer.shippingAddress)
      this.shippingAddress = initializer.shippingAddress;
    if (initializer.total) this.total = initializer.total;
  }
}
