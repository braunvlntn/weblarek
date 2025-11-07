import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IModalData {
  content: HTMLElement;
}

export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      container
    );

    this._content = ensureElement<HTMLElement>(".modal__content", container);

    this._closeButton.addEventListener("click", () => this.close());
    this.container.addEventListener("click", () => this.close());
    this._content.addEventListener("click", (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
    this.content.replaceChildren();
  }

  render(data: IModalData): HTMLElement {
    super.render(data);
    return this.container;
  }
}
