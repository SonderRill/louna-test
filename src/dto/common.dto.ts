import typia from 'typia';

export interface ErrorResponseDto {
  error: string;
}

export const errorResponseDtoValidator = typia.createValidate<ErrorResponseDto>();

