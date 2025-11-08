import { FormView } from "./FormView";
import { ensureElement } from "../../utils/utils.ts";

interface IContactsFormData {
  email: string;
  phone: string;
}

export class ContactsFormView extends FormView<IContactsFormData> {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;

  constructor(
    container: HTMLElement,
    actions: {
      onSubmit: () => void;
      setEmail: (email: string) => void;
      setPhone: (phone: string) => void;
    }
  ) {
    super(container, actions);

    this._emailInput = ensureElement<HTMLInputElement>(
      "input[name=email]",
      container
    );

    this._emailInput.addEventListener("change", (event) => {
      actions.setEmail((event.target as HTMLInputElement).value);
    });

    this._phoneInput = ensureElement<HTMLInputElement>(
      "input[name=phone]",
      container
    );

    this._phoneInput.addEventListener("change", (event) => {
      actions.setPhone((event.target as HTMLInputElement).value);
    });
  }
}
