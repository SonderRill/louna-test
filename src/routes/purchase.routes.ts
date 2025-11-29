import { FastifyInstance } from 'fastify';
import { PurchaseService } from '../services/purchase.service';
import {
  PurchaseRequestDto,
  PurchaseErrorResponseDto,
  purchaseRequestDtoValidator,
  purchaseResponseDtoValidator,
} from '../dto/purchase.dto';

const purchaseService = new PurchaseService();

export async function purchaseRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: PurchaseRequestDto }>(
    '/purchase',
    async (request, reply) => {
      try {
        // Валидация тела запроса
        const validationResult = purchaseRequestDtoValidator(request.body);

        if (!validationResult.success) {
          const errorResponse: PurchaseErrorResponseDto = {
            success: false,
            newBalance: 0,
            error: `Validation error: ${validationResult.errors.map(e => e.path).join(', ')}`,
          };
          return reply.status(400).send(errorResponse);
        }

        const { user_id, product_id } = request.body;

        const result = await purchaseService.purchaseProduct(user_id, product_id);

        // Валидация ответа перед отправкой
        const responseValidation = purchaseResponseDtoValidator(result);
        if (!responseValidation.success) {
          request.log.warn({
            message: 'Response validation failed',
            errors: JSON.stringify(responseValidation.errors)
          });
        }

        if (!result.success) {
          return reply.status(400).send(result);
        }

        return reply.status(200).send({
          success: result.success,
          newBalance: result.newBalance,
        });
      } catch (error) {
        request.log.error(error);
        const errorResponse: PurchaseErrorResponseDto = {
          success: false,
          newBalance: 0,
          error: 'Internal server error',
        };
        return reply.status(500).send(errorResponse);
      }
    }
  );
}

