import { ProductCardBaseView } from "./ProductCardBaseView.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IProduct } from "../../types";

interface IProductInBasketCardActions {
  onClick: (event: MouseEvent) => void;
}

export class ProductInBasketCardView extends ProductCardBaseView {
  protected _index: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IProductInBasketCardActions) {
    super(container);

    this._index = ensureElement<HTMLElement>(".basket__item-index", container);
    this._button = ensureElement<HTMLButtonElement>(".card__button", container);

    if (actions?.onClick) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set index(value: string) {
    this._index.textContent = value;
  }

  render(data?: Partial<IProduct & { index: number }>): HTMLElement {
    super.render(data);
    return this.container;
  }
}
