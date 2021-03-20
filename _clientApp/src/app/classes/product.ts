export class Product {
  id?: string;
  name?: string;
  url?: string;
  details?: string;
  price?: number;
  photoUrl?: string;

  constructor(data: Product) {
    const { id, name, url, details, price, photoUrl } = data;
    this.id = id;
    this.name = name;
    this.url = url;
    this.details = details;
    this.price = price;
    this.photoUrl = photoUrl;
  }
}
