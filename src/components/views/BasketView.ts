import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component.ts";

interface IBasket {
  products: HTMLElement[];
  basketPrice: number;
}

export class BasketView extends Component<IBasket> {
  protected _basketList: HTMLElement;
  protected _basketPrice: HTMLElement;
  protected _basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: { onClick: () => void }) {
    super(container);

    this._basketList = ensureElement<HTMLElement>(".basket__list", container);

    this._basketPrice = ensureElement<HTMLElement>(".basket__price", container);

    this._basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container,
    );

    if (actions?.onClick) {
      this._basketButton.addEventListener("click", actions.onClick);
    }
  }

  set products(products: HTMLElement[]) {
    if (!products.length) {
      this._basketList.replaceChildren("Корзина пуста.");
      this._basketButton.disabled = true;

      return;
    }

    this._basketButton.disabled = false;
    this._basketList.replaceChildren(...products);
  }

  set basketPrice(price: number) {
    this._basketPrice.textContent = `${price} синапсов`;
  }
}
