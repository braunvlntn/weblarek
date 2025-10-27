import "./scss/styles.scss";
import { ProductCatalog } from "./components/models/ProductCatalog.ts";
import { DataFetcher } from "./components/communication/DataFetcher.ts";
import { Api } from "./components/base/Api.ts";
import { API_URL } from "./utils/constants.ts";

const dataFetcher = new DataFetcher(new Api(API_URL));

const fetchedProducts = await dataFetcher.fetchProducts();

const productCatalog = new ProductCatalog();

productCatalog.setProducts(fetchedProducts.items);

console.log("Товары", productCatalog.getProducts());

console.log(
  "Получение товаров по id",
  productCatalog.getProductById(fetchedProducts.items[1].id)
);

productCatalog.setSelectedProduct(fetchedProducts.items[1]);

console.log("Выбранный товар", productCatalog.getSelectedProduct());
