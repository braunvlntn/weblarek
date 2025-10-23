import "./scss/styles.scss";
import { ProductCatalog } from "./components/models/ProductCatalog.ts";
import { DataFetcher } from "./components/communication/DataFetcher.ts";
import { Api } from "./components/base/Api.ts";
import { API_URL } from "./utils/constants.ts";

const dataFetcher = new DataFetcher(new Api(API_URL));

const fetchedProducts = await dataFetcher.fetchProducts();

const productCatalog = new ProductCatalog(fetchedProducts.items);

console.log(productCatalog.getProducts());
