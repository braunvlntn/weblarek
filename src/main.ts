import "./scss/styles.scss";
import { ProductCatalog } from "./components/models/ProductCatalog.ts";
import { DataFetcher } from "./components/communication/DataFetcher.ts";
import { Api } from "./components/base/Api.ts";
import { API_URL } from "./utils/constants.ts";
import { Cart } from "./components/models/Cart.ts";
import { Buyer } from "./components/models/Buyer.ts";

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

const cart = new Cart();

cart.addProduct(productCatalog.getProducts()[0]);
cart.addProduct(productCatalog.getProducts()[1]);

console.log("Товары в корзине", cart.getProducts());
console.log(
  "Проверка товара в корзине по id",
  cart.checkProductExistence(productCatalog.getProducts()[1].id)
);
console.log("Стоимость всех товаров", cart.getAllProductsCost());
console.log("Количество товаров", cart.getAllProductsNumber());

console.log("Удаление товара с индексом 1");
cart.removeProduct(productCatalog.getProducts()[1].id);

console.log("Товары в корзине", cart.getProducts());
console.log(
  "Проверка товара в корзине по id",
  cart.checkProductExistence(productCatalog.getProducts()[1].id)
);
console.log("Стоимость всех товаров", cart.getAllProductsCost());
console.log("Количество товаров", cart.getAllProductsNumber());

console.log("Удаление всех товаров");
cart.clearProducts();

console.log("Товары в корзине", cart.getProducts());
console.log(
  "Проверка товара в корзине по id",
  cart.checkProductExistence(productCatalog.getProducts()[0].id)
);
console.log("Стоимость всех товаров", cart.getAllProductsCost());
console.log("Количество товаров", cart.getAllProductsNumber());

const buyer = new Buyer();

console.log("Валидация (все поля пустые)", buyer.validateBuyersData());

buyer.setAddress("Не дом и не улица, Советский Союз");

console.log("Валидация (указан адрес)", buyer.validateBuyersData());

buyer.setPhone("8-800-555-35-35");

console.log("Валидация (указан телефон)", buyer.validateBuyersData());

buyer.setPayment("card");

console.log(
  "Валидация (указан указан способ оплаты)",
  buyer.validateBuyersData()
);

buyer.setEmail("top_frontend@yandex.ru");

console.log(
  "Валидация (указан адрес электронной почты)",
  buyer.validateBuyersData()
);

console.log("Электронная почта", buyer.getEmail());
console.log("Адрес", buyer.getAddress());
console.log("Способ оплаты", buyer.getPayment());
console.log("Номер телефона", buyer.getPhone());

console.log("Очистка данных покупателя");
buyer.clearBuyersData();

console.log("Электронная почта", buyer.getEmail());
console.log("Адрес", buyer.getAddress());
console.log("Способ оплаты", buyer.getPayment());
console.log("Номер телефона", buyer.getPhone());
console.log("Валидация после очистки", buyer.validateBuyersData());
