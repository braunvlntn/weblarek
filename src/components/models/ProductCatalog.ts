import { IProduct } from "../../types";

type TSelectedProduct = IProduct | null;

export class ProductCatalog {
  products: IProduct[] = [];
  selectedProduct: TSelectedProduct = null;

  getProducts() {
    return this.products;
  }

  setProducts(products: IProduct[]) {
    this.products = products;
  }

  getProductById(productId: IProduct["id"]) {
    return this.products.find((product) => product.id === productId);
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

  setSelectedProduct(product: TSelectedProduct) {
    this.selectedProduct = product;
  }
}
