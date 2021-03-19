export class Product {
  id?: string;
  name?: string;
  url?: string;
  isBuy?: boolean;
  details?: string;
  price?: number;
  buyerId?: string;

  constructor(data: Product) {
    const { id, name, url, isBuy, details, price, buyerId } = data;
    this.id = id;
    this.name = name;
    this.url = url;
    this.isBuy = isBuy;
    this.details = details;
    this.price = price;
    this.buyerId = buyerId;
  }
}
