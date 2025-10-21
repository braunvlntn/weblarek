import { IProduct } from "../../types";

export class Cart {
  products: IProduct[] = [];

  getProducts() {
    return this.products;
  }

  addProduct(product: IProduct) {
    this.products.push(product);
  }

  removeProduct(productId: IProduct["id"]) {
    this.products = this.products.filter(
      (currentProduct) => currentProduct.id !== productId
    );
  }

  clearProducts() {
    this.products = [];
  }

  getAllProductsCost() {
    return this.products.reduce(
      (result, currentProduct) => result + Number(currentProduct.price),
      0
    );
  }

  getAllProductsNumber() {
    return this.products.length;
  }

  checkProductExistence(productId: IProduct["id"]) {
    const checkExistenceResult = this.products.find(
      (currentProduct) => currentProduct.id === productId
    );

    return checkExistenceResult || null;
  }
}
