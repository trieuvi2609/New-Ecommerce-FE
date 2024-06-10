export type Product = {
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  user: User;
  oldPrice: number;
  productId: string;
};
export type UserShowData = {
  userName: string;
  isAuth: boolean;
};

export interface User {
  _id: string;
  email: string;
  password: string;
  userName: string;
  status: string;
  cart: any[];
}

export enum Caterogies {
  Technology = "Technology",
  Fashion = "Fashion",
  Instrument = "Instrument",
  Cosmetics = "Cosmetics",
  Furniture = "Furniture",
}
