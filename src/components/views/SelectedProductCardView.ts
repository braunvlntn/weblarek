import { ProductCardBaseView } from "./ProductCardBaseView";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants.ts";
import { IProduct } from "../../types";

export class SelectedProductCardView extends ProductCardBaseView {
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: { onClick?: () => void }) {
    super(container);

    this._image = ensureElement<HTMLImageElement>(".card__image", container);
    this._category = ensureElement<HTMLElement>(".card__category", container);
    this._description = ensureElement<HTMLElement>(".card__text", container);
    this._button = ensureElement<HTMLButtonElement>(".card__button", container);

    if (this._button && actions?.onClick) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set category(value: keyof typeof categoryMap) {
    this._category.textContent = value;
    this._category.className = `card__category ${this._getCategoryClass(value)}`;
  }

  set description(value: string) {
    this._description.textContent = value;
  }

  set buttonText(value: string) {
    this._button.textContent = value;
  }

  set price(value: number | null) {
    super.price = value;

    this._button.disabled = value === null;
  }

  render(data?: Partial<IProduct & { buttonText: string }>): HTMLElement {
    super.render(data);
    return this.container;
  }
}
