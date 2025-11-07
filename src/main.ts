import "./scss/styles.scss";
import { API_URL, CDN_URL, Events } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { Api } from "./components/base/Api";
import { ProductCatalog } from "./components/models/ProductCatalog";
import { DataFetcher } from "./components/communication/DataFetcher";
import { ProductCardCatalogView } from "./components/views/ProductCardCatalogView.ts";
import { ProductCatalogView } from "./components/views/ProductCatalogView";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { IProduct } from "./types";
import { Modal } from "./components/views/Modal.ts";
import { SelectedProductCardView } from "./components/views/SelectedProductCardView.ts";
import { Cart } from "./components/models/Cart.ts";
import { BasketInHeaderView } from "./components/views/BasketInHeaderView.ts";
import { BasketView } from "./components/views/BasketView.ts";
import { ProductInBasketCardView } from "./components/views/ProductInBasketCardView.ts";

// Инициализация EventEmitter для управления событиями
const events = new EventEmitter();

// Инициализация API и DataFetcher
const api = new Api(API_URL);
const dataFetcher = new DataFetcher(api);

// Инициализация моделей
const productCatalog = new ProductCatalog();
const cart = new Cart();

// Инициализация представлений
const catalogView = new ProductCatalogView(document.body);

const basketInHeader = new BasketInHeaderView(
  ensureElement<HTMLElement>(".header"),
  {
    onClick: () => events.emit(Events.BASKET_OPEN),
  }
);

const basketView = new BasketView(cloneTemplate<HTMLElement>("#basket"), {
  onClick: () => {},
});

const modal = new Modal(ensureElement<HTMLElement>("#modal-container"));

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
      onClick: () => {
        events.emit(Events.PRODUCT_SELECT, product);
      },
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

// Обработчик выбора товара для просмотра
events.on(Events.PRODUCT_SELECT, (product: IProduct) => {
  productCatalog.setSelectedProduct(product);

  const cardElement = cloneTemplate<HTMLElement>("#card-preview");

  const previewCard = new SelectedProductCardView(cardElement, {
    onClick: () => {
      if (cart.checkProductExistence(product.id)) {
        cart.removeProduct(product.id);
        events.emit(Events.BASKET_CHANGE);
        events.emit(Events.PRODUCT_SELECT, product);

        return;
      }

      cart.addProduct(product);
      events.emit(Events.BASKET_CHANGE);
      events.emit(Events.PRODUCT_SELECT, product);
    },
  });

  let buttonText = "";

  if (product.price === null) {
    buttonText = "Недоступно";
  } else if (!cart.checkProductExistence(product.id)) {
    buttonText = "Купить";
  } else {
    buttonText = "Удалить из корзины";
  }

  modal.render({
    content: previewCard.render({
      id: product.id,
      title: product.title,
      image: CDN_URL + product.image,
      category: product.category,
      price: product.price,
      description: product.description,
      buttonText,
    }),
  });

  modal.open();
});

// Обработчик изменения корзины
events.on(Events.BASKET_CHANGE, () => {
  const cartProducts = cart.getProducts();

  basketInHeader.render({ counter: cartProducts.length });
});

// Обработчик открытия корзины
events.on(Events.BASKET_OPEN, () => {
  const cartProducts = cart.getProducts();
  const totalPrice = cart.getAllProductsCost();

  // Создаём карточки товаров для корзины
  const basketItems = cartProducts.map((product, index) => {
    const cardElement = cloneTemplate<HTMLElement>("#card-basket");

    const card = new ProductInBasketCardView(cardElement, {
      onClick: () => {
        cart.removeProduct(product.id);
        events.emit(Events.BASKET_CHANGE);
        events.emit(Events.BASKET_OPEN);
      },
    });

    return card.render({
      title: product.title,
      price: product.price,
      index: index + 1,
    });
  });

  modal.render({
    content: basketView.render({
      products: basketItems,
      basketPrice: totalPrice,
    }),
  });

  modal.open();
});
