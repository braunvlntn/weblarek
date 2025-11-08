import { categoryMap } from "../utils/constants.ts";

export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export type TPayment = "" | "cash" | "card";

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: keyof typeof categoryMap;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface FetchProductsResponse {
  total: number;
  items: IProduct[];
}

export type PostOrderParams = IBuyer & {
  total: number;
  items: IProduct["id"][];
};

export type PostOrderResponse = PostOrderParams;
