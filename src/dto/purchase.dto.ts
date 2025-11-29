import typia from 'typia';

export interface PurchaseRequestDto {
  user_id: number & typia.tags.Minimum<1> & typia.tags.Type<'int32'>;
  product_id: number & typia.tags.Minimum<1> & typia.tags.Type<'int32'>;
}

export interface PurchaseSuccessResponseDto {
  success: true;
  newBalance: number;
}

export interface PurchaseErrorResponseDto {
  success: false;
  newBalance: number;
  error: string;
}

export type PurchaseResponseDto = PurchaseSuccessResponseDto | PurchaseErrorResponseDto;

export const purchaseRequestDtoValidator = typia.createValidate<PurchaseRequestDto>();
export const purchaseResponseDtoValidator = typia.createValidate<PurchaseResponseDto>();

