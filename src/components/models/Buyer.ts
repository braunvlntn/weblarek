import { IBuyer } from "../../types";

export class Buyer implements IBuyer {
  payment: IBuyer["payment"] = "";
  email: IBuyer["email"] = "";
  phone: IBuyer["phone"] = "";
  address: IBuyer["address"] = "";

  setAddress(address: IBuyer["address"]) {
    this.address = address;
  }

  setPhone(phone: IBuyer["phone"]) {
    this.phone = phone;
  }

  setEmail(email: IBuyer["email"]) {
    this.email = email;
  }

  setPayment(payment: IBuyer["payment"]) {
    this.payment = payment;
  }

  getAddress(): IBuyer["address"] {
    return this.address;
  }

  getPhone(): IBuyer["phone"] {
    return this.phone;
  }

  getEmail(): IBuyer["email"] {
    return this.email;
  }

  getPayment(): IBuyer["payment"] {
    return this.payment;
  }

  clearBuyersData() {
    this.setPhone("");
    this.setAddress("");
    this.setEmail("");
    this.setPayment("");
  }

  validateBuyersData() {
    const result: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.getPhone()) {
      result.phone = "Укажите номер телефона";
    }

    if (!this.getAddress()) {
      result.address = "Укажите адрес доставки";
    }

    if (!this.getEmail()) {
      result.email = "Укажите адрес электронной почты";
    }

    if (!this.getPayment()) {
      result.payment = "Не выбран вид оплаты";
    }

    return result;
  }
}
