import { FormView } from "./FormView";
import { ensureElement } from "../../utils/utils";
import { TPayment } from "../../types";

interface IOrderForm {
  payment: TPayment;
}

export class OrderFormView extends FormView<IOrderForm> {
  protected _cardButton: HTMLButtonElement;
  protected _cashButton: HTMLButtonElement;
  protected _addressInput: HTMLInputElement;

  constructor(
    container: HTMLElement,
    actions: {
      onSubmit: () => void;
      setPayment: (payment: TPayment) => void;
      setAddress: (address: string) => void;
    },
  ) {
    super(container, actions);

    this._cardButton = ensureElement<HTMLButtonElement>(
      "button[name=card]",
      container,
    );

    this._cardButton.addEventListener("click", () => {
      actions.setPayment("card");
    });

    this._cashButton = ensureElement<HTMLButtonElement>(
      "button[name=cash]",
      container,
    );

    this._cashButton.addEventListener("click", () => {
      actions.setPayment("cash");
    });

    this._addressInput = ensureElement<HTMLInputElement>(
      "input[name=address]",
      container,
    );

    this._addressInput.addEventListener("change", (event) => {
      actions.setAddress((event.target as HTMLInputElement).value);
    });
  }

  set payment(payment: TPayment) {
    if (payment === "card") {
      this._cardButton.classList.add("button_alt-active");
      this._cardButton.classList.remove("button_alt");

      this._cashButton.classList.remove("button_alt-active");
      this._cashButton.classList.add("button_alt");
    } else if (payment === "cash") {
      this._cashButton.classList.add("button_alt-active");
      this._cashButton.classList.remove("button_alt");

      this._cardButton.classList.remove("button_alt-active");
      this._cardButton.classList.add("button_alt");
    }
  }
}
