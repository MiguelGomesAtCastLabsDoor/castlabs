interface Size {
  name: string;
  pairsInStock: number;
}
export class Shoe {
  id: number | undefined;
  brand: string = "";
  friendlyName: string = "";
  image: string = "";
  sizes: Array<Size> = [];
  price: number = 0.0;
  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.brand) this.brand = initializer.brand;
    if (initializer.friendlyName) this.friendlyName = initializer.friendlyName;
    if (initializer.image) this.image = initializer.image;
    if (initializer.sizes) this.sizes = initializer.sizes;
    if (initializer.price) this.price = initializer.price;
  }
}
