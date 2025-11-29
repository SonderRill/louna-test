import { FastifyInstance } from 'fastify';
import { SkinportService } from '../services/skinport.service';
import {
  SkinportItemsResponseDto,
  skinportItemsResponseDtoValidator,
} from '../dto/skinport.dto';
import { ErrorResponseDto } from '../dto/common.dto';

const skinportService = new SkinportService();

export async function skinportRoutes(fastify: FastifyInstance) {
  fastify.get<{ Reply: SkinportItemsResponseDto | ErrorResponseDto }>(
    '/skinport/items',
    async (request, reply) => {
      try {
        const items = await skinportService.getItemsWithMinPrices();

        // Валидация ответа перед отправкой
        const validationResult = skinportItemsResponseDtoValidator(items);
        if (!validationResult.success) {
          request.log.warn({
            message: 'Response validation failed',
            errors: JSON.stringify(validationResult.errors)
          });
        }

        return reply.status(200).send(items);
      } catch (error) {
        request.log.error(error);
        const errorResponse: ErrorResponseDto = {
          error: 'Failed to fetch items from Skinport API',
        };
        return reply.status(500).send(errorResponse);
      }
    }
  );
}

