import { redis } from '../config/redis';
import { SkinportResponse } from '../types/skinport';
import { SkinportItemDto, SkinportItemsResponseDto } from '../dto/skinport.dto';

const SKINPORT_API_URL = process.env.SKINPORT_API_URL || 'https://api.skinport.com/v1/items';
const SKINPORT_APP_ID = process.env.SKINPORT_APP_ID || '730';
const SKINPORT_CURRENCY = process.env.SKINPORT_CURRENCY || 'USD';
const CACHE_TTL = Number(process.env.SKINPORT_CACHE_TTL) || 300; // по умолчанию 5 минут
const CACHE_KEY = process.env.SKINPORT_CACHE_KEY || 'skinport:items';

export class SkinportService {
  async fetchItemsFromAPI(): Promise<SkinportResponse> {
    const url = `${SKINPORT_API_URL}?app_id=${SKINPORT_APP_ID}&currency=${SKINPORT_CURRENCY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Skinport API error: ${response.statusText}`);
    }

    return await response.json() as SkinportResponse;
  }

  async getItemsWithCache(): Promise<SkinportResponse> {
    // Проверяем кэш
    const cached = await redis.get(CACHE_KEY);

    if (cached) {
      return JSON.parse(cached) as SkinportResponse;
    }

    // Если нет в кэше, получаем из API
    const data = await this.fetchItemsFromAPI();

    // Сохраняем в кэш
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(data));

    return data;
  }

  /**
   * Преобразует данные из Skinport API в DTO
   */
  mapToDto(items: SkinportResponse['items']): SkinportItemsResponseDto {
    return items.map((item): SkinportItemDto => ({
      market_hash_name: item.market_hash_name,
      min_price_tradable: item.min_price_tradable,
      min_price_non_tradable: item.min_price ?? null,
    }));
  }

  /**
   * Получает предметы с минимальными ценами в формате DTO
   */
  async getItemsWithMinPrices(): Promise<SkinportItemsResponseDto> {
    const data = await this.getItemsWithCache();
    return this.mapToDto(data.items);
  }
}

