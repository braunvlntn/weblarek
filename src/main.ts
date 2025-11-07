import "./scss/styles.scss";
import { API_URL, CDN_URL, Events } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { Api } from "./components/base/Api";
import { ProductCatalog } from "./components/models/ProductCatalog";
import { DataFetcher } from "./components/communication/DataFetcher";
import { ProductCardCatalogView } from "./components/views/ProductCardCatalogView.ts";
import { ProductCatalogView } from "./components/views/ProductCatalogView";
import { cloneTemplate } from "./utils/utils";

// Инициализация EventEmitter для управления событиями
const events = new EventEmitter();

// Инициализация API и DataFetcher
const api = new Api(API_URL);
const dataFetcher = new DataFetcher(api);

// Инициализация моделей
const productCatalog = new ProductCatalog();

// Инициализация представлений
const catalogView = new ProductCatalogView(document.body);

// Загрузка товаров при инициализации
dataFetcher
  .fetchProducts()
  .then((products) => {
    productCatalog.setProducts(products.items);
    events.emit(Events.CATALOG_CHANGE);
  })
  .catch((error) => {
    console.error("Ошибка загрузки товаров:", error);
  });

// Обработчик изменения каталога
events.on(Events.CATALOG_CHANGE, () => {
  const products = productCatalog.getProducts();

  const productCards = products.map((product) => {
    const cardElement = cloneTemplate<HTMLElement>("#card-catalog");

    const card = new ProductCardCatalogView(cardElement, {
      onClick: () => {},
    });

    return card.render({
      id: product.id,
      title: product.title,
      image: CDN_URL + product.image,
      category: product.category,
      price: product.price,
    });
  });

  catalogView.render({ items: productCards });
});
