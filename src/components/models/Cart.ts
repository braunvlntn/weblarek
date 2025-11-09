import { IProduct } from "../../types";
import { IEvents } from "../base/Events.ts";
import { Events } from "../../utils/constants.ts";

export class Cart {
  protected _events: IEvents;

  products: IProduct[] = [];

  constructor(events: IEvents) {
    this._events = events;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: IProduct) {
    this.products.push(product);
    this._events.emit(Events.BASKET_CHANGE);
  }

  removeProduct(productId: IProduct["id"]) {
    this.products = this.products.filter(
      (currentProduct) => currentProduct.id !== productId,
    );

    this._events.emit(Events.BASKET_CHANGE);
  }

  clearProducts() {
    this.products = [];
    this._events.emit(Events.BASKET_CHANGE);
  }

  getAllProductsCost() {
    return this.products.reduce(
      (result, currentProduct) => result + Number(currentProduct.price),
      0,
    );
  }

  getAllProductsNumber() {
    return this.products.length;
  }

  checkProductExistence(productId: IProduct["id"]) {
    const checkExistenceResult = this.products.find(
      (currentProduct) => currentProduct.id === productId,
    );

    return checkExistenceResult || null;
  }
}
