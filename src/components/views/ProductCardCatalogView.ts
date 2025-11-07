import { ensureElement } from "../../utils/utils.ts";
import { ProductCardBaseView } from "./ProductCardBaseView.ts";
import { categoryMap } from "../../utils/constants.ts";

interface IProductCardActions {
  onClick: (event: MouseEvent) => void;
}

export class ProductCardCatalogView extends ProductCardBaseView {
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _button: HTMLButtonElement | null;

  constructor(container: HTMLElement, actions?: IProductCardActions) {
    super(container);

    this._image = ensureElement<HTMLImageElement>(".card__image", container);

    this._category = ensureElement<HTMLButtonElement>(
      ".card__category",
      container
    );

    this._button = container.classList.contains("gallery__item")
      ? (container as HTMLButtonElement)
      : null;

    if (actions?.onClick && this._button) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set image(value: string) {
    if (this._image) {
      this.setImage(this._image, value, this.title);
    }
  }

  set category(value: keyof typeof categoryMap) {
    this._category.textContent = value;
    this._category.className = `card__category ${this._getCategoryClass(
      value
    )}`;
  }
}
