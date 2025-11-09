import { IProduct } from "../../types";
import { IEvents } from "../base/Events.ts";
import { Events } from "../../utils/constants.ts";

type TSelectedProduct = IProduct | null;

export class ProductCatalog {
  protected _events: IEvents;
  products: IProduct[] = [];
  selectedProduct: TSelectedProduct = null;

  constructor(events: IEvents) {
    this._events = events;
  }

  getProducts() {
    return this.products;
  }

  setProducts(products: IProduct[]) {
    this.products = products;
    this._events.emit(Events.CATALOG_CHANGE);
  }

  getProductById(productId: IProduct["id"]) {
    return this.products.find((product) => product.id === productId);
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

  setSelectedProduct(product: TSelectedProduct) {
    this.selectedProduct = product;

    if (product) {
      this._events.emit(Events.PRODUCT_SELECT, product);
    }
  }
}
