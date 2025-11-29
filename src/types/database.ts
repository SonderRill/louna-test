export interface User {
  id: number;
  username: string;
  balance: number | string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number | string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Purchase {
  id: number;
  user_id: number;
  product_id: number;
  price: number | string;
  created_at: Date | string;
}

