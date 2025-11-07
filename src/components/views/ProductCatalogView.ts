import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";

interface IProductCatalogView {
  items: HTMLElement[];
}

export class ProductCatalogView extends Component<IProductCatalogView> {
  protected _catalog: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._catalog = ensureElement<HTMLElement>(".gallery", container);
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this._catalog.replaceChildren(...items);
    } else {
      this._catalog.replaceChildren();
    }
  }
}
