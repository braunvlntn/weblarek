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
import { OrderFormView } from "./components/views/OrderFormView.ts";
import { Buyer } from "./components/models/Buyer.ts";
import { ContactsFormView } from "./components/views/ContactFormView.ts";
import { OrderSuccessView } from "./components/views/SuccessView.ts";

// Инициализация EventEmitter для управления событиями
const events = new EventEmitter();

// Инициализация API и DataFetcher
const api = new Api(API_URL);
const dataFetcher = new DataFetcher(api);

// Инициализация моделей
const productCatalog = new ProductCatalog(events);
const cart = new Cart(events);
const buyer = new Buyer();

// Инициализация представлений
const catalogView = new ProductCatalogView(document.body);

const previewCard = new SelectedProductCardView(
  cloneTemplate<HTMLElement>("#card-preview"),
  {
    onClick: () => {
      const selectedProduct = productCatalog.getSelectedProduct();

      if (selectedProduct) {
        if (cart.checkProductExistence(selectedProduct.id)) {
          cart.removeProduct(selectedProduct.id);
        } else {
          cart.addProduct(selectedProduct);
        }

        productCatalog.setSelectedProduct(selectedProduct);
      }
    },
  },
);

const basketInHeader = new BasketInHeaderView(
  ensureElement<HTMLElement>(".header"),
  {
    onClick: () => events.emit(Events.BASKET_OPEN),
  },
);

const basketView = new BasketView(cloneTemplate<HTMLElement>("#basket"), {
  onClick: () => events.emit(Events.ORDER_START),
});

const modal = new Modal(ensureElement<HTMLElement>("#modal-container"));

const orderFormErrors = {
  address: buyer.validateAddress(),
  payment: buyer.validatePayment(),
};

const orderFormElement = cloneTemplate<HTMLElement>("#order");

const orderForm = new OrderFormView(orderFormElement, {
  onSubmit: () => events.emit(Events.ORDER_SUBMIT),
  setPayment: (payment) => {
    buyer.setPayment(payment);
    orderFormErrors.payment = buyer.validatePayment();

    modal.render({
      content: orderForm.render({
        payment: buyer.getPayment(),
        errors: Object.values(orderFormErrors).filter((error) => error !== ""),
        isComplete:
          Object.values(orderFormErrors).filter((error) => error !== "")
            .length === 0,
      }),
    });
  },
  setAddress: (address) => {
    buyer.setAddress(address);
    orderFormErrors.address = buyer.validateAddress();

    modal.render({
      content: orderForm.render({
        payment: buyer.getPayment(),
        errors: Object.values(orderFormErrors).filter((error) => error !== ""),
        isComplete:
          Object.values(orderFormErrors).filter((error) => error !== "")
            .length === 0,
      }),
    });
  },
});

const contactsFormErrors = {
  email: buyer.validateEmail(),
  phone: buyer.validatePhone(),
};

const contactsFormElement = cloneTemplate<HTMLElement>("#contacts");

const contactsForm = new ContactsFormView(contactsFormElement, {
  onSubmit: () => events.emit(Events.CONTACTS_SUBMIT),
  setEmail: (email) => {
    buyer.setEmail(email);
    contactsFormErrors.email = buyer.validateEmail();

    modal.render({
      content: contactsForm.render({
        errors: Object.values(contactsFormErrors).filter(
          (error) => error !== "",
        ),
        isComplete:
          Object.values(contactsFormErrors).filter((error) => error !== "")
            .length === 0,
      }),
    });
  },
  setPhone: (phone) => {
    buyer.setPhone(phone);
    contactsFormErrors.phone = buyer.validatePhone();

    modal.render({
      content: contactsForm.render({
        errors: Object.values(contactsFormErrors).filter(
          (error) => error !== "",
        ),
        isComplete:
          Object.values(contactsFormErrors).filter((error) => error !== "")
            .length === 0,
      }),
    });
  },
});

// Загрузка товаров при инициализации
dataFetcher
  .fetchProducts()
  .then((products) => {
    productCatalog.setProducts(products.items);
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
        productCatalog.setSelectedProduct(product);
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

// Обработчик начала оформления заказа (первый шаг)
events.on(Events.ORDER_START, () => {
  modal.render({
    content: orderForm.render({
      errors: [],
      isComplete:
        Object.values(orderFormErrors).filter((error) => error !== "")
          .length === 0,
    }),
  });
});

// Обработчик заполнения контактов (второй шаг)
events.on(Events.ORDER_SUBMIT, () => {
  modal.render({
    content: contactsForm.render({
      errors: [],
      isComplete:
        Object.values(contactsFormErrors).filter((error) => error !== "")
          .length === 0,
    }),
  });
});

// Обработка отправки заказа
events.on(Events.CONTACTS_SUBMIT, () => {
  const cartProducts = cart.getProducts();
  const totalPrice = cart.getAllProductsCost();

  // Отправляем заказ на сервер
  dataFetcher
    .postOrder(
      {
        email: buyer.getEmail(),
        phone: buyer.getPhone(),
        address: buyer.getAddress(),
        payment: buyer.getPayment(),
      },
      totalPrice,
      cartProducts.map((product) => product.id),
    )
    .then((result) => {
      // Очищаем корзину и данные покупателя
      cart.clearProducts();
      buyer.clearBuyersData();
      events.emit(Events.BASKET_CHANGE);

      // Показываем сообщение об успешной оплате
      const successElement = cloneTemplate<HTMLElement>("#success");

      const successView = new OrderSuccessView(successElement, {
        onClick: () => {
          modal.close();
        },
      });

      modal.render({
        content: successView.render({ total: result.total }),
      });
    })
    .catch((error) => {
      console.error("Ошибка при оформлении заказа:", error);
    });
});
