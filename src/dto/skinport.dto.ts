import typia from 'typia';

export interface SkinportItemDto {
  market_hash_name: string;
  min_price_tradable: number | null;
  min_price_non_tradable: number | null;
}

export type SkinportItemsResponseDto = SkinportItemDto[];

export const skinportItemDtoValidator = typia.createValidate<SkinportItemDto>();
export const skinportItemsResponseDtoValidator = typia.createValidate<SkinportItemsResponseDto>();

