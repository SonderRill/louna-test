export interface SkinportItem {
  market_hash_name: string;
  currency: string;
  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number | null;
  min_price_tradable: number | null;
  max_price: number | null;
  mean_price: number | null;
  quantity: number;
  created_at: number;
  updated_at: number;
}

export interface SkinportResponse {
  app_id: number;
  currency: string;
  items: SkinportItem[];
}

export interface ItemPriceResponse {
  market_hash_name: string;
  min_price_tradable: number | null;
  min_price_non_tradable: number | null;
}

