import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component.ts";

interface IBasketInHeader {
  counter: number;
}

export class BasketInHeaderView extends Component<IBasketInHeader> {
  protected _counter: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: { onClick: () => void }) {
    super(container);

    this._counter = ensureElement<HTMLElement>(
      ".header__basket-counter",
      container
    );

    this._button = ensureElement<HTMLButtonElement>(
      ".header__basket",
      container
    );

    if (actions?.onClick) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set counter(value: number) {
    this._counter.textContent = String(value);
  }
}
