import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { TPayment } from "../../types";

interface IFormState {
  payment: TPayment;
  isComplete: boolean;
  errors: string[];
}

export class FormView<T> extends Component<T & IFormState> {
  protected _form: HTMLFormElement;
  protected _submitButton: HTMLButtonElement;
  protected _errorElement: HTMLSpanElement;

  constructor(container: HTMLElement, actions: { onSubmit: () => void }) {
    super(container);

    this._form = this.container as HTMLFormElement;

    this._submitButton = ensureElement<HTMLButtonElement>(
      "button[type=submit]",
      this._form,
    );

    this._errorElement = ensureElement<HTMLSpanElement>(
      ".form__errors",
      this._form,
    );

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();

      actions.onSubmit();
    });
  }

  reset(): void {
    this._form.reset();
  }

  set isComplete(value: boolean) {
    this._submitButton.disabled = !value;
  }

  set errors(errors: string[]) {
    this._errorElement.textContent = errors.join(", ");
  }
}
