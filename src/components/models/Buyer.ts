import { IBuyer } from "../../types";

const errorsMap = {
  phone: "Укажите номер телефона",
  email: "Укажите адрес электронной почты",
  address: "Укажите адрес доставки",
  payment: "Не выбран вид оплаты",
};

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
      result.phone = errorsMap.phone;
    }

    if (!this.getAddress()) {
      result.address = errorsMap.address;
    }

    if (!this.getEmail()) {
      result.email = errorsMap.email;
    }

    if (!this.getPayment()) {
      result.payment = errorsMap.payment;
    }

    return result;
  }

  validatePhone() {
    if (!this.getPhone()) {
      return errorsMap.phone;
    }

    return "";
  }

  validateEmail() {
    if (!this.getEmail()) {
      return errorsMap.email;
    }

    return "";
  }

  validateAddress() {
    if (!this.getAddress()) {
      return errorsMap.address;
    }

    return "";
  }

  validatePayment() {
    if (!this.getPayment()) {
      return errorsMap.payment;
    }

    return "";
  }
}
