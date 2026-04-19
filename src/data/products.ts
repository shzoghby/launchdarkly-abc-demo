import { productsList } from "./productsMock";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const getProducts= () => {
    return productsList;
}