import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { categoryMap } from "../../utils/constants.ts";

export class ProductCardBaseView extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._title = ensureElement<HTMLElement>(".card__title", container);
    this._price = ensureElement<HTMLElement>(".card__price", container);
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set price(value: number | null) {
    if (value === null) {
      this._price.textContent = "Бесценно";
    } else {
      this._price.textContent = `${value} синапсов`;
    }
  }

  protected _getCategoryClass(value: keyof typeof categoryMap) {
    return categoryMap[value];
  }
}
