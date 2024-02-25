export interface Transaction {
  id: number;
  productName: string;
  sellingPrice: number;
  purchasePrice: number;
  profit: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  User?: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface AdminUser extends User {
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
  id: number;
  productName: string;
  purchasePrice: number;
  lastSellingPrice: number | null;
  totalSale: number;
  updatedAt: string;
  totalProfit?: number;
  count?: number;
}
