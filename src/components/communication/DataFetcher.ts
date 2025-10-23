import {
  FetchProductsResponse,
  IApi,
  IBuyer,
  IProduct,
  PostOrderParams,
} from "../../types";

export class DataFetcher {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  fetchProducts() {
    return this.api.get<FetchProductsResponse>("/product");
  }

  postOrder(buyer: IBuyer, total: number, items: IProduct["id"][]) {
    return this.api.post("/order", {
      ...buyer,
      total,
      items,
    } as PostOrderParams);
  }
}
