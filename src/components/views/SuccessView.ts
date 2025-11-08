import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IOrderSuccess {
  total: number;
}

interface IOrderSuccessActions {
  onClick: () => void;
}

export class OrderSuccessView extends Component<IOrderSuccess> {
  private descriptionElement: HTMLElement;
  private closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: IOrderSuccessActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    if (actions?.onClick) {
      this.closeButton.addEventListener("click", actions.onClick);
    }
  }

  render(data: IOrderSuccess): HTMLElement {
    this.descriptionElement.textContent = `Списано ${data.total} синапсов`;
    return this.container;
  }
}
